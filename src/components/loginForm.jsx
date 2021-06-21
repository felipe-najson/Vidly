import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from '../common/input';
import Form from '../common/form';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = '/';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={data.username}
            label='Username'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={data.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          <button
            disabled={this.validate()}
            type='submit'
            className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
