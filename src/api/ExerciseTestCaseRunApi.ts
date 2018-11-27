import { AxiosInstance } from 'axios';

import { ExerciseTestCaseSuiteRun, fromJson } from 'models';

export interface IExerciseTestCaseSuiteRunApi {
  all(): Promise<ExerciseTestCaseSuiteRun[]>;
  one(id: string): Promise<ExerciseTestCaseSuiteRun>;
}

export class ExerciseTestCaseSuiteRunApi {
  public readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  all(): Promise<ExerciseTestCaseSuiteRun[]> {
    return Promise.reject();
  }

  one(id: string): Promise<ExerciseTestCaseSuiteRun> {
    return this.client
      .get(`/developer/tests/suite_runs/${id}`)
      .then((response: any) => fromJson(ExerciseTestCaseSuiteRun, response.data.data));
  }
}
