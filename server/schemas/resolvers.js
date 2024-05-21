const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async ( parent, args, context ) => {
            const foundUser = await User.findOne({
                _id: context.user._id
            });

            if (!foundUser) {
                throw AuthenticationError;
            }
            return foundUser
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }
        
            const correctPw = await user.isCorrectPassword(password)
          
            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return {token, user };
        },

        saveBook: async (parent, { bookInput }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {savedBooks: bookInput}
                    },
                    { new: true, runValidators: true }
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, args, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: args }},
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;