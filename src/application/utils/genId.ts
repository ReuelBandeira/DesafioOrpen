import { v4 as uuidv4 } from 'uuid'

export class GenId {
  public id() {
    return uuidv4()
  }
}
