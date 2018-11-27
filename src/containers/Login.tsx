import * as React from 'react';
import { Redirect } from 'react-router';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { AxiosError } from 'axios';

import ErrorAlerts, { IJsonApiError } from '../utils/ErrorAlerts';
import Icon from '../utils/Icon';
import Api from '../api';

interface IState {
  email: string;
  password: string;
  valid: boolean;
  loggedIn: boolean;
  submitting: boolean;
  errors: IJsonApiError[];
}

class Login extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      errors: [],
      loggedIn: false,
      password: '',
      submitting: false,
      valid: false,
    };
  }

  isValid = () => {
    return this.state.password !== '' && this.state.email !== '';
  };

  handleSubmit = (event: any) => {
    this.setState({ submitting: true, errors: [] });
    Api.login(this.state.email, this.state.password)
      .then(result => {
        this.setState({ loggedIn: true, submitting: false });
      })
      .catch((error: AxiosError) => {
        let errors: IJsonApiError[] = [];
        if (error.response) {
          if (error.response.data === undefined) {
            errors.push({
              code: 12345,
              detail: 'An unknown error occurred.',
              title: 'Unknown Error',
            });
          } else if (error.response.status === 404) {
            errors.push({
              code: 404,
              detail: 'Failed to connect to the login server',
              title: 'Connection Failed',
            });
          } else {
            errors = error.response.data.errors;
          }
        }
        this.setState({ submitting: false, errors });
      });
    event.preventDefault();
  };

  handleChangeEmail = (event: any) => {
    this.setState({ email: event.target.value });
  };

  handleChangePassword = (event: any) => {
    this.setState({ password: event.target.value });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/" push={true} />;
    }

    const loading = this.state.submitting ? <Icon type="spinner" spin={true} /> : null;
    const success = this.state.loggedIn ? <Icon type="check" /> : null;

    return (
      <main role="main">
        <Container className="my-5">
          <h1 className="mb-4">Login</h1>
          <ErrorAlerts errors={this.state.errors} />
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="user@example.org"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} />
            </FormGroup>

            <Button disabled={!this.isValid() || this.state.submitting}>
              {success} {loading} Login
            </Button>
          </Form>
        </Container>
      </main>
    );
  }
}

export default Login;
