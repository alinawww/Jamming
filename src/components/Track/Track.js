import React from 'react'

const Track = (props: {track: {name: string, artist: string, album: string}, handleTrackAction: Function, isSearchResult: boolean}) => (
    <div className="Track">
        <div className="Track-information">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
        </div>
        <a onClick={() => props.handleTrackAction(props.track)} className="Track-action">{props.isSearchResult ? '+' : '-'}</a>
    </div>
)

export default Track
