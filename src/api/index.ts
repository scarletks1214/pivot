import axios, { AxiosInstance } from 'axios';

import User, { IUserJSON } from '../models/User';
import Nullable from '../utils/Nullable';
import { CurrentUserSessionStorage, ICurrentUserStorage } from './ICurrentUserStorage';

import ClassSessionApi from './ClassSessionApi';
import ExerciseApi, { IExerciseApi } from './ExerciseApi';
import ExerciseTestApi from './ExerciseTestApi';
import IClassSessionApi from './IClassSessionApi';
import IExerciseTestApi from './IExerciseTestApi';
import TrainerExerciseApi from './TrainerExerciseApi';

import { ITrainerExerciseApi } from './ITrainerExerciseApi';

import config from '../config';
import { IExerciseTestCaseSuiteRunApi, ExerciseTestCaseSuiteRunApi } from './ExerciseTestCaseRunApi';

interface ILogin {
  login: (email: string, password: string) => Promise<User>;
  isLoggedIn: () => boolean;
  currentUser: () => Nullable<User>;
}

class Api implements ILogin {
  public readonly client: AxiosInstance;
  private currentUserStorage: ICurrentUserStorage;

  constructor() {
    this.client = axios.create({
      baseURL: config.API_ROOT,
      withCredentials: true,
    });
    this.currentUserStorage = new CurrentUserSessionStorage();
  }

  public me(): Promise<User> {
    if (!this.isLoggedIn()) {
      return Promise.reject(new Error('Must be logged in to call me() route.'));
    }

    return this.client.get('/me').then(response => {
      if (response.status !== 200) {
        throw new Error('Login failed.');
      }

      return User.fromJson(response.data.data as IUserJSON);
    });
  }

  public logout(): Promise<boolean> {
    // TODO: call the API
    this.currentUserStorage.clear();
    return this.client.post('/logout').then(response => true);
  }

  public login(email: string, password: string): Promise<User> {
    return this.client.post('/login', { email, password }).then(response => {
      if (response.status !== 200) {
        throw new Error('Login failed.');
      }

      const user = User.fromJson(response.data.data as IUserJSON);

      this.currentUserStorage.save(user);

      return user;
    });
  }

  public isLoggedIn(): boolean {
    return this.currentUserStorage.load() !== null;
  }

  public currentUser(): Nullable<User> {
    return this.currentUserStorage.load();
  }

  public get exercises(): IExerciseApi {
    return ExerciseApi;
  }

  public get exercise_tests(): IExerciseTestApi {
    return new ExerciseTestApi(this.client);
  }

  public get trainerExercises(): ITrainerExerciseApi {
    return new TrainerExerciseApi(this.client);
  }

  public get classSessions(): IClassSessionApi {
    return new ClassSessionApi(this.client);
  }

  public get suiteRuns(): IExerciseTestCaseSuiteRunApi {
    return new ExerciseTestCaseSuiteRunApi(this.client);
  }
}

export default new Api();
