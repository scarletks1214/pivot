import * as React from 'react';

import { WorkoutPlan } from 'models';

interface IProps {
  workoutPlan: WorkoutPlan;
  onChange?: (workoutPlan: WorkoutPlan) => void;
}

export class NewWorkoutPlanEditor extends React.Component<IProps> {
  public render() {
    return <div>BEditor</div>;
  }
}
