import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

// Defining a controller, that its path name will be '/message'.
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  // Defining a sub-path, that its name will be '/post'.
  // Defining an HTTP method POST that will be activated at this path.
  @Post('post')

  // Defining a function that will be activated when accessing its path.
  // The function got a parameter from the body of the request, and its
  //  type is an object that consists of new message with the type
  //  CreateMessageDto.
  postMessage(@Body() body: { newMessage: CreateMessageDto }) {

    // Rerurning the function 'postMessage' in the auth service, with the
    //  parameter it got from the outer function.
    return this.messageService.postMessage(body);
  }

  // Defining a sub-path, that its path name will be '/get'.
  // Defining an HTTP method POST that will be activated at this path.
  @Post('get')

  // Defining a function that will be activated when accessing its path.
  // The function got a parameter from the body of the request, and its
  //  type is an object that consists of otherUserId (type:string) and
  //  currentUserId (type:string).
  // The return answer's HTTP code will be code 200, insead of the 
  //  default POST's 201.
  @HttpCode(HttpStatus.OK)
  getMessages(@Body() body: { otherUserId: string; currentUserId: string }) {

    // Rerurning the function 'getMessages' in the auth service, with the
    //  parameter it got from the outer function.
    return this.messageService.getMessages(body);
  }
}
