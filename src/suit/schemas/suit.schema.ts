import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Gender } from "../enum/gender";
import { Currency } from "../enum/currency";
import { Size } from "../enum/size";
import { SuitColour } from "../enum/suit-colour";
import { Brand } from "../enum/brand";

@Schema({ versionKey: false })
export class Suit {
    @Prop({ required: true })
    gender: Gender;

    @Prop({ required: true })
    price: number;

    @Prop({ default: Currency.TL })
    currency: Currency;

    @Prop({ required: true, index: true, unique: true })
    primaryInfo: string;

    @Prop({ required: true })
    secondaryInfo: string;

    @Prop()
    tertiaryInfo: string;

    @Prop({ required: true })
    sizes: Size[];

    @Prop({ required: true })
    colour: SuitColour;

    @Prop({ required: true })
    brand: Brand;

    @Prop({ default: true })
    available: boolean;

    // @Prop({ default: [] })
    // imgPaths: [string];

    @Prop({ default: [] })
    imgPaths: string[];

    @Prop({ default: 1000 })
    stock: number;
}

export type SuitDocument = Suit & Document;
export const SuitSchema = SchemaFactory.createForClass(Suit);
