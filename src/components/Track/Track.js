import './Track.css'
import React from 'react'
import classnames from 'classnames'
import FaPause from 'react-icons/lib/fa/pause';
import FaPlay from 'react-icons/lib/fa/play';

class PlayPause extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false
        }
        this.handlePlayPause = this.handlePlayPause.bind(this)
    }

    handlePlayPause() {
        this.setState({
            isPlaying: !this.state.isPlaying
        })
        const player = document.getElementById(this.props.id)
        this.state.isPlaying ? player.pause() : player.play()
    }

    render() {
        return (
            <div className={classnames("Track-action", {hidden: this.props.shouldHide})} onClick={this.handlePlayPause}>
                <audio id={this.props.id}>
                    <source src={this.props.previewUrl} type="audio/ogg" />
                </audio>

                { this.state.isPlaying ? <FaPause /> : <FaPlay />}
            </div>
        )
    }
}

type TrackPropsType = {
    track: {
        id: string,
        name: string,
        artist: string,
        album: string,
        previewUrl: string
    },
    handleTrackAction: Function,
    isSearchResult: boolean
}

const Track = (props: TrackPropsType) => (
    <div className="Track">
        <div className="Track-information">
            <h3>{props.track.name}</h3>
            <p>{props.track.artist} | {props.track.album}</p>
        </div>
        <div className="Track-actions">
            <PlayPause id={props.track.id} previewUrl={props.track.previewUrl} shouldHide={!props.track.previewUrl || !props.isSearchResult} />
            <a onClick={() => props.handleTrackAction(props.track)} className="Track-action">{props.isSearchResult ? '+' : '-'}</a>
        </div>
    </div>
)

export default Track
