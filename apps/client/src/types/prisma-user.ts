import { Message } from "./message";

export interface PrismaUser {
  email: string;
  hash: string;
  userName: string;
  description?: string;
  sentMessages: Message[];
  receivedMessages: Message[];
}
