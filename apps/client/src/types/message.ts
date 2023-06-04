// Creating a new interface (type) called Message.
export interface Message {
  content: string;
  received?: boolean;
  seen?: boolean;
  senderId: string;
  receiverId: string;
}
