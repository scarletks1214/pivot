import * as React from 'react';
import { ChangeEvent } from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

import { WorkoutPlan, ClassSession, IClassSession, IWorkoutPlanSetEventJson } from 'models';
import { IResourceEditorProps } from '../../../components/ResourceEditorRoute';
import { JsonPreview } from '../../../components/Code';
import WorkoutPlanEditor from './WorkoutPlanEditor';

export default class ClassSessionEditor extends React.Component<IResourceEditorProps<ClassSession>, IClassSession> {
  constructor(props: IResourceEditorProps<ClassSession>) {
    super(props);

    this.state = props.value;
    this.state.workoutPlan.fromJson({
      periods: [
        {
          title: 'Period I',
          circuits: [
            {
              title: 'Circuit I',
              events: [
                { type: 'monologue', duration: 'PT1M30S' },
                { type: 'rest', duration: 'PT1M30S' },
                {
                  type: 'set',
                  duration: 'PT1M30S',
                  reps: 3,
                  weight: { type: '%1rm', value: 0.45 },
                } as IWorkoutPlanSetEventJson,
              ],
            },
          ],
        },
      ],
    });
  }

  handleWorkoutPlanChanged = (newWorkoutPlan: WorkoutPlan) => {
    this.setState({ workoutPlan: newWorkoutPlan });
  };

  handleTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>

        <Row>
          <Col md={3}>
            <h2>Metadata</h2>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTitleChanged} />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" id="description" name="description" />
            </FormGroup>
          </Col>

          <Col md={9}>
            <h2>Plan</h2>
            <WorkoutPlanEditor onChange={this.handleWorkoutPlanChanged} value={this.state.workoutPlan} />

            <section>
              <JsonPreview json={this.state.workoutPlan.toJson()} />
            </section>
          </Col>
        </Row>
      </div>
    );
  }
}
