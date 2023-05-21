import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.getNameUser();
  }

  getNameUser = async () => {
    this.setState({ loading: true });
    const getNameUser = await getUser();
    this.setState({ nameUser: getNameUser.name });
    this.setState({ loading: false });
  };

  render() {
    const { nameUser, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
        <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        {loading ? (
          <Loading />
        ) : (
          <p data-testid="header-user-name">{nameUser}</p>
        )}
      </header>
    );
  }
}

export default Header;
