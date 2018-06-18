import { getAlbumCover, getArtistsAsHumanFormat } from './tracks'

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
