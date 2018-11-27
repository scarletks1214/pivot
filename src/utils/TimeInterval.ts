import { Duration } from 'moment';

export default class TimeInterval {
  public start: Duration;
  public end: Duration;

  public constructor(start: Duration, end: Duration) {
    this.start = start;
    this.end = end;
  }

  public contains(timestamp: Duration): boolean {
    return this.start <= timestamp && this.end > timestamp;
  }
}
