import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarRequestDto {
    @IsNotEmpty()
    @IsNumber()
    category_id: number

    @IsNotEmpty()
    @IsString()
    color: string

    @IsNotEmpty()
    @IsString()
    model: string

    @IsNotEmpty()
    @IsString()
    registeration_no: string
}