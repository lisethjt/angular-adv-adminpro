import { MessageResponse } from './message-response';
import { User } from './user.model';
export class UserResponse {

    constructor(
        public user: User,
        public token: string,      
        public message: MessageResponse  
        ){}
}