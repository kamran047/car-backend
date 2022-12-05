import { IsNotEmpty, IsString } from "class-validator";

export class CategoryRequestDto {
    @IsNotEmpty()
    @IsString()
    category_name: string
}