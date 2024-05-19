const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        userById: async (parent, { _id }) => {
            return User.findById({ _id });
        },
        userByUsername: async (parent, { username }) => {
            return User.findOne({ username });
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { username, password }) => {
            const user = User.findOne({ username });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user };
        },

        saveBook: async (parent, { userId, body }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $addToSet: {savedBooks: body}
                    },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId }},
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;