import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FindOneParams } from '../artist/dto/find-one-params.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto).getTrackData();
  }

  @Get()
  findAll() {
    return this.trackService.findAll().map((track) => track.getTrackData());
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.trackService.findOne(params.id).getTrackData();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(params.id, updateTrackDto).getTrackData();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.trackService.remove(params.id);
  }
}
