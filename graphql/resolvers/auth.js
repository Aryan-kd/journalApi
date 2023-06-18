const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  createUser: async (args) => {
    try {
      const user = await User.findOne({ username: args.userInput.username });
      if (user) {
        throw new Error('User Exists Already.');
      }
      const hashedPassword = await bcryptjs.hash(args.userInput.password, 12);

      const newUser = new User({
        username: args.userInput.username,
        password: hashedPassword,
        teacher: args.userInput.teacher,
      });
      const result = await newUser.save();

      return { ...result._doc, password: null }; // Making password null so nobody see it but not changing the pass in db
    } catch (err) {
      throw err;
    }
  },
  login: async ({ username, password }) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('User does not exists!');
    }
    const isEqual = await bcryptjs.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      'somesupersecretkey',
      {
        expiresIn: '3h',
      }
    );
    return {
      userId: user.id,
      token: token,
      tokenExpiration: 3,
      isTeacher: user.teacher,
    };
  },
};
