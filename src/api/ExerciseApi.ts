import { Exercise, fromJson } from 'models';

import ALL_EXERCISES from './Exercises';

import Nullable from '../utils/Nullable';

export interface IExerciseApi {
  one(id: string): Promise<Exercise>;
  all(): Promise<Exercise[]>;
  get(id: string): Nullable<Exercise>;
}

class MockExerciseApi implements IExerciseApi {
  private readonly exercises: Exercise[];
  private readonly exercisesById: Map<string, Exercise>;

  constructor(exercises: any[]) {
    this.exercises = exercises.map(e => fromJson(Exercise, e));
    this.exercisesById = new Map<string, Exercise>(this.exercises.map(e => [e.id, e] as [string, Exercise]));
  }

  public one(id: string): Promise<Exercise> {
    const match = this.exercisesById.get(id);

    if (match === undefined) {
      return Promise.reject(new Error(`No Exercise found with id ${id}`));
    }

    return Promise.resolve(match);
  }

  public all(): Promise<Exercise[]> {
    return Promise.resolve(this.exercises);
  }

  public get(id: string): Nullable<Exercise> {
    const match = this.exercisesById.get(id);

    if (match === undefined) {
      return null;
    }

    return match;
  }
}

export default new MockExerciseApi(ALL_EXERCISES);
