import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Message } from '../../messages/schema/messages.schema';
import * as mongoose from 'mongoose';

export type EventsDocument = Events & Document;

@Schema()
export class Events {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    date: Date;

    @Prop()
    location: string;

    @Prop()
    tag: string;

    @Prop()
    image: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }] })
    messages: Message[];
}

export const EventsSchema = SchemaFactory.createForClass(Events);
