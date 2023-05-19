import { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../css/MusicCard.css';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      checkedTracks: {},
      loadingTracks: {},
    };
  }

  handleCheck = async (music) => {
    const { checkedTracks } = this.state;

    const isChecked = checkedTracks[music.trackId] || false;

    if (isChecked) {
      this.setState((prevState) => ({
        checkedTracks: {
          ...prevState.checkedTracks,
          [music.trackId]: false,
        },
      }));
    } else {
      this.setState((prevState) => ({
        loadingTracks: {
          ...prevState.loadingTracks,
          [music.trackId]: true,
        },
      }));

      await addSong(music);
      this.setState((prevState) => ({
        checkedTracks: {
          ...prevState.checkedTracks,
          [music.trackId]: true,
        },
        loadingTracks: {
          ...prevState.loadingTracks,
          [music.trackId]: false,
        },
      }));
    }
  };

  render() {
    const { musics } = this.props;
    const { isChecked, loadingTracks, checkedTracks } = this.state;
    return (
      <div>
        <div>
          {
            musics.map((music, index) => (
              <div key={ index } className="player-music">
                <p>{music.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ music.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>

                <label
                  htmlFor={ music.trackId }
                  data-testid={ `checkbox-music-${music.trackId}` }
                >
                  <input
                    type="checkbox"
                    id={ music.trackId }
                    name="favorite"
                    onChange={ () => this.handleCheck(music) }
                    checked={ isChecked }
                    // style={ { display: 'none' } }
                  />
                  {loadingTracks[music.trackId]
                    ? <Loading />
                    : (
                      <p>
                        {
                          checkedTracks[music.trackId]
                            ? (
                              <AiFillHeart
                                size={ 25 }
                                color="red"
                              />
                            )

                            : (
                              <AiOutlineHeart
                                size={ 25 }
                              />
                            )
                        }
                      </p>
                    )}
                </label>

              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  musics: arrayOf(shape({
    trackName: string,
    previewUrl: string,
  })).isRequired,
}.isRequired;
