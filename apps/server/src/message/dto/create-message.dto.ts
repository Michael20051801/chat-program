import { OmitType } from '@nestjs/swagger';
import { MessageDto } from './message.dto';

// Defining a dto for creating a message.
// I'm omitting the id and sent fields because they are generated
//  automatically (the uuid of the id is genrated automatically
//  by the DB, the sent field has a default value which is 'now').
export class CreateMessageDto extends OmitType(MessageDto, ['id', 'sent'] as const) {}
