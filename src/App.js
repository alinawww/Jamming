import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar/SearchBar'
import Playlist from './Playlist/Playlist'

class App extends Component {
  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <Playlist />
          </div>
        </div>
    );
  }
}

export default App;
