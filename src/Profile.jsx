import React, {Component} from 'react';
import './App.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderGenres(artist) {


    }

    render() {
        let artist = this.props.artist !== null ? this.props.artist : {name: '', followers: {total: ''}, images: [{url: ''}], genres:[]};
        return (
            <div className="profile">
                <img
                    alt="Profile"
                    className="profile-img"
                    src={artist.images[0].url}
                />
                <div>{artist.name}</div>
                <div>{artist.followers.total}</div>
                <div>
                    {
                        artist.genres.map((genre, k) => {
                            return (
                            <span key={k}>{genre} </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Profile;