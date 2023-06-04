import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

// Defining a dto for a message.
export class MessageDto {
  // The id must not be empty.
  // The id must be a UUID.
  @IsNotEmpty()
  @IsUUID()
  id: string;

  // The receiverId must not be empty.
  // The receiverId must be a UUID.
  @IsNotEmpty()
  @IsUUID()
  receiverId: string;

  // The senderId must not be empty.
  // The senderId must be a UUID.
  @IsNotEmpty()
  @IsUUID()
  senderId: string;

  // The content must not be empty.
  // The content must be a string.
  @IsNotEmpty()
  @IsString()
  content: string;

  // The sent field must not be empty.
  // The sent field must be a date string.
  @IsNotEmpty()
  @IsDateString()
  sent: Date;

  // The received field is optional.
  // The received field must be a boolean.
  @IsOptional()
  @IsBoolean()
  received?: boolean;

  // The seen field is optional.
  // The seen field must be a boolean.
  @IsOptional()
  @IsBoolean()
  seen?: boolean;
}
