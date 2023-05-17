import { Component } from 'react';
import '../css/Login.css';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
    };
  }

  handleChange = (event) => {
    const text = event.target.value;
    const amountChar = 3;
    return text.length >= amountChar
      ? this.setState({ disabled: false }) : this.setState({ disabled: true });
  };

  createNameUser = (event) => {
    event.preventDefault();
    const typedName = event.target.form[0].value;
    createUser({ name: typedName });
  };

  render() {
    const { disabled } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>

        <form>
          <textarea
            data-testid="login-name-input"
            className="name-login"
            placeholder="Nome"
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            disabled={ disabled }
            onClick={ this.createNameUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
