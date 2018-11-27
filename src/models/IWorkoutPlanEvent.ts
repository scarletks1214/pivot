import { Duration } from 'moment';

interface IWorkoutPlanEvent {
  duration: Duration;
  type: string;

  exerciseIds: string[];

  toJson(): any;
}

export default IWorkoutPlanEvent;
