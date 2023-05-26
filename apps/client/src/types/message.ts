import { User } from "./user";

export interface Message {
  content: string;
  received?: boolean;
  seen?: boolean;
  // sender: User;
  // receiver: User;
  senderId: string;
  receiverId: string;
}
