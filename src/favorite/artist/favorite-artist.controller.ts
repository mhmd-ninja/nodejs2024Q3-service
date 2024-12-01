import { Controller, Delete, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/find-one-params.dto';
import { FavoriteService } from '../favorite.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class FavoriteArtistController {
  constructor(
    // @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}

  @Post(':id')
  favoriteArtist(@Param() params: FindOneParams) {
    return this.favoriteService.favoriteArtist(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  unfavoriteArtist(@Param() params: FindOneParams) {
    return this.favoriteService.unfavoriteArtist(params.id);
  }
}
