const db = require('./db');
const { all } = require('./review');

jest.mock('./db');

describe