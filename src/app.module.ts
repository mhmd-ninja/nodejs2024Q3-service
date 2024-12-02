import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { RouterModule } from '@nestjs/core';
import { FavoriteTrackModule } from './favorite/track/favorite-track.module';
import { FavoriteArtistModule } from './favorite/artist/favorite-artist.module';
import { FavoriteAlbumModule } from './favorite/album/favorite-album.module';
import { AuthModule } from './auth/auth.module';
import { LoggingMiddleware } from './logging.middleware';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoriteModule,
    FavoriteTrackModule,
    FavoriteArtistModule,
    FavoriteAlbumModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavoriteModule,
        children: [
          {
            path: 'track',
            module: FavoriteTrackModule,
          },
          {
            path: 'artist',
            module: FavoriteArtistModule,
          },
          {
            path: 'album',
            module: FavoriteAlbumModule,
          },
        ],
      },
    ]),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*'); // Apply to all routes
  }
}
