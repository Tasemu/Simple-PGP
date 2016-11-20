import { observable, autorunAsync, toJS, computed } from 'mobx';
const remote = require('electron').remote;
const jetpack = require('fs-jetpack');
const appStoreHydrated = jetpack.read(`${remote.app.getPath('home')}/simplepgp.json`, 'json');

class appStore {

  constructor ({ name = null, email = null, publicKey = null, privateKey = null }) {
    this.name = name;
    this.email = email;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  @observable name;
  @observable email;
  @observable publicKey;
  @observable privateKey;

  @computed get loggedIn () {
    return !!this.email;
  }
}

const singleton = window.appStore = new appStore(appStoreHydrated || {});

autorunAsync(() => {
  jetpack.write(`${remote.app.getPath('home')}/simplepgp.json`, toJS(singleton));
}, 500);

export default singleton;
