const eventResolver = require('./events');
const authResolver = require('./auth');
const allStudent = require('./fetchUsers');

const rootResolver = {
  ...authResolver,
  ...eventResolver,
  ...allStudent,
};

module.exports = rootResolver;
