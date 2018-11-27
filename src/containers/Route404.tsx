import * as React from 'react';
import { Container } from 'reactstrap';

export default (props: any) => {
  return (
    <Container>
      <h1 className="jumbotron-heading">Error 404</h1>
      <p className="lead text-muted">
        No match for <code>{props.location.pathname}</code>
      </p>
    </Container>
  );
};
