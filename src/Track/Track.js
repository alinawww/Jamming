import React from 'react'

const Track = (props: {track: {title: string, artist: string, album: string}, handleTrackAction: Function}) => {
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.title}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      <a onClick={() => props.handleTrackAction(props.track)} className="Track-action">+</a>
    </div>
  )
}


export default Track
