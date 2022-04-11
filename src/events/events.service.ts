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
        return await this.eventsModel.find().populate('message').exec();
    }

    async findOne(id: string): Promise<Events> {
        return await this.eventsModel
            .findOne({ _id: id })
            .populate('message')
            .exec();
    }

    async create(createEventDto: CreateEventDto): Promise<Events> {
        const createdEvent = new this.eventsModel(createEventDto);
        return await createdEvent.save();
    }

    async delete(id: string): Promise<Events> {
        return await this.eventsModel.findByIdAndRemove({ _id: id }).exec();
    }
}
