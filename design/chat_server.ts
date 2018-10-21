// Exercise 7.7

export interface IClient {
    createRoom(userIds: string[]): string;
    joinRoom(roomId: string): void;
    leaveRoom(roomId: string): void;
    sendMessage(msg: IMessage): void;
    receiveMessage(msg: IMessage): void;
}

export interface IMessageService {
    processMessage(msg: IMessage): void;
}

export interface ILoginService {
    login(username: string, password: string): boolean;
    logout(userId: string): void;
}

export interface IUser {
    id: string;
    status: string;
    online: boolean;
    roomIds: string[];
}

export interface IMessage {
    timestamp: number;
    text: string;
    fromId: string;
    roomId: string;
}

export interface IRoom {
    id: string;
    name?: string;
    isDirect: boolean;
    userIds: string[];
}
