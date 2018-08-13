import { observable, action } from 'mobx';

export default class FlagsModel {
  @observable flag = {
    langaugeSetup: true,
  }
}
