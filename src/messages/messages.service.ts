import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schema/messages.schema';
import { CreateMessageDto } from './dto/messages.dto';
import { MessagesGateway } from './messages.gateway';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        private messagesGateway: MessagesGateway,
    ) {}

    async findAll(): Promise<Message[]> {
        return await this.messageModel.find().populate('user').exec();
    }

    async create(
        createMessageDto: CreateMessageDto,
        user: any,
    ): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        createdMessage.date = new Date();
        createdMessage.user = user.userId;
        await createdMessage.save();
        const message = await this.findOne(createdMessage._id);
        this.messagesGateway.sendNewMessage(message);
        return message;
    }

    async findOne(id: string): Promise<Message> {
        return this.messageModel.findOne({ _id: id }).populate('user').exec();
    }

    async delete(id: string): Promise<Message> {
        return await this.messageModel.findByIdAndRemove({ _id: id }).exec();
    }

    async update(
        id: string,
        createMessageDto: CreateMessageDto,
    ): Promise<Message> {
        return this.messageModel
            .findByIdAndUpdate({ _id: id }, createMessageDto)
            .setOptions({ new: true });
    }
}
