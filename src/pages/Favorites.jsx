import { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    isLoading: true,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.fetchFavoriteSongs();
    this.setState({ isLoading: false });
  }

  fetchFavoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  };

  handleRemoveSong = async (music) => {
    await removeSong(music);
    await this.fetchFavoriteSongs();
  };

  render() {
    const { isLoading, favoriteSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {favoriteSongs.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                onRemoveSong={ this.handleRemoveSong }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
