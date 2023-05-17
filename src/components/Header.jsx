import { Component } from 'react';
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
      loading
        ? <Loading />
        : (
          <header data-testid="header-component">
            <h3 data-testid="header-user-name">{ nameUser }</h3>
          </header>)
    );
  }
}

export default Header;
