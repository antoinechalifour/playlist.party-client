import { getAlbumCover, getArtistsAsHumanFormat, getCoverAlt } from './tracks'

test('getAlbumCover - returns the cover', () => {
  const track = {
    album: {
      images: [
        {
          url: 'http://spotify.com/cover'
        },
        {
          url: 'http://spotify.com/cover2'
        }
      ]
    }
  }

  expect(getAlbumCover(track)).toEqual('http://spotify.com/cover')
})

test('getAlbumCover - returns a placeholder if no cover is provided', () => {
  const track = {
    album: {
      images: []
    }
  }

  expect(getAlbumCover(track)).toEqual('default-album-cover.png')
})

test('getArtistsAsHumanFormat - 1 artist', () => {
  const track = {
    artists: [
      {
        name: 'Linkin Park'
      }
    ]
  }

  expect(getArtistsAsHumanFormat(track)).toEqual('Linkin Park')
})

test('getArtistsAsHumanFormat - 2 artists', () => {
  const track = {
    artists: [
      {
        name: 'Linkin Park'
      },
      {
        name: 'Jay-Z'
      }
    ]
  }

  expect(getArtistsAsHumanFormat(track)).toEqual('Linkin Park and Jay-Z')
})

test('getArtistsAsHumanFormat - 2+ artists', () => {
  const track = {
    artists: [
      {
        name: 'Linkin Park'
      },
      {
        name: 'Jay-Z'
      },
      {
        name: 'Justin Bieber'
      }
    ]
  }

  expect(getArtistsAsHumanFormat(track)).toEqual(
    'Linkin Park, Jay-Z and Justin Bieber'
  )
  expect(track.artists).toEqual([
    {
      name: 'Linkin Park'
    },
    {
      name: 'Jay-Z'
    },
    {
      name: 'Justin Bieber'
    }
  ])
})

test('getCoverAlt - Return the alt attribute for a track cover', () => {
  expect(getCoverAlt({ name: 'In the end' })).toBe(
    'Album cover for track "In the end"'
  )
})
