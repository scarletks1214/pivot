import { ClassSession } from 'models';
export { ClassSession } from 'models';

export default interface IClassSessionApi {
  new: () => Promise<ClassSession>;
  one: (id: string) => Promise<ClassSession>;
  all: () => Promise<ClassSession[]>;
  save: (classSession: ClassSession) => Promise<ClassSession>;
}
