import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar'
import Playlist from './components/Playlist/Playlist'
import Spotify from './util/Spotify.js'

Spotify.getAccessToken()

class App extends Component {
    constructor(props) {
        super(props)
        this.searchSpotify = this.searchSpotify.bind(this)
        this.saveToSpotify = this.saveToSpotify.bind(this)
        this.addToPlaylist = this.addToPlaylist.bind(this)
        this.removeFromPlaylist = this.removeFromPlaylist.bind(this)
        this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this)

        this.state = {
            tracks: [],
            tracksNewPlaylist: [],
            playlistName: ''
        }
    }

    searchSpotify(term: string) {
        Spotify.search(term).then(tracks => {
            this.setState({tracks})
        })
    }

    addToPlaylist(track) {
        if (this.state.tracksNewPlaylist.indexOf(track) < 0) {
            this.setState(prevState => ({
                tracksNewPlaylist: [...prevState.tracksNewPlaylist, track]
            }))
        }
    }
    removeFromPlaylist(track) {
        this.setState({
            tracksNewPlaylist: this.state.tracksNewPlaylist.filter(playlistTrack => playlistTrack.id !== track.id)
        })
    }
    handlePlaylistNameChange(event: {target: EventTarget}) {
        this.setState({
            playlistName: event.target.value
        })
    }
    saveToSpotify() {
        const playlistUris = this.state.tracksNewPlaylist.map(playlistTrack => playlistTrack.uri)
        Spotify.savePlaylist(this.state.playlistName, playlistUris)
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar searchSpotify={this.searchSpotify}/>
                    <Playlist
                        tracks={this.state.tracks}
                        tracksNewPlaylist={this.state.tracksNewPlaylist}
                        saveToSpotify={this.saveToSpotify}
                        addToPlaylist={this.addToPlaylist}
                        removeFromPlaylist={this.removeFromPlaylist}
                        handlePlaylistNameChange={this.handlePlaylistNameChange}
                        />
                </div>
            </div>
        )
    }
}

export default App;
