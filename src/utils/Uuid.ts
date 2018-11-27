/* tslint:disable */

class Uuid {
  private static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  public readonly value: string;

  public constructor(value: string = Uuid.uuidv4()) {
    this.value = value;
  }

  public equals(other: Uuid): boolean {
    return this.value === other.value;
  }
}

export default Uuid;
