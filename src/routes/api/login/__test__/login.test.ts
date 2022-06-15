import request from 'supertest';

/** App */
import { app } from '../../../../app';

it('returns a 201 on successful login', async () => {
  return request(app)
    .post('/api/login')
    .send({
      username: 'Jane Nilsson'
    })
    .expect(201);
});

it('returns a 400 with invalid user name', async () => {
  return request(app)
    .post('/api/login')
    .send({
      username: ''
    })
    .expect(400);
});

it('returns a 400 with missing data', async () => {
  await request(app)
    .post('/api/login')
    .send({})
    .expect(400);
});

it('returns text after successful login', async () => {
  const response = await request(app)
    .post('/api/login')
    .send({
      username: 'Jane Nilsson'
    })
    .expect(201);

  expect(response.text).toBeDefined();
});
