import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';

import { ClassSession } from 'models';
import Api from '../../../api/';
import { LoaderView } from '../../../components';
import ClassSessionCard from './ClassSessionCard';

interface IProps extends RouteComponentProps<any> {}

interface IState {
  classSessionLoader?: Promise<ClassSession[]>;
  newClass?: ClassSession;
}

export default class ClassSessionBrowse extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      classSessionLoader: undefined,
      newClass: undefined,
    };
  }

  componentWillMount() {
    const classSessionLoader = Api.classSessions.all();
    this.setState({ classSessionLoader });
  }

  renderClassSessionCard = (classSession: ClassSession) => {
    return (
      <Col md={3} key={classSession.id}>
        <ClassSessionCard classSession={classSession} />
      </Col>
    );
  };

  render() {
    if (this.state.newClass) {
      return <Redirect to={'/class-sessions/' + this.state.newClass.id} push={true} />;
    }

    let classSessionLoaderView = null;
    if (this.state.classSessionLoader) {
      const component = (css: ClassSession[]) => <Row>{css.map(this.renderClassSessionCard)}</Row>;
      classSessionLoaderView = (
        <LoaderView
          message="Loading class sessions..."
          failureMessage="Failed to load class sessions!"
          promise={this.state.classSessionLoader}
          component={component}
        />
      );
    }

    return (
      <main role="main">
        <Container className="my-5">
          <h1>
            Class Sessions <Button onClick={this.handleNewClassClicked}>New</Button>
          </h1>
          {classSessionLoaderView}
        </Container>
      </main>
    );
  }

  handleNewClassClicked = () => {
    Api.classSessions.new().then((cs: ClassSession) => {
      this.setState({ newClass: cs });
    });
  };
}
