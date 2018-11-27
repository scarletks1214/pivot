import IEquatable from '../utils/IEquatable';

import IRecordingJSON from './IRecordingJSON';
import RecordingJSON from './RecordingJSON';

export interface IExerciseTestJSON {
  active?: boolean;
  created: string;
  description: string;
  expect: object[];
  exercise_id: string;
  id: string;
  recording: IRecordingJSON;
  title: string;
  updated: string;
}

class ExerciseTest implements IEquatable<ExerciseTest> {
  public static fromJson(json: IExerciseTestJSON): ExerciseTest {
    return new ExerciseTest(
      json.id,
      json.active === undefined ? true : json.active,
      json.created,
      json.description,
      json.exercise_id,
      json.title,
      json.updated,
      RecordingJSON.fromJson(json.recording),
      json.expect
    );
  }

  public id: string;
  public active?: boolean;
  public created: string;
  public description: string;
  public exerciseId: string;
  public expect: object[];
  public recording: RecordingJSON;
  public title: string;
  public updated: string;

  constructor(
    id: string,
    active: boolean = true,
    created: string,
    description: string,
    exerciseId: string,
    title: string,
    updated: string,
    recording: RecordingJSON = new RecordingJSON(),
    expect: object[]
  ) {
    this.id = id;
    this.active = active;
    this.created = created;
    this.description = description;
    this.exerciseId = exerciseId;
    this.title = title;
    this.updated = updated;
    this.recording = recording;
    this.expect = expect;
  }

  public toJson(): IExerciseTestJSON {
    return {
      active: this.active,
      created: this.created,
      description: this.description,
      exercise_id: this.exerciseId,
      expect: this.expect,
      id: this.id,
      recording: this.recording.toJson(),
      title: this.title,
      updated: this.updated,
    };
  }

  public equals(other: ExerciseTest | undefined): boolean {
    return !!other && this.id === other.id;
  }
}

export default ExerciseTest;
