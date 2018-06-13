import React, { Component } from 'react';
import './App.css';

import Genres from '../Genres/Genres';
import SelectedGenres from '../SelectedGenres/SelectedGenres';
import Items from '../Items/Items';
import SelectedItems from '../SelectedItems/SelectedItems';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import SelectedTracks from '../SelectedTracks/SelectedTracks';
import Playlist from '../Playlist/Playlist';
import PreviewPlayer from '../PreviewPlayer/PreviewPlayer';
import GenerateMixtapeButton from '../GenerateMixtapeButton/GenerateMixtapeButton';
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
    this.renderGenerateMixtapeButton = this.renderGenerateMixtapeButton.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.playPreview = this.playPreview.bind(this);
    this.stopPreview = this.stopPreview.bind(this);
    this.renderManifest = this.renderManifest.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  componentWillMount() {
    if (this.state.availableGenres.length === 0) {
      Spotify.getGenres().then(genres => this.setState({availableGenres: genres}));
    }
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
      Spotify.getGenres().then(genres => this.setState({availableGenres: genres}));
    }
  }

  updateDisplayedGenres(genreStrings) {
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
    const itemSeeds = this.state.itemSeeds;

    let dance = null;
    let energy = null;
    let instrumental = null;
    let minLength = null;
    let maxLength = null;

    for (let i=0; i<itemSeeds.length; i++) {
      if (itemSeeds[i].dance) {
        dance += itemSeeds[i].dance;
      }
      if (itemSeeds[i].energy) {
        energy += itemSeeds[i].energy;
      }
      if (itemSeeds[i].instrumental) {
        instrumental += itemSeeds[i].instrumental;
      }
      if (itemSeeds[i].minLength) {
        minLength = itemSeeds[i].minLength;
      }
      if (itemSeeds[i].maxLength) {
        maxLength = itemSeeds[i].maxLength;
      }
    }

    const itemAttributes = {dance, energy, instrumental, minLength, maxLength};

    Spotify.getRecommendations(songSeeds, genreSeeds, itemAttributes).then(recommendations => this.setState({playlist: recommendations}));
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

  renderGenerateMixtapeButton() {
    if (this.state.genreSeeds.length > 0 || this.state.songSeeds.length > 0) {
      return <GenerateMixtapeButton getRecommendations={this.getRecommendations} />;
    }
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
          <SelectedTracks trackList={this.state.songSeeds} removeTrack={this.removeTrackFromSeeds} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} />
          {this.renderGenerateMixtapeButton()}
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
    return (
      <div className="App">
        <PreviewPlayer preview={this.state.currentPreview} />
        <header>
          <h1>Mixtape Generator</h1>
          <a className="view-playlist" onClick={this.togglePlaylistDisplay}>View Playlist</a>
        </header>
        <div className="app-content">
          <div className="app-options">
            <Genres availableGenres={this.state.availableGenres} displayedGenres={this.state.displayedGenres} updateDisplayedGenres={this.updateDisplayedGenres} genreSeeds={this.state.genreSeeds} addGenre={this.addGenreToSeeds} numberOfColors={this.state.availableItems.length} />
            <Items availableItems={this.state.availableItems} displayedItems={this.state.displayedItems} updateDisplayedItems={this.updateDisplayedItems} itemSeeds={this.state.itemSeeds} addItem={this.addItemToSeeds} />
            <SearchBar onSearch={this.search} numberOfSearchResults={this.state.searchResults.length} />
            <div className="search-results">
              <SearchResults trackList={this.state.searchResults} addTrack={this.addTrackToSeeds} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} />
            </div>
          </div>
          {this.renderManifest()}
          <div className={"App-playlist " + (this.state.displayPlaylist ? 'active' : '')}>
            <Playlist togglePlaylistDisplay={this.togglePlaylistDisplay} trackList={this.state.playlist} playPreview={this.playPreview} stopPreview={this.stopPreview} currentPreview={this.state.currentPreview} genreSeeds={this.state.genreSeeds} itemSeeds={this.state.itemSeeds} songSeeds={this.state.songSeeds} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
