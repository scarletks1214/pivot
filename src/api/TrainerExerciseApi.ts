import { AxiosInstance } from 'axios';

import { ITrainerExerciseApi } from './ITrainerExerciseApi';

import TrainerExercise from '../models/TrainerExercise';

import { ExerciseRevision, fromJson, WorkstationData } from 'models';

import Nullable from '../utils/Nullable';

export default class TrainerExerciseApi implements ITrainerExerciseApi {
  public readonly client: AxiosInstance;

  private readonly exercisesById: Map<string, TrainerExercise>;

  constructor(client: AxiosInstance) {
    this.client = client;
    this.exercisesById = new Map<string, TrainerExercise>();
  }

  public get(id: string): Nullable<TrainerExercise> {
    const match = this.exercisesById.get(id);

    if (match === undefined) {
      return null;
    }

    return match;
  }

  public one(id: string): Promise<TrainerExercise> {
    return this.client
      .get(`/trainer/exercises/${id}`)
      .then((response: any) => TrainerExercise.fromJson(response.data.data));
  }

  public all(): Promise<TrainerExercise[]> {
    return this.client
      .get('/trainer/exercises')
      .then((response: any) => response.data.data.map(TrainerExercise.fromJson));
  }

  public save(classSession: TrainerExercise): Promise<TrainerExercise> {
    return this.client
      .put(`/trainer/exercises/${classSession.id}`, classSession.toJson())
      .then((response: any) => TrainerExercise.fromJson(response.data.data));
  }

  public delete(id: string): Promise<void> {
    return this.client.delete(`/trainer/exercises/${id}`).then(response => {
      return;
    });
  }

  public makePublic(id: string): Promise<TrainerExercise> {
    return this.client
      .put(`/trainer/exercises/${id}/activate`)
      .then((response: any) => TrainerExercise.fromJson(response.data.data));
  }

  public makePrivate(id: string): Promise<TrainerExercise> {
    return this.client
      .put(`/trainer/exercises/${id}/deactivate`)
      .then((response: any) => TrainerExercise.fromJson(response.data.data));
  }

  public assignImage(id: string, index: number): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public assignVideo(id: string, index: number): Promise<TrainerExercise> {
    return Promise.reject(new Error('Not implemented'));
  }

  public revisions(id: string): Promise<ExerciseRevision[]> {
    return this.client
      .get(`/developer/exercises/${id}/revisions`)
      .then((response: any) => response.data.data.map((item: any) => fromJson(ExerciseRevision, item)))
      .catch(({ response }) => Promise.reject(response.data.errors || [{ detail: 'Request Error' }]));
  }

  public newRevision(id: string, workstationData: WorkstationData): Promise<ExerciseRevision> {
    return this.client
      .post(`/developer/exercises/${id}/revisions`, workstationData.toJson())
      .then((response: any) => fromJson(ExerciseRevision, response.data))
      .catch(({ response }) => Promise.reject(response.data.errors || [{ detail: 'Request Error' }]));
  }
}
