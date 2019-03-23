import { EventEmitter } from 'events';
import HttpMocks from 'node-mocks-http';
import { assert } from 'chai';
import sinon from 'sinon';
import { AuthController } from '../../../src/controllers';
import { UserService } from '../../../src/services';
import ResponseObjects from '../../../src/utils/responseObjects';


function buildResponse() {
  return HttpMocks.createResponse({ eventEmitter: EventEmitter });
}

describe('AuthController', () => {
  it('should exist', () => {
    assert.typeOf(AuthController, 'function');
  });

  it('should have the correct methods', () => {
    assert.isFunction(AuthController.login);
  });

  describe('AuthController.login', () => {
    let req;
    let res;
    let verifyPasswordStub;
    let successStub;
    let invalidLoginStub;

    before(() => {});

    beforeEach(() => {
      res = buildResponse();
      req = HttpMocks.createRequest({
        method: 'POST',
        url: '/login',
        ip: '::1',
        body: {
          username: 'test@medean.com',
          password: 'Medean',
        },
      });

      verifyPasswordStub = sinon.stub(UserService, 'verifyPassword');
      successStub = sinon.stub(ResponseObjects, 'Success');
      invalidLoginStub = sinon.stub(ResponseObjects, 'InvalidLogin');
    });

    afterEach(() => {
      verifyPasswordStub.restore();
      successStub.restore();
      invalidLoginStub.restore();
    });

    it('should call UserService.verifyPassword with user info', (done) => {
      const ret = AuthController.login(req, res);

      ret.then((result) => {
        sinon.assert.calledOnce(verifyPasswordStub);
        sinon.assert.calledWith(verifyPasswordStub, req.body.username, req.body.password);
        done();
      }).catch(err => done(err));
    });

    it('should call ResponseObjects.InvalidLogin when no user is found', (done) => {
      // Set to return no found user
      verifyPasswordStub.returns(undefined);

      // Call the method
      const ret = AuthController.login(req, res);

      // Check results
      ret.then(() => {
        sinon.assert.calledOnce(invalidLoginStub);
        done();
      }).catch(e => done(e));
    });

    it('should call ResponseObjects.Success when a matching user is found', (done) => {
      // Set to return no found user
      verifyPasswordStub.returns({ msg: 'Im a mock user' });

      // Call the method
      const ret = AuthController.login(req, res);

      // Check results
      ret.then(() => {
        sinon.assert.calledOnce(successStub);
        done();
      }).catch(e => done(e));
    });
  });
});
