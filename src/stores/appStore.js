import { observable, autorunAsync, toJS, computed, action } from 'mobx';
import { readPublicKey } from 'utils/pgp';

const remote = require('electron').remote;
const jetpack = require('fs-jetpack');
const openpgp = require('openpgp');

const appStoreHydrated = jetpack.read(`${remote.app.getPath('home')}/simplepgp.json`, 'json');

class AppStore {

  constructor({
    name = null,
    email = null,
    publicKey = null,
    privateKey = null,
    friends = [],
  }) {
    this.name = name;
    this.email = email;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.friends = friends;
  }

  @observable name;
  @observable email;
  @observable publicKey;
  @observable privateKey;
  @observable loading = false;
  @observable uiMode = 'default';
  @observable friends = [];

  @computed get friendsCount() {
    return this.friends.length;
  }

  @computed get loggedIn() {
    return !!this.email;
  }

  @computed get dehydrate() {
    return {
      name: this.name,
      email: this.email,
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      friends: this.friends,
    };
  }

  @action('generateKeyPair') generateKeyPair(name, email, passphrase) {
    this.loading = true;
    return openpgp.generateKey({
      userIds: [{ name, email }],
      numBits: 4096,
      passphrase,
    }).then(action('generateKeyPair-callback', (key) => {
      this.loading = false;
      this.name = name;
      this.email = email;
      this.publicKey = key.publicKeyArmored;
      this.privateKey = key.privateKeyArmored;
    }));
  }

  @action('importKey') importKey(name, email, publicKeyArmored, privateKeyArmored) {
    this.name = name;
    this.email = email;
    this.publicKey = publicKeyArmored;
    this.privateKey = privateKeyArmored;
  }

  @action('addFriend') addFriend(publicKey) {
    this.friends.push(readPublicKey(publicKey));
  }
}

const singleton = new AppStore(appStoreHydrated || {});

autorunAsync(() => {
  jetpack.write(`${remote.app.getPath('home')}/simplepgp.json`, toJS(singleton.dehydrate));
}, 500);

export default window.appStore = singleton;
