import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Request,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Events } from './schema/events.schema';
import { CreateEventDto } from './dto/events.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    getAllEvents(): Promise<Events[]> {
        return this.eventsService.findAll();
    }

    @Get(':id')
    getEventById(@Param('id') id: string): Promise<Events> {
        return this.eventsService.findOne(id);
    }

    @Post()
    createEvent(
        @Body() createEventDto: CreateEventDto,
        @Request() req,
    ): Promise<Events> {
        return this.eventsService.create(createEventDto, req.user);
    }

    @Delete(':id')
    deleteEvent(@Param('id') id: string): Promise<Events> {
        return this.eventsService.delete(id);
    }
}
