import Data from './DataModel';
import Flag from './FlagModel';

export default class storeModel {
  constructor() {
    this.data = new Data();
    this.flags = new Flag();
  }
}
