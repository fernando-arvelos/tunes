import { Component } from 'react';
import { isEmail } from 'validator'; // Importar isEmail do validator
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../css/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      userData: {
        description: '',
        email: '',
        image: '',
        name: '',
      },
      disabledButton: true,
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

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prev) => ({
      ...prev,
      userData: {
        ...prev.userData,
        [name]: value,
      },
    }), () => {
      this.validateForm();
    });
  };

  validateForm = () => {
    const { userData: { email, name, description } } = this.state;
    const isEmailValid = isEmail(email);
    const isNameValid = name.length >= 2;
    const isDescriptionValid = description.length >= 2;

    this.setState({
      disabledButton: !(isEmailValid && isNameValid && isDescriptionValid),
    });
  };

  handleSubmit = async (event) => {
    const { userData: { email, name, description, image } } = this.state;
    const { history } = this.props;
    event.preventDefault();
    await updateUser({
      name,
      email,
      image,
      description,
    });
    history.push('/profile');
  };

  render() {
    const { userData, isLoading, disabledButton } = this.state;
    const { name, email, image, description } = userData;
    return (
      <>
        <div data-testid="page-profile-edit">
          <Header />
        </div>

        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <p>Editar perfil</p>
              <div>
                <img
                  src={ image }
                  alt={ `Foto do usuário ${name}` }
                  data-testid="profile-image"
                />

                <input
                  name="image"
                  type="text"
                  placeholder="Insira um link da sua foto"
                  data-testid="edit-input-image"
                  defaultValue={ image || '' }
                  onChange={ this.handleInputChange }
                />
              </div>

              <form>
                <ul className="form-profile-edit">
                  <span>Nome</span>
                  <span>Fique a vontade para usar seu nome social</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    data-testid="edit-input-name"
                    defaultValue={ name || '' }
                    onChange={ this.handleInputChange }
                  />

                  <span>E-mail</span>
                  <span>Escolha um e-mail que consulte diariamente</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="user@email.com.br"
                    data-testid="edit-input-email"
                    defaultValue={ email || '' }
                    onChange={ this.handleInputChange }
                  />

                  <span>Descrição</span>
                  <textarea
                    name="description"
                    placeholder="Digite algo sobre você"
                    data-testid="edit-input-description"
                    defaultValue={ description || '' }
                    onChange={ this.handleInputChange }
                  />
                </ul>

                <button
                  type="submit"
                  data-testid="edit-button-save"
                  disabled={ disabledButton }
                  onClick={ this.handleSubmit }
                >
                  Salvar
                </button>
              </form>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
