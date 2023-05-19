import { Component } from 'react';
import { arrayOf, shape, string } from 'prop-types';

class MusicCard extends Component {
  render() {
    const { musics } = this.props;
    return (
      <div>
        <div>
          {
            musics.map((music, index) => (
              <>
                <p key={ index }>{music.trackName}</p>
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
              </>
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
