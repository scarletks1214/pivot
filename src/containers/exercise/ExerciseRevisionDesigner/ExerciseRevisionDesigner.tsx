import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Container, Button } from 'reactstrap';

import { WorkstationData } from 'models';
import Api from '../../../api';
import { Alerts } from '../../../components';
import { WorkstationDataForm } from './WorkstationDataForm';

export default class ExerciseRevisionDesigner extends React.Component<
  RouteComponentProps<any>,
  { exerciseId: string; workstationData: WorkstationData; errors: any }
> {
  constructor(props: RouteComponentProps<any>) {
    super(props);

    this.state = {
      exerciseId: props.match.params.exerciseId,
      workstationData: new WorkstationData(),
      errors: null,
    };
  }

  handleChange = (newWorkstationData: WorkstationData) => {
    this.setState({ workstationData: newWorkstationData });
  };

  submitRevision = () => {
    Api.trainerExercises
      .newRevision(this.state.exerciseId, this.state.workstationData)
      .then(() => this.props.history.push(`/exercises/${this.props.match.params.exerciseId}`))
      .catch(errors => this.setState({ errors }));
  };

  render() {
    const { errors } = this.state;
    return (
      <main role="main">
        <Container className="my-5">
          {errors && <Alerts messages={errors} color="danger" />}

          <h1>New Revision</h1>
          <Button onClick={this.submitRevision}>Create Revision</Button>
          <WorkstationDataForm value={this.state.workstationData} onChange={this.handleChange} />
        </Container>
      </main>
    );
  }
}
