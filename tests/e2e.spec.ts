import { test } from '../fixtures/fixtures';
import { trackNames as tracks } from '../testdata/test.data';

// I made some mistake, so the tests don't work, I'm working on it

test.describe.parallel('Playlist App Tests', () => {
  test('Search Functionality', async ({ app }) => {
    await app.playlistpage.open();
    await app.playlistpage.serchFieldIsVible();
    await app.playlistpage.searchForTrack(tracks['Autumn Leaves']);
    await app.playlistpage.checkIfCorrectTrackIsShown(tracks['Autumn Leaves']);
    await app.playlistpage.checkIfOnlySearchTrackIsShown();
  });

  test('Add track using "+" button', async ({ app }) => {
    await app.playlistpage.open();
    await app.playlistpage.addTrackToPlaylist(tracks['Rainy Mood']);
    await app.playlistpage.checkIfTrackIsInThePlaylist(tracks['Rainy Mood']);
  });

  test('Verify total duration of the Playlist in seconds', async ({ app }) => {
    await app.playlistpage.open();
    await app.playlistpage.addTrackToPlaylist(tracks['Autumn Leaves']);
    await app.playlistpage.addTrackToPlaylist(tracks['Rainy Mood']);
    await app.playlistpage.addTrackToPlaylist(tracks['Spring Dance']);
    await app.playlistpage.checkIfTrackDurationisVisible();
    await app.playlistpage.checkIfPlaylistDurationIsCorrect(
      tracks['Autumn Leaves'],
      tracks['Rainy Mood'],
      tracks['Spring Dance']
    );
  });
});
