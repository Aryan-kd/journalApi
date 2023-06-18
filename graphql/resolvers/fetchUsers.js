const User = require('../../models/user');

module.exports = {
  allStudent: async () => {
    try {
      const students = await User.find({ teacher: false });
      return students.map((student) => {
        return { ...student._doc, password: null };
      });
    } catch (err) {
      throw err;
    }
  },
};
