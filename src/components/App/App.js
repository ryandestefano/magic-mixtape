import React, { Component } from 'react';
import './App.css';

import Genres from '../Genres/Genres';
import SelectedGenres from '../SelectedGenres/SelectedGenres';
import Items from '../Items/Items';
import SelectedItems from '../SelectedItems/SelectedItems';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import RecommendationSeeds from '../RecommendationSeeds/RecommendationSeeds';
import Playlist from '../Playlist/Playlist';
import PreviewPlayer from '../PreviewPlayer/PreviewPlayer';
import Spotify from '../../util/Spotify';
import AvailableItems from '../../util/AvailableItems';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccessToken: false,
      availableGenres: [],
      displayedGenres: [],
      searchResults: [],
      availableItems: AvailableItems,
      displayedItems: [],
      itemSeeds: [],
      genreSeeds: [],
      songSeeds: [],
      playlist: [],
      displayPlaylist: false,
      playlistName: 'New Playlist',
      currentPreview: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.updateDisplayedGenres = this.updateDisplayedGenres.bind(this);
    this.addGenreToSeeds = this.addGenreToSeeds.bind(this);
    this.removeGenreFromSeeds = this.removeGenreFromSeeds.bind(this);
    this.updateDisplayedItems = this.updateDisplayedItems.bind(this);
    this.addItemToSeeds = this.addItemToSeeds.bind(this);
    this.removeItemFromSeeds = this.removeItemFromSeeds.bind(this);
    this.search = this.search.bind(this);
    this.addTrackToSeeds = this.addTrackToSeeds.bind(this);
    this.removeTrackFromSeeds = this.removeTrackFromSeeds.bind(this);
    this.togglePlaylistDisplay = this.togglePlaylistDisplay.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.stopPreview = this.stopPreview.bind(this);
    this.renderManifest = this.renderManifest.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => this.setState({searchResults: searchResults}));
  }

  addTrackToSeeds(track) {
    if (!this.state.songSeeds.find(seedTrack => seedTrack.id === track.id)) {
      const currentSongSeeds = this.state.songSeeds;
      currentSongSeeds.push(track);
      this.setState({songSeeds: currentSongSeeds});
    }
  }

  removeTrackFromSeeds(track) {
    const currentSongSeeds = this.state.songSeeds;
    const newSongSeeds = currentSongSeeds.filter(currentSongSeedsTrack => currentSongSeedsTrack.id !== track.id);
    this.setState({songSeeds: newSongSeeds});
  }

  getGenres() {
    if (this.state.availableGenres.length === 0) {
      console.log('getting genres');
      Spotify.getGenres().then(genres => this.setState({availableGenres: genres}));
    }
  }

  updateDisplayedGenres(genreStrings) {
    console.log(genreStrings);
    this.setState({displayedGenres: genreStrings});
  }

  addGenreToSeeds(genre) {
    const selectedGenres = this.state.genreSeeds;
    if (!selectedGenres.find(selectedGenre => genre === selectedGenre)) {
      selectedGenres.push(genre);
      this.setState({genreSeeds: selectedGenres});
    }
  }

  removeGenreFromSeeds(genre) {
    const selectedGenres = this.state.genreSeeds;
    const genreToRemove = selectedGenres.indexOf(genre);
    selectedGenres.splice(genreToRemove, 1);
    this.setState({genreSeeds: selectedGenres});
  }

  updateDisplayedItems(itemStrings) {
    this.setState({displayedItems: itemStrings});
  }

  addItemToSeeds(item) {
    const selectedItems = this.state.itemSeeds;
    if (!selectedItems.find(selectedItem => item === selectedItem) && selectedItems.length < 2) {
      selectedItems.push(item);
      this.setState({itemSeeds: selectedItems});
    }
  }

  removeItemFromSeeds(item) {
    const selectedItems = this.state.itemSeeds;
    const itemToRemove = selectedItems.indexOf(item);
    selectedItems.splice(itemToRemove, 1);
    this.setState({itemSeeds: selectedItems});
  }

  getRecommendations() {
    const songSeeds = this.state.songSeeds.map(track => { return track.id });
    const genreSeeds = this.state.genreSeeds;
    Spotify.getRecommendations(songSeeds, genreSeeds).then(recommendations => this.setState({playlist: recommendations}));
    this.togglePlaylistDisplay();
  }

  togglePlaylistDisplay() {
    if (this.state.displayPlaylist) {
      this.setState({displayPlaylist: false});
    } else {
      this.setState({displayPlaylist: true});
    }
  }

  updatePlaylistName(playlistName) {
    this.setState({playlistName: playlistName});
  }

  playPreview(preview) {
    this.setState({currentPreview: preview});
  }

  stopPreview() {
    this.setState({currentPreview: ''});
  }

  renderManifest() {
    if (this.state.genreSeeds.length < 1 && this.state.itemSeeds.length < 1 && this.state.songSeeds.length < 1) {
      return (
        <div className="app-selections">
          <p>There is nothing in your manifest!</p>
        </div>
      );
    } else {
      return (
        <div className="app-selections">
          <SelectedGenres genreSeeds={this.state.genreSeeds} removeGenre={this.removeGenreFromSeeds} /> 
          <SelectedItems itemSeeds={this.state.itemSeeds} removeItem={this.removeItemFromSeeds} />
          <RecommendationSeeds trackList={this.state.songSeeds} removeTrack={this.removeTrackFromSeeds} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} getRecommendations={this.getRecommendations} />
        </div>
      );
    }
  }

  savePlaylist() {
    const trackUris = this.state.playlist.map(track => { return track.uri });
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlist: [],
      playlistName: 'New Playlist'
    });
  }

  render() {
    this.getGenres();
    return (
      <div>
        <PreviewPlayer preview={this.state.currentPreview} />
        <h1>Mixtape Generator</h1>
        <div className="App">
          <div className="app-options">
            <Genres availableGenres={this.state.availableGenres} displayedGenres={this.state.displayedGenres} updateDisplayedGenres={this.updateDisplayedGenres} addGenre={this.addGenreToSeeds} numberOfColors={this.state.availableItems.length} />
            <Items availableItems={this.state.availableItems} displayedItems={this.state.displayedItems} updateDisplayedItems={this.updateDisplayedItems} addItem={this.addItemToSeeds} />
            <SearchBar onSearch={this.search} />
            <div className="search-results">
              <SearchResults trackList={this.state.searchResults} addTrack={this.addTrackToSeeds} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} />
            </div>
          </div>
          {this.renderManifest()}
          <div className={"App-playlist " + (this.state.displayPlaylist ? 'active' : '')}>
            <Playlist togglePlaylistDisplay={this.togglePlaylistDisplay} trackList={this.state.playlist} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
