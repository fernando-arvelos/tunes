import { Component } from 'react';
import { shape, string } from 'prop-types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import '../css/MusicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async ({ target }) => {
    const { music } = this.props;
    this.setState({
      isChecked: target.checked,
      isLoading: true,
    });

    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    this.setState({
      isLoading: false,
    });
  };

  getFavorites = async () => {
    const { music } = this.props;
    const local = await getFavoriteSongs();
    this.setState({
      isChecked: local.some((element) => element.trackId === music.trackId),
    });
  };

  render() {
    const { music } = this.props;
    const { isChecked, isLoading } = this.state;
    return (

      <div className="player-music">
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
            checked={ isChecked }
            onChange={ (event) => this.handleChange(event) }
          />
          {isLoading
            ? <Loading />
            : (
              <p>
                {
                  isChecked
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

    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  music: shape({
    trackName: string,
    previewUrl: string,
  }).isRequired,
}.isRequired;
