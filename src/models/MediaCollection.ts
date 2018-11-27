import Media from './Media';
import { MediaTypes } from './MediaTypes';

export default class MediaCollection {
  public static fromJson(d: any[]): MediaCollection {
    return new MediaCollection(d.map(Media.fromJson));
  }

  public media: Media[];

  public get exerciseThumbnail(): string {
    const result = this.firstOfType(MediaTypes.ExerciseImage);

    if (typeof result === 'undefined') {
      return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180';
    }

    return result;
  }

  public get classSessionThumbnail(): string {
    const result = this.firstOfType(MediaTypes.ClassSessionVideoThumbnail);

    if (typeof result === 'undefined') {
      return 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180';
    }

    return result;
  }

  public get classSessionStreamingUrl(): string | undefined {
    return this.firstOfType(MediaTypes.ClassSessionVideo);
  }

  constructor(media: Media[]) {
    this.media = media;
  }

  public toJson(): object[] {
    return this.media.map(m => m.toJson());
  }

  public allOfType(type: MediaTypes): Media[] {
    return this.media.filter(m => m.typeId === type);
  }

  private firstOfType(type: MediaTypes): string | undefined {
    const matches: Media[] = this.media.filter(m => m.typeId === type);

    if (matches.length > 0) {
      return matches[0].url;
    }

    return undefined;
  }
}
