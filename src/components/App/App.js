import React, { Component } from 'react';
import './App.css';

import Genres from '../Genres/Genres';
import SelectedGenres from '../SelectedGenres/SelectedGenres';
import Ingredients from '../Ingredients/Ingredients';
import SelectedIngredients from '../SelectedIngredients/SelectedIngredients';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import RecommendationSeeds from '../RecommendationSeeds/RecommendationSeeds';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import AvailableIngredients from '../../util/AvailableIngredients';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasAccessToken: false,
      availableGenres: [],
      displayedGenres: [],
      searchResults: [],
      availableIngredients: AvailableIngredients,
      ingredientSeeds: [],
      genreSeeds: [],
      songSeeds: [],
      playlist: [],
      playlistName: 'New Playlist'
    };
    this.getGenres = this.getGenres.bind(this);
    this.updateDisplayedGenres = this.updateDisplayedGenres.bind(this);
    this.addGenreToSeeds = this.addGenreToSeeds.bind(this);
    this.removeGenreFromSeeds = this.removeGenreFromSeeds.bind(this);
    this.addIngredientToSeeds = this.addIngredientToSeeds.bind(this);
    this.removeIngredientFromSeeds = this.removeIngredientFromSeeds.bind(this);
    this.search = this.search.bind(this);
    this.addTrackToSeeds = this.addTrackToSeeds.bind(this);
    this.removeTrackFromSeeds = this.removeTrackFromSeeds.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
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
    } else {
      console.log('already have genres, thanks');
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

  addIngredientToSeeds(ingredient) {
    const selectedIngredients = this.state.ingredientSeeds;
    selectedIngredients.push(ingredient);
    this.setState({ingredientSeeds: selectedIngredients});
  }

  removeIngredientFromSeeds(ingredient) {
    const selectedIngredients = this.state.ingredientSeeds;
    const ingredientToRemove = selectedIngredients.indexOf(ingredient);
    selectedIngredients.splice(ingredientToRemove, 1);
    this.setState({ingredientSeeds: selectedIngredients});
  }

  getRecommendations() {
    const songSeeds = this.state.songSeeds.map(track => { return track.id });
    const genreSeeds = this.state.genreSeeds;
    Spotify.getRecommendations(songSeeds, genreSeeds).then(recommendations => this.setState({playlist: recommendations}));
  }

  updatePlaylistName(playlistName) {
    this.setState({playlistName: playlistName});
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
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <Genres availableGenres={this.state.availableGenres} displayedGenres={this.state.displayedGenres} updateDisplayedGenres={this.updateDisplayedGenres} addGenre={this.addGenreToSeeds} />
          <SelectedGenres genreSeeds={this.state.genreSeeds} removeGenre={this.removeGenreFromSeeds} /> 
          <Ingredients availableIngredients={this.state.availableIngredients} addIngredient={this.addIngredientToSeeds} />
          <SelectedIngredients ingredientSeeds={this.state.ingredientSeeds} removeIngredient={this.removeIngredientFromSeeds} />
          <SearchBar onSearch={this.search} />
           <div className="App-playlist">
            <SearchResults trackList={this.state.searchResults} addTrack={this.addTrackToSeeds} />
            <RecommendationSeeds trackList={this.state.songSeeds} removeTrack={this.removeTrackFromSeeds} getRecommendations={this.getRecommendations} />
            <Playlist trackList={this.state.playlist} removeTrack={this.removeTrackFromSeeds} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
