import IRecordingJSON from './IRecordingJSON';

export default class RecordingJSON {
  public static fromJson(json: IRecordingJSON): RecordingJSON {
    return new RecordingJSON(json.depth_recording, json.skeletons_recording);
  }

  public depthRecording: string;
  public skeletonsRecording: string;

  constructor(depthRecording: string = '', skeletonsRecording: string = '') {
    this.depthRecording = depthRecording;
    this.skeletonsRecording = skeletonsRecording;
  }

  public toJson(): IRecordingJSON {
    return {
      depth_recording: this.depthRecording,
      skeletons_recording: this.skeletonsRecording,
    };
  }
}
