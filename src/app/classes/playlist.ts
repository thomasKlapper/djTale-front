import { Song } from './song';

export interface Playlist {
  name : string,
  playlistByDefault: boolean,
  songs: Array<Song>,
  _id: string
}