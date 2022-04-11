import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schema/users.schema';

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
