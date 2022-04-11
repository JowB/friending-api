import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    id: number;

    @Prop()
    date: Date;

    @Prop()
    content: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
