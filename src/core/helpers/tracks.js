/**
 * Gets the album cover for a track.
 * @param {{ album: { images: [{ url: String }]}}} track
 */
export const getAlbumCover = track => track.album.images[0].url

/**
 * Returns a human readable string for artists.
 * Rules are:
 *
 * - 1 artist : Linkin Park = Linkin Park
 * - 2 artists: Linkin Park + Jay-Z = Linkin Park and Jay-Z
 * - 3 artists: Linkin Park + Jay-Z + Justin Bieber => Linkin Park, Jay-z and Justin Bieber
 * @param {{ artists: [{ name: String }]}} track
 */
export const getArtistsAsHumanFormat = track => {
  const artists = track.artists

  if (artists.length === 1) {
    return artists[0].name
  } else if (artists.length === 2) {
    return track.artists.map(x => x.name).join(' and ')
  } else {
    let [last, ...firsts] = [...artists].reverse()

    firsts.reverse()

    return `${firsts.map(x => x.name).join(', ')} and ${last.name}`
  }
}
