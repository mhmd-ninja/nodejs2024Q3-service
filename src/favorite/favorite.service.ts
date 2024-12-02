import { Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
@Injectable()
export class FavoriteService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  findAll() {
    return {
      artists: this.artistService
        .getFavoriteArtist()
        .map((artist) => artist.getArtistData()),
      albums: this.albumService
        .getFavoriteAlbums()
        .map((album) => album.getAlbumData()),
      tracks: this.trackService
        .getFavoriteTracks()
        .map((track) => track.getTrackData()),
    };
  }

  favoriteTrack(id: string) {
    this.trackService.favorite(id);
  }

  unfavoriteTrack(id: string) {
    this.trackService.unfavorite(id);
  }
  favoriteAlbum(id: string) {
    this.albumService.favorite(id);
  }

  unfavoriteAlbum(id: string) {
    this.albumService.unfavorite(id);
  }

  favoriteArtist(id: string) {
    this.artistService.favorite(id);
  }

  unfavoriteArtist(id: string) {
    this.artistService.unfavorite(id);
  }
}
