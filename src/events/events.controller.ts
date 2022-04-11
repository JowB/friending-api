import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { Events } from './schema/events.schema';
import { CreateEventDto } from './dto/events.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../role/roles.guard';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    createEvent(
        @Body() createEventDto: CreateEventDto,
        @Request() req,
    ): Promise<Events> {
        return this.eventsService.create(createEventDto, req.user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    deleteEvent(@Param('id') id: string): Promise<Events> {
        return this.eventsService.delete(id);
    }
}
