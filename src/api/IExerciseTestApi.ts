import ExerciseTest from '../models/ExerciseTest';

export default interface IExerciseTestApi {
  all: () => Promise<ExerciseTest[]>;
  new: () => Promise<ExerciseTest>;
  one: (id: string) => Promise<ExerciseTest>;
  save: (excerciseTest: ExerciseTest) => Promise<ExerciseTest>;
  uploadDepth: (id: string, form: FormData) => Promise<ExerciseTest>;
  uploadSkeletons: (id: string, form: FormData) => Promise<ExerciseTest>;
}
