import React, {Component} from 'react';
import './App.css';
import Profile from './Profile';
import Gallery from './Gallery';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import {TOKEN} from './config';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            artist: null,
            tracks: []
        };

    }

    search() {

        const BASE_URL = "https://api.spotify.com/v1/search";
        let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`;
        const ALBUM_URL = `https://api.spotify.com/v1/artists`;

        const myOptions = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + TOKEN
            },
            mode: 'cors',
            cache: 'default'
        };

        fetch(FETCH_URL, myOptions)
            .then(response => response.json())
            .then(json => {
                const artist = json.artists.items[0];
                this.setState({artist});
                console.log(artist);

                FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=TR`
                fetch(FETCH_URL, myOptions)
                    .then(response => response.json())
                    .then(json => {
                        const {tracks} = json;
                        console.log(tracks);
                        this.setState({tracks});
                    })

            });
        console.log(FETCH_URL)
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist..."
                            value={this.state.query}
                            onChange={event => this.setState({query: event.target.value})}
                            onKeyPress={event => {
                                if (event.key === 'Enter')
                                    this.search()

                            }}
                        />
                        <InputGroup.Addon onClick={() => this.search()}>
                            <Glyphicon glyph="search"/>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                {
                    this.state.artist !== null ?
                        <div>
                            <Profile artist={this.state.artist}/>
                            <Gallery
                                tracks={this.state.tracks}
                            />
                        </div> :
                        <div></div>
                }


            </div>
        )
    }
}

export default App;