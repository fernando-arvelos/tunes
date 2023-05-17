import { Component } from 'react';
import '../css/Login.css';
import { func, shape } from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  createNameUser = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    try {
      await createUser({ name: userName });
      history.push('/search');
    } catch (error) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { userName, loading } = this.state;
    const charUser = 3;

    return (
      loading
        ? <Loading />
        : (
          <div data-testid="page-login">
            <h1>Login</h1>

            <form>
              <textarea
                data-testid="login-name-input"
                className="name-login"
                placeholder="Nome"
                onChange={ this.handleChange }
                name="userName"
              />
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ this.createNameUser }
                disabled={ userName.length < charUser }
              >
                Entrar
              </button>
            </form>
          </div>)
    );
  }
}

export default Login;

Login.propTypes = {
  history: shape({
    push: func,
  }).isRequired,
};
