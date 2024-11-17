import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FindOneParams } from '../artist/dto/find-one-params.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}
  
  @Post()
  @HttpCode(201)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto).getAlbumData();
  }

  @Get()
  findAll() {
    return this.albumService.findAll().map((album) => album.getAlbumData());
  }
  
  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.albumService.findOne(params.id).getAlbumData();
  }

  @Put(':id')
  update(
    @Param() params: FindOneParams,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(params.id, updateAlbumDto).getAlbumData();
  }
  
  @Delete(':id')
  @HttpCode(204)
  remove(@Param() params: FindOneParams) {
    return this.albumService.remove(params.id);
  }
}
