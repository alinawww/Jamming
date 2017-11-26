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

const NewPlaylist = (props: {removeFromPlaylist: Function, saveToSpotify: Function, handlePlaylistNameChange: Function, tracksNewPlaylist: Array<Object>, playlistName: string}) => (
    <div className="Playlist">
        <input onChange={(event) => props.handlePlaylistNameChange(event)} value={props.playlistName}/>
        <TrackList tracks={props.tracksNewPlaylist} handleTrackAction={props.removeFromPlaylist} isSearchResult={false}/>
        <a onClick={props.saveToSpotify} className="Playlist-save">SAVE TO SPOTIFY</a>
    </div>
)

class Playlist extends React.Component {
    render() {
        const {tracks, addToPlaylist, tracksNewPlaylist, removeFromPlaylist, handlePlaylistNameChange, saveToSpotify, playlistName} = this.props
        return (
            <div className="App-playlist">
                <SearchResults
                    tracks={tracks}
                    addToPlaylist={addToPlaylist}
                    />
                <NewPlaylist
                    tracksNewPlaylist={tracksNewPlaylist}
                    removeFromPlaylist={removeFromPlaylist}
                    handlePlaylistNameChange={handlePlaylistNameChange}
                    saveToSpotify={saveToSpotify}
                    playlistName={playlistName}
                    />
            </div>
        )
    }
}


export default Playlist
