const Event = require('../../models/events');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: user.bind(this, event.creator),
    date: dateToString(event._doc.date),
    tag: students.bind(this, event._doc.tag),
  };
};

const students = async (userIds) => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map((user) => {
      return { ...user._doc };
    });
  } catch (err) {
    throw err;
  }
};

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

exports.user = user;
exports.students = students;
exports.events = events;
exports.transformEvent = transformEvent;
