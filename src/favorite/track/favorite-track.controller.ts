import { Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { FindOneParams } from '../../artist/dto/find-one-params.dto';
import { FavoriteService } from '../favorite.service';

@Controller()
export class FavoriteTrackController {
  constructor(
    // @Inject(forwardRef(() => FavoriteService))
    private readonly favoriteService: FavoriteService,
  ) {}
  @Post(':id')
  favoriteTrack(@Param() params: FindOneParams) {
    return this.favoriteService.favoriteTrack(params.id);
  }

  @Delete(':id')
  @HttpCode(204)
  unfavoriteTrack(@Param() params: FindOneParams) {
    return this.favoriteService.unfavoriteTrack(params.id);
  }
}
