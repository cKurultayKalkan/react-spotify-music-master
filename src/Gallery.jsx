import React, {Component} from 'react';
import './App.css'

class Gallery extends Component {

    render() {
        console.log(this.props);
        const {tracks} = this.props;
        return (
            <div>
                {   tracks.map((track, k) => {
                    const trackImg = track.album.images[0].url;
                    return (
                        <div
                            key={k}
                            className="track"
                        >
                            <img
                                src={trackImg}
                                className="track-image"
                                alt="track"
                            />
                            <p className="track-text">
                                {track.name}
                            </p>
                        </div>
                    )

                })
                }
            </div>
        )
    }

}

export default Gallery