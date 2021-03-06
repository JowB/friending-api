import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Events, EventsDocument } from './schema/events.schema';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/events.dto';

@Injectable()
export class EventsService {
    constructor(
        @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
    ) {}

    async findAll(): Promise<Events[]> {
        return await this.eventsModel.find().populate('user').exec();
    }

    async findOne(id: string): Promise<Events> {
        return await this.eventsModel
            .findOne({ _id: id })
            .populate('user')
            .exec();
    }

    async create(createEventDto: CreateEventDto, user: any): Promise<Events> {
        const createdEvent = new this.eventsModel(createEventDto);
        createdEvent.date = new Date();
        createdEvent.user = user.userId;
        await createdEvent.save();
        return createdEvent;
    }

    async delete(id: string): Promise<Events> {
        return await this.eventsModel.findByIdAndRemove({ _id: id }).exec();
    }
}
