import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/Profile.css';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userData: {},
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData = async () => {
    const user = await getUser();
    this.setState({
      isLoading: false,
      userData: user,
    });
  };

  render() {
    const { userData, isLoading } = this.state;
    const { name, email, image, description } = userData;
    return (
      <>
        <div data-testid="page-profile">
          <Header />
        </div>

        <div>
          {isLoading
            ? <Loading />
            : (
              <div className="user-data">
                <img
                  src={ image }
                  alt={ `Foto do usuário ${name}` }
                  data-testid="profile-image"
                />
                <span>Nome</span>
                <span>{ name }</span>

                <span>E-mail</span>
                <span>{ email }</span>

                <span>Descrição</span>
                <span>{ description }</span>

                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </div>
            )}
        </div>
      </>
    );
  }
}

export default Profile;
