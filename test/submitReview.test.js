const db = require('./db');
const { writeReview } = require('./review');

jest.mock('./db');

describe('writeReview', () => {
    it('should create and post a review to the database', async () => {
        const mockWriteReview = 'This is a test of the writeReview function';
        db.query.mockWriteReview({ rows: [{ post: mockWriteReview }] });
    })
})