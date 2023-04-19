import {
  IsBoolean,
  IsDate,
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
  @IsDate()
  sent: Date;

  @IsOptional()
  @IsBoolean()
  received?: boolean;

  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}
