import * as React from 'react';
import { Container } from 'reactstrap';

import Api from '../api';
import User from '../models/User';

interface IState {
  promise?: Promise<User>;
}

export default class Home extends React.Component<{}, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      promise: undefined,
    };
  }

  componentWillMount() {
    const promise = Api.me();
    this.setState({ promise });
    promise.then(user => user).catch(error => {
      return;
    });
  }

  render() {
    return (
      <main
        style={{
          backgroundImage: 'url(/background-desaturated.jpg)',
          backgroundSize: 'cover',
        }}
      >
        <Container>
          <h1 id="name">Trane</h1>
        </Container>
      </main>
    );
  }
}
