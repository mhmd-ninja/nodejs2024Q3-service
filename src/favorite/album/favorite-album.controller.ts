import { Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/find-one-params.dto';
import { FavoriteService } from '../favorite.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
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
