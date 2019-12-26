process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
chai.should();

describe('/GET search', () => {
  it('1# it should fail', (done) => {
    chai.request(server)
      .get('/api/v1/search')
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('You need to pass lat & long as query param!');
        done();
      });
  });

  it('1# it should GET all the hotel for specified coordinates', (done) => {
    chai.request(server)
      .get('/api/v1/search?lat=23.7516846&long=90.3834963')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        done();
      });
  });

  it('2# it should GET all the hotel with radius', (done) => {
    chai.request(server)
      .get('/api/v1/search?lat=23.7516846&long=90.3834963&radius=10000')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);
        done();
      });
  });
});
