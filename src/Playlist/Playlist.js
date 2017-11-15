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

const TrackList = (props: {tracks: Array<Object>, handleTrackAction: Function}) => {
  return (
      <div className="TrackList">
        {props.tracks.map((track, index) => <Track key={index} track={track} handleTrackAction={props.handleTrackAction} />)}
      </div>
  )
}

const SearchResults = (props: {handleTrackAction: Function}) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={searchResultsTracks} handleTrackAction={props.handleTrackAction}/>
    </div>
  )
}

const NewPlaylist = (props: {handleTrackAction: Function}) => {
  return (
    <div className="Playlist">
      <input value='New Playlist' />
      <TrackList tracks={props.tracksNewPlaylist} handleTrackAction={props.handleTrackAction} />
      <a className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
  )
}

class Playlist extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        tracksNewPlaylist: []
      }
      this.handleTrackAction = this.handleTrackAction.bind(this)
    }

    handleTrackAction(track) {
      this.setState({
        tracks: this.state.tracksNewPlaylist.push(track)
      })
    }

    render() {
        return (
            <div className="App-playlist">
              <SearchResults handleTrackAction={this.handleTrackAction} />
              <NewPlaylist tracksNewPlaylist={this.state.tracksNewPlaylist} handleTrackAction={this.handleTrackAction} />
            </div>
        )
    }
}


export default Playlist
