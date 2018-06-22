import React, { Component } from 'react'
import './App.css'
import './mobile.css'

import MobileToggle from '../MobileToggle/MobileToggle'
import Genres from '../Genres/Genres'
import SelectedGenres from '../SelectedGenres/SelectedGenres'
import Items from '../Items/Items'
import SelectedItems from '../SelectedItems/SelectedItems'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import SelectedTracks from '../SelectedTracks/SelectedTracks'
import Playlist from '../Playlist/Playlist'
import PreviewPlayer from '../PreviewPlayer/PreviewPlayer'
import GenerateMixtapeButton from '../GenerateMixtapeButton/GenerateMixtapeButton'
import Spotify from '../../util/Spotify'
import AvailableItems from '../../util/AvailableItems'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mobileDisplaySelections: false,
      availableGenres: [],
      displayedGenres: [],
      searchResults: [],
      availableItems: AvailableItems,
      displayedItems: [],
      itemSeeds: [],
      genreSeeds: [],
      songSeeds: [],
      playlist: [],
      getRecommendationsWasSuccessful: true,
      displayPlaylist: false,
      playlistName: 'New Playlist',
      currentPreview: ''
    }
    this.handleAccessSpotify = this.handleAccessSpotify.bind(this)
    this.mobileShowOptions = this.mobileShowOptions.bind(this)
    this.mobileShowSelections = this.mobileShowSelections.bind(this)
    this.getGenres = this.getGenres.bind(this)
    this.updateDisplayedGenres = this.updateDisplayedGenres.bind(this)
    this.addGenreToSeeds = this.addGenreToSeeds.bind(this)
    this.removeGenreFromSeeds = this.removeGenreFromSeeds.bind(this)
    this.updateDisplayedItems = this.updateDisplayedItems.bind(this)
    this.addItemToSeeds = this.addItemToSeeds.bind(this)
    this.removeItemFromSeeds = this.removeItemFromSeeds.bind(this)
    this.search = this.search.bind(this)
    this.addTrackToSeeds = this.addTrackToSeeds.bind(this)
    this.removeTrackFromSeeds = this.removeTrackFromSeeds.bind(this)
    this.togglePlaylistDisplay = this.togglePlaylistDisplay.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.renderGenerateMixtapeButton = this.renderGenerateMixtapeButton.bind(
      this
    )
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
    this.playPreview = this.playPreview.bind(this)
    this.stopPreview = this.stopPreview.bind(this)
    this.renderManifest = this.renderManifest.bind(this)
    this.savePlaylist = this.savePlaylist.bind(this)
  }

  handleAccessSpotify() {
    sessionStorage.setItem('displayIntro', true)
    this.getGenres()
  }

  mobileShowOptions() {
    this.setState({ mobileDisplaySelections: false })
  }

  mobileShowSelections() {
    this.setState({ mobileDisplaySelections: true })
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults =>
      this.setState({ searchResults: searchResults })
    )
  }

  addTrackToSeeds(track) {
    if (!this.state.songSeeds.find(seedTrack => seedTrack.id === track.id)) {
      const currentSongSeeds = this.state.songSeeds
      currentSongSeeds.push(track)
      this.setState({ songSeeds: currentSongSeeds })
    }
  }

  removeTrackFromSeeds(track) {
    const currentSongSeeds = this.state.songSeeds
    const newSongSeeds = currentSongSeeds.filter(
      currentSongSeedsTrack => currentSongSeedsTrack.id !== track.id
    )
    this.setState({ songSeeds: newSongSeeds })
  }

  getGenres() {
    if (this.state.availableGenres.length === 0) {
      Spotify.getGenres().then(genres => {
        if (genres !== undefined) {
          this.setState({ availableGenres: genres })
        }
      })
    }
  }

  updateDisplayedGenres(genreStrings) {
    this.setState({ displayedGenres: genreStrings })
  }

  addGenreToSeeds(genre) {
    const selectedGenres = this.state.genreSeeds
    if (!selectedGenres.find(selectedGenre => genre === selectedGenre)) {
      selectedGenres.push(genre)
      this.setState({ genreSeeds: selectedGenres })
    }
  }

  removeGenreFromSeeds(genre) {
    const selectedGenres = this.state.genreSeeds
    const genreToRemove = selectedGenres.indexOf(genre)
    selectedGenres.splice(genreToRemove, 1)
    this.setState({ genreSeeds: selectedGenres })
  }

  updateDisplayedItems(itemStrings) {
    this.setState({ displayedItems: itemStrings })
  }

  addItemToSeeds(item) {
    const selectedItems = this.state.itemSeeds
    if (
      !selectedItems.find(selectedItem => item === selectedItem) &&
      selectedItems.length < 2
    ) {
      selectedItems.push(item)
      this.setState({ itemSeeds: selectedItems })
    }
  }

  removeItemFromSeeds(item) {
    const selectedItems = this.state.itemSeeds
    const itemToRemove = selectedItems.indexOf(item)
    selectedItems.splice(itemToRemove, 1)
    this.setState({ itemSeeds: selectedItems })
  }

  getRecommendations() {
    const songSeeds = this.state.songSeeds.map(track => {
      return track.id
    })
    const genreSeeds = this.state.genreSeeds
    const itemSeeds = this.state.itemSeeds

    let dance = null
    let energy = null
    let instrumental = null
    let minLength = null
    let maxLength = null

    for (let i = 0; i < itemSeeds.length; i++) {
      if (itemSeeds[i].dance) {
        dance += itemSeeds[i].dance
      }
      if (itemSeeds[i].energy) {
        energy += itemSeeds[i].energy
      }
      if (itemSeeds[i].instrumental) {
        instrumental += itemSeeds[i].instrumental
      }
      if (itemSeeds[i].minLength) {
        minLength = itemSeeds[i].minLength
      }
      if (itemSeeds[i].maxLength) {
        maxLength = itemSeeds[i].maxLength
      }
    }

    const itemAttributes = { dance, energy, instrumental, minLength, maxLength }

    Spotify.getRecommendations(songSeeds, genreSeeds, itemAttributes).then(
      recommendations =>
        this.setState({
          playlist: recommendations[0],
          getRecommendationsWasSuccessful: recommendations[1]
        })
    )
    this.togglePlaylistDisplay()
  }

  togglePlaylistDisplay() {
    if (this.state.displayPlaylist) {
      this.setState({
        displayPlaylist: false,
        getRecommendationsWasSuccessful: true
      })
    } else {
      this.setState({ displayPlaylist: true })
    }
  }

  updatePlaylistName(playlistName) {
    this.setState({ playlistName: playlistName })
  }

  playPreview(preview) {
    this.setState({ currentPreview: preview })
  }

  stopPreview() {
    this.setState({ currentPreview: '' })
  }

  renderGenerateMixtapeButton() {
    if (this.state.genreSeeds.length > 0 || this.state.songSeeds.length > 0) {
      return (
        <GenerateMixtapeButton getRecommendations={this.getRecommendations} />
      )
    }
  }

  renderManifest() {
    if (
      this.state.genreSeeds.length < 1 &&
      this.state.itemSeeds.length < 1 &&
      this.state.songSeeds.length < 1
    ) {
      return (
        <div
          className={
            this.state.mobileDisplaySelections
              ? 'app-selections no-selections active'
              : 'app-selections no-selections'
          }
        >
          <h1>Start building your magic mixtape!</h1>
          <p>
            Select at least one genre or song. Your mixtape's style will be
            based on your selections.
          </p>
          <svg
            className="svg-inline--fa fa-compact-disc fa-w-16"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="compact-disc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
            />
          </svg>
          <p>
            Optionally, add a magic item or two — each item can affect your
            mixtape's <span>energy</span>, <span>danceability</span>,{' '}
            <span>instrumentalness</span>, and <span>track length</span>.
          </p>
          <svg
            className="svg-inline--fa fa-compact-disc fa-w-16"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="compact-disc"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512"
            data-fa-i2svg=""
          >
            <path
              fill="currentColor"
              d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zM88 256H56c0-105.9 86.1-192 192-192v32c-88.2 0-160 71.8-160 160zm160 96c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zm0-128c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"
            />
          </svg>
          <p>
            Create your mixtape, listen to track previews, and if you like what
            your hear save your mixtapes to your Spotify account!
          </p>
        </div>
      )
    } else {
      return (
        <div
          className={
            this.state.mobileDisplaySelections
              ? 'app-selections active'
              : 'app-selections'
          }
        >
          <SelectedGenres
            genreSeeds={this.state.genreSeeds}
            removeGenre={this.removeGenreFromSeeds}
          />
          <SelectedItems
            itemSeeds={this.state.itemSeeds}
            removeItem={this.removeItemFromSeeds}
          />
          <SelectedTracks
            trackList={this.state.songSeeds}
            removeTrack={this.removeTrackFromSeeds}
            playPreview={this.playPreview}
            stopPreview={this.stopPreview}
            currentPreview={this.state.currentPreview}
          />
          {this.renderGenerateMixtapeButton()}
        </div>
      )
    }
  }

  savePlaylist() {
    const trackUris = this.state.playlist.map(track => {
      return track.uri
    })
    Spotify.savePlaylist(this.state.playlistName, trackUris)
    this.setState({
      playlist: [],
      playlistName: 'New Playlist'
    })
    this.togglePlaylistDisplay()
  }

  render() {
    let displayIntro = sessionStorage.getItem('displayIntro')
    if (!displayIntro) {
      const imagePath = process.env.REACT_APP_IMAGE_PATH
      return (
        <div className="app-intro">
          <span>
            <h1>
              <span>M</span>
              <span>a</span>
              <span>g</span>
              <span>i</span>
              <span>c</span> <span>M</span>
              <span>i</span>
              <span>x</span>
              <span>t</span>
              <span>a</span>
              <span>p</span>
              <span>e</span>
              <sup>Beta</sup>
            </h1>
            <p>
              Generate mixtapes inspired by your favorite songs and save them to
              your Spotify account. Choose your favorite genres, or explore some
              new ones.
            </p>
            <p>
              Add magic items to your manifest — each item has special
              characteristics that could affect the <span>energy</span>,{' '}
              <span>danceability</span>, <span>instrumentalness</span>, and{' '}
              <span>length</span> of the songs in your mixtape!
            </p>
            <div className="images">
              <span className="mask">
                <img src={`${imagePath}/mask.png`} alt="Haunted Mask" />
              </span>
              <span className="pineapple">
                <img src={`${imagePath}/pineapple.png`} alt="Pineapple" />
              </span>
              <span className="kitty">
                <img src={`${imagePath}/kitty.png`} alt="Lucky Kitty" />
              </span>
              <span className="dinosaur-skull">
                <img
                  src={`${imagePath}/dinosaur-skull.png`}
                  alt="Ancient Skull"
                />
              </span>
              <span className="hour-glass">
                <img src={`${imagePath}/hour-glass.png`} alt="House Glass" />
              </span>
            </div>
            <p>
              This app requires access to Spotify in order to search genres and
              songs, and to save mixtapes to your Spotify account. Connect Magic
              Mixtape to your Spotify account by clicking below.
            </p>
            <button onClick={this.handleAccessSpotify}>
              Connect to Spotify
            </button>
          </span>
        </div>
      )
    } else {
      this.getGenres()
      return (
        <div className="App">
          <PreviewPlayer preview={this.state.currentPreview} />
          <header>
            <h1>
              <span>M</span>
              <span>a</span>
              <span>g</span>
              <span>i</span>
              <span>c</span> <span>M</span>
              <span>i</span>
              <span>x</span>
              <span>t</span>
              <span>a</span>
              <span>p</span>
              <span>e</span>
              <sup>Beta</sup>
            </h1>
            <a href="https://www.ryandestefano.com/magic-mixtape" target="_blank">About</a>
          </header>
          <MobileToggle
            mobileDisplaySelections={this.state.mobileDisplaySelections}
            showOptions={this.mobileShowOptions}
            showSelections={this.mobileShowSelections}
            numberOfSeeds={
              this.state.genreSeeds.length +
              this.state.itemSeeds.length +
              this.state.songSeeds.length
            }
          />
          <div className="app-content">
            <div
              className={
                !this.state.mobileDisplaySelections
                  ? 'app-options active'
                  : 'app-options'
              }
            >
              <Genres
                availableGenres={this.state.availableGenres}
                displayedGenres={this.state.displayedGenres}
                updateDisplayedGenres={this.updateDisplayedGenres}
                genreSeeds={this.state.genreSeeds}
                addGenre={this.addGenreToSeeds}
                numberOfColors={this.state.availableItems.length}
              />
              <Items
                availableItems={this.state.availableItems}
                displayedItems={this.state.displayedItems}
                updateDisplayedItems={this.updateDisplayedItems}
                itemSeeds={this.state.itemSeeds}
                addItem={this.addItemToSeeds}
              />
              <SearchBar
                onSearch={this.search}
                numberOfSearchResults={this.state.searchResults.length}
              />
              <SearchResults
                trackList={this.state.searchResults}
                addTrack={this.addTrackToSeeds}
                playPreview={this.playPreview}
                stopPreview={this.stopPreview}
                currentPreview={this.state.currentPreview}
              />
            </div>
            {this.renderManifest()}
            <div
              className={
                'App-playlist ' + (this.state.displayPlaylist ? 'active' : '')
              }
            >
              <Playlist
                togglePlaylistDisplay={this.togglePlaylistDisplay}
                trackList={this.state.playlist}
                getRecommendationsWasSuccessful={
                  this.state.getRecommendationsWasSuccessful
                }
                playPreview={this.playPreview}
                stopPreview={this.stopPreview}
                currentPreview={this.state.currentPreview}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist}
              />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App
