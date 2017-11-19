import './Playlist.css'
import React from 'react'
import Track from '../Track/Track'

const TrackList = (props: {tracks: Array<Object>, handleTrackAction: Function, isSearchResult: boolean}) => (
    <div className="TrackList">
        {props.tracks.map((track, index) => <Track key={index} track={track} handleTrackAction={props.handleTrackAction} isSearchResult={props.isSearchResult} />)}
    </div>
)

const SearchResults = (props: {tracks: Array<Object>, addToPlaylist: Function}) => (
    <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={props.tracks} handleTrackAction={props.addToPlaylist} isSearchResult={true}/>
    </div>
)

const NewPlaylist = (props: {removeFromPlaylist: Function, saveToSpotify: Function, handlePlaylistNameChange: Function, tracksNewPlaylist: Array<Object>}) => (
    <div className="Playlist">
        <input onChange={(event) => props.handlePlaylistNameChange(event)} />
        <TrackList tracks={props.tracksNewPlaylist} handleTrackAction={props.removeFromPlaylist} isSearchResult={false}/>
        <a onClick={props.saveToSpotify} className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
)


class Playlist extends React.Component {
    render() {
        return (
            <div className="App-playlist">
                <SearchResults
                    tracks={this.props.tracks}
                    addToPlaylist={this.props.addToPlaylist} />
                <NewPlaylist
                    tracksNewPlaylist={this.props.tracksNewPlaylist}
                    removeFromPlaylist={this.props.removeFromPlaylist}
                    handlePlaylistNameChange={this.props.handlePlaylistNameChange}
                    saveToSpotify={this.props.saveToSpotify}/>
            </div>
        )
    }
}


export default Playlist
