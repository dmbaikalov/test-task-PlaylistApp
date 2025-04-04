import { PageHolder } from './abstract.classes';
import { PlaylistPage } from './playlist.page';

export class Application extends PageHolder {
  public playlistpage = new PlaylistPage(this.page);
}
