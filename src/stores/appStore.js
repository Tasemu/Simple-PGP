import { observable } from 'mobx';

class appStore {
  @observable counter = 1;
}

export default new appStore();
