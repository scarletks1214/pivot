import IEquatable from '../utils/IEquatable';

import MediaCollection from './MediaCollection';

export interface IExerciseJSON {
  active?: boolean;
  id: string;
  name: string;
  media: object[];
}

class Exercise implements IEquatable<Exercise> {
  public static fromJson(json: IExerciseJSON): Exercise {
    return new Exercise(
      json.id,
      json.name,
      json.active === undefined ? true : json.active,
      MediaCollection.fromJson(json.media)
    );
  }

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly active: boolean = true,
    public readonly media: MediaCollection = new MediaCollection([])
  ) {}

  public get initials() {
    return this.name
      .split(' ')
      .map(s => s[0])
      .join('');
  }

  public toJson(): IExerciseJSON {
    return {
      active: this.active,
      id: this.id,
      media: this.media.toJson(),
      name: this.name,
    };
  }

  public equals(other: Exercise | undefined): boolean {
    return !!other && this.id === other.id;
  }
}

export default Exercise;
