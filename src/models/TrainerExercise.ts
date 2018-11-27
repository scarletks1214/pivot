import MediaCollection from './MediaCollection';

import { Model } from 'models';

export interface ITrainerExerciseJSON {
  active?: boolean;
  id: string;
  name: string;
  media: object[];
  workstation_data: any;
}

class TrainerExercise extends Model {
  public static fromJson(json: ITrainerExerciseJSON): TrainerExercise {
    return new TrainerExercise(
      json.id,
      json.name,
      json.active === undefined ? true : json.active,
      MediaCollection.fromJson(json.media),
      json.workstation_data
    );
  }

  constructor(
    id: string,
    public name: string,
    public active: boolean = true,
    public media: MediaCollection = new MediaCollection([]),
    public readonly workstationData: any = {}
  ) {
    super(id);
  }

  public toJson(): ITrainerExerciseJSON {
    return {
      active: this.active,
      id: this.id,
      media: this.media.toJson(),
      name: this.name,
      workstation_data: this.workstationData,
    };
  }
}

export default TrainerExercise;
