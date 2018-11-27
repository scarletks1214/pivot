import TrainerExercise, { ITrainerExerciseJSON } from '../models/TrainerExercise';

import { ExerciseRevision, WorkstationData } from 'models';

import Nullable from '../utils/Nullable';

export interface ITrainerExerciseApi {
  one(id: string): Promise<TrainerExercise>;
  all(): Promise<TrainerExercise[]>;
  get(id: string): Nullable<TrainerExercise>;
  delete(id: string): Promise<void>;
  makePublic(id: string): Promise<TrainerExercise>;
  makePrivate(id: string): Promise<TrainerExercise>;
  assignImage(id: string, index: number): Promise<TrainerExercise>;
  assignVideo(id: string, index: number): Promise<TrainerExercise>;
  revisions(id: string): Promise<ExerciseRevision[]>;
  newRevision(id: string, workstationData: WorkstationData): Promise<ExerciseRevision>;
}

class MockTrainerTrainerExerciseApi implements ITrainerExerciseApi {
  private readonly exercises: TrainerExercise[];
  private readonly exercisesById: Map<string, TrainerExercise>;

  constructor(exercises: ITrainerExerciseJSON[]) {
    this.exercises = exercises.map(TrainerExercise.fromJson);
    this.exercisesById = new Map<string, TrainerExercise>(
      this.exercises.map(e => [e.id, e] as [string, TrainerExercise])
    );
  }

  public one(id: string): Promise<TrainerExercise> {
    const match = this.exercisesById.get(id);

    if (match === undefined) {
      return Promise.reject(new Error(`No TrainerExercise found with id ${id}`));
    }

    return Promise.resolve(match);
  }

  public all(): Promise<TrainerExercise[]> {
    return Promise.resolve(this.exercises);
  }

  public get(id: string): Nullable<TrainerExercise> {
    const match = this.exercisesById.get(id);

    if (match === undefined) {
      return null;
    }

    return match;
  }

  public delete(id: string): Promise<void> {
    return Promise.reject(new Error('Not implemented'));
  }

  public makePublic(id: string): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public makePrivate(id: string): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public assignImage(id: string, index: number): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public assignVideo(id: string, index: number): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public revisions(id: string): Promise<ExerciseRevision[]> {
    return Promise.resolve([]);
  }

  public newRevision(id: string, workstationData: WorkstationData): Promise<ExerciseRevision> {
    throw Promise.reject(new Error('Not implemented'));
  }
}

export default new MockTrainerTrainerExerciseApi([] as ITrainerExerciseJSON[]);
