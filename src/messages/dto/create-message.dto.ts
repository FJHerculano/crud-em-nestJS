import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(255)
    readonly texto: string;

    @IsPositive()
    deId: number;
    
    @IsPositive()
    paraId: number;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(3)
    // @MaxLength(255) 
    // readonly para: string;
}
