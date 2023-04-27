import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsDateString()
  sent: Date;

  @IsOptional()
  @IsBoolean()
  received?: boolean;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}
