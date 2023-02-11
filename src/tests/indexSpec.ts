import supertest from 'supertest';
import Image_Processing_App from '../index';

const endPointTester = supertest(Image_Processing_App);
describe('Test Image Processing App endpoint responses', () => {
  it('test the / endpoint status --> should be 200', async () => {
    const response = await endPointTester.get('/');
    expect(response.status).toBe(200);
  });

  it('test the /api/img endpoint without params should return status code 200', async () => {
    const response = await endPointTester.get('/api/img');
    expect(response.status).toBe(200);
  });

  it('test the /api/img endpoint with correct params should return image/jpeg content-type', async () => {
    const response = await endPointTester.get(
      '/api/img?imgName=fjord&imgWidth=500&imgHight=500'
    );
    expect(response.header['content-type']).toBe('image/jpeg');
  });
});
