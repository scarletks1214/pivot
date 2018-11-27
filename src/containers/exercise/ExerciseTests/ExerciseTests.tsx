import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Badge, Button, Col, Container, NavLink, Row, Table } from 'reactstrap';
import moment from 'moment';
import update from 'immutability-helper';

import Api from '../../../api';
import ExerciseTest from '../../../models/ExerciseTest';
import styles from './ExerciseTests.css.js';

interface IProps extends RouteComponentProps<any> {}

interface IExcerciseTestsState {
  exercise_tests: ExerciseTest[] | null;
  newTest: ExerciseTest | null;
  error: string | null;
}

export default class ExerciseTests extends React.Component<IProps, IExcerciseTestsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      exercise_tests: null,
      newTest: null,
    };
  }

  componentDidMount() {
    Api.exercise_tests.all().then((exerciseTests: ExerciseTest[]) => {
      const sortedExerciseTests = exerciseTests.sort((a, b) => b.updated.localeCompare(a.updated));
      this.setState({ exercise_tests: sortedExerciseTests });
    });
  }

  renderExerciseName = (exerciseId: string | null) => {
    if (exerciseId == null) {
      return <span className="text-secondary">No exercise specified</span>;
    }
    const exercise = Api.exercises.get(exerciseId);
    if (exercise == null) {
      return <span className="text-secondary">Invalid Exercise ID</span>;
    }
    return <span>{exercise.name}</span>;
  };

  onNewTest = () => {
    Api.exercise_tests
      .new()
      .then((newTest: ExerciseTest) => {
        this.setState({ newTest });
        this.props.history.push('/exercise-tests/' + newTest.id);
      })
      .catch(error => {
        this.setState(
          update(this.state, {
            error: { $set: 'Failed to create new exercise.' },
          })
        );
      });
  };

  renderError = (error: string) => {
    const closeAction = () => this.setState(update(this.state, { error: { $set: null } }));

    return (
      <div style={{ marginTop: 40 }}>
        <p key={error} className="alert alert-danger alert-dismissible fade show" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAction}>
            <span aria-hidden="true">&times;</span>
          </button>
          {error}
        </p>
      </div>
    );
  };

  render() {
    const exerciseTestRow = (this.state.exercise_tests || []).map(e => {
      return (
        <tr key={e.id} style={styles.TableRow}>
          <td style={styles.TableRowColumn} scope="row">
            {e.title == null ? (
              <Row style={styles.UnNamed}>
                <Col md="6">
                  <span>Unnamed test</span>
                </Col>
                <Col md="6">
                  <Badge color="info" pill={true}>
                    CHECKS NEEDED
                  </Badge>
                </Col>
              </Row>
            ) : (
              <div>
                <span style={styles.ExTestTitle}> {e.title} </span>
              </div>
            )}
          </td>
          <td style={styles.TableRowColumn}>
            <div>
              <span>{moment(e.updated).fromNow()}</span>
            </div>
            <div style={styles.UpdatedTime}>
              <span className="text-secondary">{new Date(e.updated).toDateString()}</span>
            </div>
          </td>
          <td style={styles.TableRowColumn}>
            <span>{this.renderExerciseName(e.exerciseId)}</span>
          </td>
          <td style={styles.TableRowColumn}>
            <NavLink href={'/exercise-tests/' + e.id}>Edit</NavLink>
          </td>
        </tr>
      );
    });

    const errorDisplay = this.state.error ? this.renderError(this.state.error) : null;

    return (
      <main role="main">
        <Container>
          {errorDisplay}
          <Row style={styles.TitleBar}>
            <Col sm="4">
              <h1 style={styles.Title}>Exercise Tests</h1>
            </Col>
            <Col sm="8" style={styles.ActionBar}>
              <Button color="primary" style={styles.ActionButton} onClick={this.onNewTest}>
                + New Test
              </Button>
              <Button color="primary" style={styles.ActionButton}>
                + Batch Upload
              </Button>
            </Col>
          </Row>
          <Table striped={true} bordered={true}>
            <tbody>{exerciseTestRow}</tbody>
          </Table>
        </Container>
      </main>
    );
  }
}
