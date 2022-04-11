import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './schema/messages.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    controllers: [MessagesController],
    providers: [MessagesService],
    imports: [
        MongooseModule.forFeature([
            { name: Message.name, schema: MessageSchema },
        ]),
    ],
})
export class MessagesModule {}
