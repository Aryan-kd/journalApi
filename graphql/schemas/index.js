const { buildSchema } = require('graphql');

module.exports = buildSchema(`
        type Event {
          _id: ID!
          title: String!
          teacherId: String!
          description: String!
          tag: [User!]
          date: String!
          creator: User!
          attachment: String
        }

        type User{
          _id: ID!
          username: String!
          password: String
          teacher: Boolean!
          createdEvents: [Event!]
        }

        type AuthData {
          userId: ID!
          token: String!
          tokenExpiration: Int!
          isTeacher: Boolean!
        }

        input EventInput {
          title: String!
          teacherId: String!
          description: String!
          tag: [String!]!
          date: String!
          attachment: String
        }

        input UserInput {
          username: String!
          password: String!
          teacher: Boolean!
        }

        type RootQuery {
            events: [Event!]!
            users: [User!]!
            allStudent: [User!]!
            login(username: String!, password: String!): AuthData!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);
