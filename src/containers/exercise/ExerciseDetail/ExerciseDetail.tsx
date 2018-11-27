import * as React from 'react';
import { Button } from 'reactstrap';
import { Container } from 'reactstrap';

import { ExerciseRevision, ExerciseTestCaseSuiteRunSummary } from 'models';
import Api from '../../../api';
import { Alerts } from '../../../components';
import { SubHeader, Table } from './ExerciseDetail.styled';

interface IState {
  revisions: ExerciseRevision[];
  errors: any;
}

export default class ExerciseDetail extends React.Component<any, IState> {
  state = {
    revisions: [],
    errors: null,
  };

  componentDidMount() {
    Api.trainerExercises
      .revisions(this.props.match.params.exercise_id)
      .then(revisions => this.setState({ revisions }))
      .catch(errors => this.setState({ errors }));
  }

  onNewRevision = () => {
    this.props.history.push(`/exercises/${this.props.match.params.exercise_id}/revisions/new`);
  };

  renderItem = (item: ExerciseRevision) => {
    if (!item.lastSuiteRun) {
      return (
        <tr key={item.revision}>
          <th>{item.revision}</th>
          <td />
          <td />
        </tr>
      );
    }

    const summary: ExerciseTestCaseSuiteRunSummary = item.lastSuiteRun;
    const { completed, total } = summary.testRunsSummary;
    const rate = Math.round((completed / total) * 100);

    return (
      <tr
        key={item.revision}
        className="summary"
        onClick={() => this.props.history.push(`/tests/suite_runs/${summary.id}`)}
      >
        <th>{item.revision}</th>
        <td>{`${completed} / ${total} (${rate}%)`}</td>
        <td>{summary.startTime.fromNow()}</td>
      </tr>
    );
  };

  render() {
    const { revisions, errors } = this.state;
    return (
      <main role="main">
        <Container className="my-5">
          {errors && <Alerts messages={errors} color="danger" />}

          <h1 className="mb-4">Bicep Curls</h1>
          <SubHeader>
            Revisions{' '}
            <Button color="primary" onClick={this.onNewRevision}>
              New Revision
            </Button>
          </SubHeader>
          <Table borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Test Results</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>{revisions && revisions.map(this.renderItem)}</tbody>
          </Table>
        </Container>
      </main>
    );
  }
}
