import { observable, autorunAsync, toJS, computed, action } from 'mobx';
const remote = require('electron').remote;
const jetpack = require('fs-jetpack');
const appStoreHydrated = jetpack.read(`${remote.app.getPath('home')}/simplepgp.json`, 'json');

const openpgp = require('openpgp');

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
  @observable loading = false;

  @computed get loggedIn () {
    return !!this.email;
  }

  @computed get dehydrate () {
    return {
      name: this.name,
      email: this.email,
      publicKey: this.publicKey,
      privateKey: this.privateKey
    }
  }

  @action('generateKeyPair') generateKeyPair (name, email, passphrase) {
    this.loading = true;
    return openpgp.generateKey({
        userIds: [{ name, email }],
        numBits: 4096,
        passphrase
    }).then(action('generateKeyPair-callback', (key) => {
      this.loading = false;
      this.name = name;
      this.email = email;
      this.publicKey = key.publicKeyArmored;
      this.privateKey = key.privateKeyArmored;
    }));
  }
}

const singleton = window.appStore = new appStore(appStoreHydrated || {});

autorunAsync(() => {
  jetpack.write(`${remote.app.getPath('home')}/simplepgp.json`, toJS(singleton.dehydrate));
}, 500);

export default singleton;
