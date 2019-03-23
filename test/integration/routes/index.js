import chai from 'chai';
import chaiHttp from 'chai-http';
import { API as api } from '../setup';

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

chai.use(chaiHttp);

describe('Authentication API Endpoints', () => {
  /* eslint-disable func-names */
  before(function (done) {
    done();
  });

  /* eslint-disable func-names */
  after(function (done) {
    done();
  });

  /* eslint-disable func-names */
  beforeEach(function (done) {
    done();
  });

  /* eslint-disable func-names */
  afterEach(function (done) {
    done();
  });

  describe('/login', () => {
    const route = `/login`;
    it('Should result in success with correct username and password', (done) => {
      chai.request(api)
        .post(route)
        .send({ username: 'admin', password: 'super-secret' })
        .then((res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('meta');
          res.body.should.have.property('data');
          res.body.data.should.have.property('token');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Should return 401 unauthorized on incorrect username', (done) => {
      chai.request(api)
        .post(route)
        .send({ username: 'does-not-exist', password: 'super-secret' })
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('Should return 401 unauthorized on incorrect password', (done) => {
      chai.request(api)
        .post(route)
        .send({ username: 'admin', password: 'wrong-password' })
        .then((res) => {
          expect(res).to.have.status(401);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
