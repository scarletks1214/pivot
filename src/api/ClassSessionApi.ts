import { AxiosInstance } from 'axios';

import IClassSessionApi, { ClassSession } from './IClassSessionApi';

export default class ClassSessionApi implements IClassSessionApi {
  public readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public new(): Promise<ClassSession> {
    return this.client
      .post('/trainer/class_sessions/new')
      .then((response: any) => ClassSession.fromJson(response.data.data));
  }

  public one(id: string): Promise<ClassSession> {
    return this.client
      .get('/trainer/class_sessions/' + id)
      .then((response: any) => ClassSession.fromJson(response.data.data));
  }

  public all(): Promise<ClassSession[]> {
    return this.client
      .get('/trainer/class_sessions')
      .then((response: any) => response.data.data.map(ClassSession.fromJson));
  }

  public save(classSession: ClassSession): Promise<ClassSession> {
    return this.client
      .put('/trainer/class_sessions/' + classSession.id, classSession.toJson())
      .then((response: any) => ClassSession.fromJson(response.data.data));
  }
}
