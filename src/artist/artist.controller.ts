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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FindOneParams } from './dto/find-one-params.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto).getArtistData();
  }

  @Get()
  findAll() {
    return this.artistService.findAll().map((user) => user.getArtistData());
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.artistService.findOne(params.id).getArtistData();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService
      .update(params.id, updateArtistDto)
      .getArtistData();
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.artistService.delete(params.id);
  }
}
