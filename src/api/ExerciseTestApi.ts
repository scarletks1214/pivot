import { AxiosInstance } from 'axios';

import ExerciseTest from '../models/ExerciseTest';

import IExerciseTestApi from './IExerciseTestApi';

export default class ExerciseTestApi implements IExerciseTestApi {
  public readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public all(): Promise<ExerciseTest[]> {
    return this.client.get('/developer/tests').then((response: any) => response.data.data.map(ExerciseTest.fromJson));
  }

  public new(): Promise<ExerciseTest> {
    return this.client.post('/developer/tests').then((response: any) => ExerciseTest.fromJson(response.data.data));
  }

  public one(id: string): Promise<ExerciseTest> {
    return this.client.get('/developer/tests/' + id).then((response: any) => ExerciseTest.fromJson(response.data.data));
  }

  public save(exerciseTest: ExerciseTest): Promise<ExerciseTest> {
    return this.client
      .put('/developer/tests/' + exerciseTest.id, exerciseTest.toJson())
      .then((response: any) => ExerciseTest.fromJson(response.data.data));
  }

  public uploadDepth(id: string, form: FormData): Promise<ExerciseTest> {
    return this.client
      .put('/developer/tests/' + id + '/depth_recording', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response: any) => ExerciseTest.fromJson(response.data.data));
  }

  public uploadSkeletons(id: string, form: FormData): Promise<ExerciseTest> {
    return this.client
      .put('/developer/tests/' + id + '/skeletons_recording', form)
      .then((response: any) => ExerciseTest.fromJson(response.data.data));
  }
}
