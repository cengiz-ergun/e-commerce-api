import { IsNotEmpty, IsString, IsNumber, IsArray, IsBoolean } from "class-validator";
import { Gender } from "../enum/gender";
import { Currency } from "../enum/currency";
import { Size } from "../enum/size";
import { Brand } from "../enum/brand";

export class CreateSuitDto {
    @IsNotEmpty()
    readonly gender: Gender;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    readonly currency: Currency;

    @IsNotEmpty()
    @IsString()
    readonly primaryInfo: string;

    @IsNotEmpty()
    @IsString()
    readonly secondaryInfo: string;

    @IsString()
    readonly tertiaryInfo: string;

    @IsNotEmpty()
    @IsArray()
    readonly sizes: Size[];

    @IsNotEmpty()
    @IsNumber()
    readonly colour: number;

    @IsNotEmpty()
    readonly brand: Brand;

    @IsNotEmpty()
    @IsBoolean()
    readonly available: boolean;

    @IsNotEmpty()
    @IsArray()
    readonly imgPaths: string[];

    @IsNotEmpty()
    @IsNumber()
    readonly stock: number;
}
