import { Locator, expect } from '@playwright/test';
import { BasePage } from './abstract.classes';
import { sumTimeInSeconds } from '../utils/helpers';

export class PlaylistPage extends BasePage {
  public pagePath: string = `${process.env.BASE_URL}`;
  readonly searchInput: Locator = this.page.getByRole('textbox', {
    name: 'Search',
  });
  readonly trackList: Locator = this.page.locator('#tracklist');
  readonly trackItemList: any = this.trackList.locator(
    'div.MuiGrid-root.MuiGrid-container.css-adtkzx'
  );
  readonly searchedTrack: Locator = this.trackList.locator('div').first();
  readonly playlist: Locator = this.page.locator('#playlist');
  readonly playlistItemList: Locator = this.playlist.locator(
    'div.MuiGrid-root.MuiGrid-container.css-adtkzx'
  );
  readonly playlistDuration: Locator = this.page.locator('#playlist-duration');

  async serchFieldIsVible() {
    await expect(this.searchInput).toBeVisible();
  }

  async searchForTrack(trackName: string) {
    await this.searchInput.pressSequentially(trackName);
  }

  async addTrackToPlaylist(trackName: string) {
    const track: Locator = this.trackList.filter({
      hasText: new RegExp(trackName),
    });
    const plusButton: Locator = track.getByRole('button', {
      name: '+',
    });

    await plusButton.click();
  }

  async checkIfTrackIsInThePlaylist(trackName: string) {
    const track: Locator = this.playlist.filter({
      hasText: new RegExp(trackName),
    });
    await expect(track).toBeVisible();
  }

  async checkIfTrackNameInThesearchInputIsValid(trackName: string) {
    const lowerCaseTrackName = trackName.toLowerCase();
    await expect(this.searchInput).toHaveValue(lowerCaseTrackName);
  }

  async checkIfCorrectTrackIsShown(trackName: string) {
    await expect(this.searchedTrack).toHaveText(trackName);
  }
  async checkIfOnlySearchTrackIsShown() {
    const itemsAmount: number = await this.trackItemList.count();
    await expect(itemsAmount).toBe(1);
  }

  async checkIfTrackDurationisVisible() {
    await expect(this.playlistDuration).toBeVisible();
  }

  async checkIfPlaylistDurationIsCorrect(...tracknames: any) {
    const timeArray = await Promise.all(
      tracknames.map(async (trackName: string) => {
        return await this.playlistItemList
          .filter({ hasText: new RegExp(trackName) })
          .locator('p.MuiTypography-root.MuiTypography-body1.css-3ffyn9')
          .nth(1)
          .textContent();
      })
    );

    const totalTime = await sumTimeInSeconds(timeArray);

    const playlistDurationValue = await this.playlistDuration.textContent();
    await expect(playlistDurationValue).toEqual(totalTime);
  }
}
