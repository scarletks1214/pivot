import { MediaTypes } from './MediaTypes';

export default class Media {
  public static fromJson(d: any): Media {
    return new Media(d.url, d.type_id, d.index);
  }

  public url: string;
  public typeId: MediaTypes;
  public index: number;

  constructor(url: string, typeId: number, index: number) {
    this.url = url;
    this.typeId = typeId as MediaTypes;
    this.index = index;
  }

  public toJson(): object {
    return {
      index: this.index,
      type_id: this.typeId,
      url: this.url,
    };
  }
}
