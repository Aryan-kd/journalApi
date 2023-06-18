const { dateToString } = require('../../helpers/date');
const Event = require('../../models/events');
const User = require('../../models/user');
const { user, transformEvent } = require('./merge');

module.exports = {
  events: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorize Access');
    }
    try {
      const events = await Event.find();
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthorize Access');
    }
    const event = new Event({
      title: args.eventInput.title,
      teacherId: args.eventInput.teacherId,
      description: args.eventInput.description,
      tag: args.eventInput.tag,
      date: new Date(args.eventInput.date),
      creator: req.userId,
      attachment: args.eventInput.attachment,
    });

    let createdEvent;
    try {
      const result = await event.save();

      createdEvent = {
        ...result._doc,
        date: dateToString(event._doc.date),
        creator: user.bind(this, result._doc.creator),
      };

      const creatorOfEvent = await User.findById(req.userId);
      if (!creatorOfEvent) {
        throw new Error('User does not exist');
      }
      creatorOfEvent.createdEvents.push(event);
      await creatorOfEvent.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
