import React from 'react'
import Track from '../Track/Track'

const searchResultsTracks = [
  {
    title: 'Tiny Dance',
    artist: 'Elton John',
    album: 'Madam Aross The Water'
  },
  {
    title: 'Tiny Dance',
    artist: 'Tim McGraw',
    album: 'Love Story'
  },
  {
    title: 'Tiny Dance',
    artist: 'Rockabye Baby!',
    album: 'Lullaby Renditions of Elton John'
  },
  {
    title: 'Tiny Dancer - Live Album Version',
    artist: 'Ben Folds',
    album: 'Ben Folds Live'
  }
]

const playlistTracks = [
  {
    title: 'Stronger',
    artist: 'Britney Spears',
    album: 'Madam Aross The Water'
  },
  {
    title: 'So Emotional',
    artist: 'Whitney',
    album: 'Love Story'
  },
  {
    title: 'It\'s Not Right But It\'s Okay',
    artist: 'Whitney Houston',
    album: 'My Love Is Your Love'
  }
]

const TrackList = (props: {tracks: Array<Object>}) => {
  return (
      <div className="TrackList">
        {props.tracks.map(track => <Track songTitle={track.title} artist={track.artist} album={track.album}/>)}
      </div>
  )
}

const SearchResults = () => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResultsTracks}/>
    </div>
  )
}

const NewPlaylist = () => {
  return (
    <div className="Playlist">
      <input value='New Playlist' />
      <TrackList tracks={playlistTracks} />
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  )
}

class Playlist extends React.Component {
    render() {
        return (
            <div className="App-playlist">
              <SearchResults />
              <NewPlaylist />
            </div>
        )
    }
}


export default Playlist
