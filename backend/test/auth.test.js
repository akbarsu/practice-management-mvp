const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication', () => {
  it('should register a new user', (done) => {
    chai
      .request(app)
      .post('/api/auth/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});