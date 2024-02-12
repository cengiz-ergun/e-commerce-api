import { Module } from "@nestjs/common";
import { SuitController } from "./suit.controller";
import { SuitService } from "./suit.service";
import { MongooseModule } from "@nestjs/mongoose";
import { SuitSchema } from "./schemas/suit.schema";
import { LoggerModule } from "src/logger/logger.module";

@Module({
    imports: [MongooseModule.forFeature([{ name: "Suit", schema: SuitSchema }]), LoggerModule],
    controllers: [SuitController],
    providers: [SuitService],
})
export class SuitModule {}
