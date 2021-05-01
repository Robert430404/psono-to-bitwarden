import { transformItem } from './transformers.js';
import { expect } from 'chai';

describe('transformItem', () => {
  it('Should properly transform a note', () => {
    const stub = {
      type: 'note',
      name: 'test-note',
    };

    const result = transformItem(stub);

    expect(result.type).to.be.equal(2);
    expect(result.name).to.be.equal('test-note');
    expect(typeof result.secureNote).to.be.equal('object');
  });

  it('Should properly transform a login', () => {
    const stub = {
      type: 'password',
      name: 'test-login',
      website_password_username: 'test-user',
      website_password_password: 'test-pass',
      website_password_notes: 'test-notes',
      website_password_url: 'test-url',
    };

    const result = transformItem(stub);

    expect(result.type).to.be.equal(1);
    expect(result.login.username).to.be.equal('test-user');
    expect(result.login.password).to.be.equal('test-pass');
    expect(result.login.uris.length).to.be.equal(1);
    expect(result.login.uris[0].uri).to.be.equal('test-url');
  });
});
