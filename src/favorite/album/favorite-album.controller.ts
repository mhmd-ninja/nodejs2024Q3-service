import { Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/find-one-params.dto';
import { FavoriteService } from '../favorite.service';

@Controller()
export class FavoriteAlbumController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':id')
  favoriteAlbum(@Param() params: FindOneParams) {
    return this.favoriteService.favoriteAlbum(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  unfavoriteAlbum(@Param() params: FindOneParams) {
    return this.favoriteService.unfavoriteAlbum(params.id);
  }
}
