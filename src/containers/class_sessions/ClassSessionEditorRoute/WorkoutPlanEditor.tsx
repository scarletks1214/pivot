import * as React from 'react';
import update from 'immutability-helper';

import { WorkoutPlan, WorkoutPlanEvent, WorkoutPlanSetEvent, Duration, WorkoutPlanPeriod } from 'models';

import { IResourceEditorProps } from '../../../components/ResourceEditor';
import PeriodComponent from './PeriodComponent';
import EventComponent from './EventComponent';

export default class WorkoutPlanEditor extends React.Component<
  IResourceEditorProps<WorkoutPlan>,
  { event: WorkoutPlanEvent }
> {
  constructor(props: IResourceEditorProps<WorkoutPlan>) {
    super(props);
    this.state = {
      event: new WorkoutPlanSetEvent(Duration.Seconds(60)),
    };
  }

  handlePeriodChanged = (index: number, newValue: WorkoutPlanPeriod) => {
    this.props.onChange(update(this.props.value, { periods: { $splice: [[index, 1, newValue]] } }));
  };

  handleEventChanged = (newValue: WorkoutPlanSetEvent) => {
    this.setState({ event: newValue });
  };

  render() {
    const workoutPlan = this.props.value;
    return [
      <section key="event">
        Event
        <EventComponent value={this.state.event} onChange={this.handleEventChanged} />
      </section>,
      <section key="editor">
        Editor
        {workoutPlan.periods.map((period, index) => (
          <PeriodComponent key={index} value={period} onChange={this.handlePeriodChanged.bind(this, index)} />
        ))}
      </section>,
    ];
  }
}
