import * as React from 'react';
import { Container } from 'reactstrap';
import { ExerciseTestCaseSuiteRun, ExerciseTestCaseRun } from 'models';

import Api from '../../../api';
import { Table } from './ExerciseTestSuiteRunDetail.styled';

interface IExerciseTestSuiteRunDetailState {
  suiteRun?: ExerciseTestCaseSuiteRun;
}

export default class ExerciseTestSuiteRunDetail extends React.Component<any, IExerciseTestSuiteRunDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      suiteRun: undefined,
    };
  }

  componentWillMount() {
    Api.suiteRuns.one(this.props.match.params.suiteRunId).then(suiteRun => this.setState({ suiteRun }));
  }

  renderItem = (item: ExerciseTestCaseRun, index: any) => (
    <tr key={item.id}>
      <td>{index + 1}</td>
      <td>{item.data && item.data.tracking_log && item.data.tracking_log[0] && item.data.tracking_log[0].type}</td>
      <td>{item.data && item.data.errors && item.data.errors[0] && item.data.errors[0].detail}</td>
      <td>{item.startTime && item.startTime.format('H:mm A')}</td>
      <td>{item.endTime && item.endTime.format('H:mm A')}</td>
      <td>
        {item.passed ? 'Yes' : 'No'} / {item.isComplete ? 'Yes' : 'No'}
      </td>
    </tr>
  );

  render() {
    const { suiteRun } = this.state;

    return (
      <main role="main">
        <Container className="my-5">
          <h1>Test Suite</h1>
          {suiteRun && (
            <Table borderless>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Type</th>
                  <th>Detail</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Passed / Completed</th>
                </tr>
              </thead>
              <tbody>
                {suiteRun.runs && suiteRun.runs.map((item: ExerciseTestCaseRun, index) => this.renderItem(item, index))}
              </tbody>
            </Table>
          )}
        </Container>
      </main>
    );
  }
}
