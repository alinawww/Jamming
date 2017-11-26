import './Track.css'
import React from 'react'
import classnames from 'classnames'

const Track = (props: {track: {name: string, artist: string, album: string, previewUrl: string}, handleTrackAction: Function, isSearchResult: boolean}) => (
    <div className="Track">
        <div className="Track-information">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
        </div>
        <div className="Track-actions">
            <a className={classnames("Track-action", {hidden: !props.track.previewUrl})} href={props.track.previewUrl}>play</a>
            <a onClick={() => props.handleTrackAction(props.track)} className="Track-action">{props.isSearchResult ? '+' : '-'}</a>
        </div>
    </div>
)

export default Track
