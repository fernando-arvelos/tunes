import { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../css/Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      resultArtist: '',
      loading: false,
      notFound: false,
      albums: [],
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  clearTextarea = () => {
    this.setState({
      artistName: '',
    });
  };

  searchAlbums = async () => {
    this.setState({ loading: true });
    const { artistName } = this.state;
    const resultAlbums = await searchAlbumsAPI(artistName);
    this.setState({ loading: false });
    this.setState({ resultArtist: artistName });
    this.setState({ albums: resultAlbums });
    if (resultAlbums.length === 0) {
      this.setState({ notFound: true });
    } else {
      this.setState({ notFound: false });
    }
  };

  render() {
    const { artistName, loading,
      resultArtist, albums, notFound } = this.state;
    const charArtistName = 2;

    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        {loading
          ? <Loading />
          : (
            <div>
              <form>
                <textarea
                  data-testid="search-artist-input"
                  className="search-artist"
                  placeholder="Nome do Artista"
                  name="artistName"
                  value={ artistName }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  onClick={ () => {
                    this.searchAlbums();
                    this.clearTextarea();
                  } }
                  disabled={ artistName.length < charArtistName }
                >
                  Pesquisar
                </button>
              </form>
            </div>
          )}

        <div className="list-album">
          {notFound
            ? <h1>Nenhum álbum foi encontrado</h1>
            : (
              <>
                <div>
                  {resultArtist
                  && (
                    <h3>
                      {`Resultado de álbuns de: ${resultArtist}`}
                    </h3>
                  )}
                </div>
                <div>
                  {albums.map((album, index) => (
                    <Link
                      key={ index }
                      data-testid={ `link-to-album-${album.collectionId}` }
                      to={ `/album/${album.collectionId}` }
                    >
                      <ul>
                        <img src={ album.artworkUrl100 } alt="algum" />
                        <li>{album.collectionName}</li>
                        <li>{album.artistName}</li>
                      </ul>
                    </Link>
                  ))}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

export default Search;
