const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        products: async (parent, { category, name }) => {
            const params = {};
            if (category) {
                params.category = category;
            }
            if (name) {
                params.name = {
                    $regex: name
                }
            }

            return await Product.find(params).populate('category');
        },
        product: async (parent, { _id }) => {
            return await Product.findById(_id).populate('category');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });
                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

                return user;
            }
            throw new AuthenticationError("Not logged in");
        },
        users: async () => {
            return await User.find().populate('orders');
        },
        user: async (parent, { _id }) => {
            const user = await User.findById(_id).populate({
                path: 'orders.products',
                populate: 'category'
            });
            user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

            return user;
        },
        orders: async () => {
            return await Order.find().populate('products');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });
                return user.orders.id(_id);
            }
            throw new AuthenticationError("Not logged in");
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { products }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ products });
                await User.findByIdAndUpdate(context.user._id, {
                    $push: { orders: order }
                });

                return order;
            }
            throw new AuthenticationError("Not logged in");
        },
        addProduct: async (parent, args) => {
            const product = await Product.create(args);
            return product;
        },
        addCategory: async (parent, { name }) => {
            const category = await Category.create({ name });
            return category;
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
            throw new AuthenticationError('Not logged in');
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const amount = quantity;
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: amount } }, { new: true });
        }
    }
};

module.exports = resolvers;