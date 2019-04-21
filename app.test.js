const app = require('./app');
const request = require('supertest');

describe('Test the various entities', () => {

  //Testing requests succeed

  test('GET /empList succeeds', (done) => {
    return request(app)
      .get('/empList')
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /jobList succeeds', (done) => {
    return request(app)
      .get('/jobList')
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /descList succeeds', (done) => {
    return request(app)
      .get('/descList')
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /linkList succeeds', (done) => {
    return request(app)
      .get('/linkList')
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  test('GET /imgList succeeds', (done) => {
    return request(app)
      .get('/imgList')
      .expect(200)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
  });

  //Testing response types

  test('GET /empList returns JSON', (done) => {
    return request(app)
	    .get('/empList')
	    .expect('Content-type', /json/)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
    });

  test('GET /jobList returns JSON', (done) => {
    return request(app)
	    .get('/jobList')
	    .expect('Content-type', /json/)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
    });

  test('GET /descList returns JSON', (done) => {
    return request(app)
	    .get('/descList')
	    .expect('Content-type', /json/)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
    });

  test('GET /linkList returns JSON', (done) => {
    return request(app)
	    .get('/linkList')
	    .expect('Content-type', /json/)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
    });

  test('GET /imgList returns JSON', (done) => {
    return request(app)
	    .get('/imgList')
	    .expect('Content-type', /json/)
      .end(function (err) {
        if (err) return done(err);
        done();
      });
    });

});
