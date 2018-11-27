import moment, { Duration } from 'moment';

export function durationFormat(duration: Duration): string {
  return moment.utc(duration.asMilliseconds()).format('m:ss');
}
