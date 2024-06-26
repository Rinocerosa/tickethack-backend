const mongoose = require('mongoose');

const cartItemSchema = mongoose.Schema({
    trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' }
});

const CartItem = mongoose.model('cartItems', cartItemSchema);

module.exports = CartItem;