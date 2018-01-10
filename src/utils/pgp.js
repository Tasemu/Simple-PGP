import uuid from 'uuid';

const openpgp = require('openpgp');

export function readPublicKey(publicKey) {
  const key = openpgp.key.readArmored(publicKey);
  if (key.err && key.err.length > 0) {
    throw new Error(key.err[0]);
  }
  const userStr = key.keys[0].users[0].userId.userid;
  const email = userStr.substring(userStr.lastIndexOf('<') + 1, userStr.lastIndexOf('>'));
  const name = userStr.substring(0, userStr.lastIndexOf(' '));

  return {
    id: uuid(),
    name,
    email,
    publicKey,
  };
}
