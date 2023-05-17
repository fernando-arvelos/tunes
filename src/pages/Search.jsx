import { Component } from 'react';
import Header from '../components/Header';
import '../css/Search.css';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { artistName } = this.state;
    const charArtistName = 2;
    return (
      <>
        <div data-testid="page-search">
          <Header />
        </div>
        <div>
          <form>
            <textarea
              data-testid="search-artist-input"
              className="search-artist"
              placeholder="Nome do Artista"
              name="artistName"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              onClick={ this.createNameUser }
              disabled={ artistName.length < charArtistName }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
