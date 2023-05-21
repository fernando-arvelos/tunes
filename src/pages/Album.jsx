import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: [],
      infoAlbum: {},
    };
  }

  componentDidMount() {
    this.listMusics();
  }

  listMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const resultMusics = await getMusics(id);
    this.setState({
      musics: resultMusics.filter((music) => music !== resultMusics[0]),
      infoAlbum: resultMusics[0],
    });
  };

  render() {
    const { musics, infoAlbum } = this.state;
    return (
      <>
        <div data-testid="page-album">
          <Header />
        </div>
        <img
          src={ infoAlbum.artworkUrl100 }
          alt={ `Imagem da capa do álbum ${infoAlbum.collectionName}` }
        />
        <h3 data-testid="album-name">{ infoAlbum.collectionName}</h3>
        <p data-testid="artist-name">{ infoAlbum.artistName}</p>
        <div>
          {
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
              />
            ))
          }
        </div>
      </>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};
