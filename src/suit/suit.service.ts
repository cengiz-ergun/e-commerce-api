import {
    ConflictException,
    Injectable,
    NotFoundException,
    OnModuleInit,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Suit } from "./schemas/suit.schema";
import { Model } from "mongoose";
import { initSuits } from "./seed-data/suits";
import { CreateSuitDto } from "./dto/create-suit.dto";
import { BatchDeleteSuitsDto } from "./dto/batch-delete-suits.dto";
import { UpdateSuitDto } from "./dto/update-suit.dto";
import { AppLoggerService } from "src/logger/logger.service";

@Injectable()
export class SuitService implements OnModuleInit {
    constructor(
        @InjectModel(Suit.name) private suitModel: Model<Suit>,
        private readonly logger: AppLoggerService
    ) {}
    onModuleInit() {
        // database seeding
        this.suitModel
            .insertMany([...initSuits])
            .then((docs) => {
                this.logger.log(`${docs.length} suits are added.`, "DATABASE SEED");
            })
            .catch((err) => {
                this.logger.warn(err, "DATABASE SEED");
            });
    }

    async getAll(): Promise<Suit[]> {
        const suits = await this.suitModel.find({});
        return suits;
    }

    async deleteById(id: string): Promise<any> {
        const result = await this.suitModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount !== 1) {
            throw new NotFoundException(`There is no suit with the id=${id}`);
        }
    }

    async createOne(createSuitDto: CreateSuitDto): Promise<Suit> {
        const primaryInfo = createSuitDto.primaryInfo;
        const createdSuit = await this.suitModel.findOne({ primaryInfo: primaryInfo });

        if (createdSuit) throw new ConflictException(`Suit with primaryInfo ${primaryInfo} already created`);

        const suit = await this.suitModel.create({ ...createSuitDto });

        return suit;
    }

    async deleteBatch(batchDeleteSuitsDto: BatchDeleteSuitsDto): Promise<number> {
        const ids = batchDeleteSuitsDto.ids;
        const result = await this.suitModel.deleteMany({ _id: [...ids] });
        return result.deletedCount;
    }

    async updateOne(id: string, updateSuitDto: UpdateSuitDto): Promise<number> {
        if (id !== updateSuitDto._id)
            throw new UnprocessableEntityException("There is an ambiguity with your request.");

        const result = await this.suitModel.updateOne({ _id: id }, updateSuitDto);
        return result.modifiedCount;
    }
}
