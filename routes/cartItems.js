var express = require('express');
var router = express.Router();
require('../models/connection');
const CartItem = require('../models/cartItems');
const Trip = require('../models/trips');
const moment = require('moment')

router.get("/", (req, res) => {
    CartItem.find()
    .then(data => {res.json({ cartItems: data })});
});

router.post('/add/:tripId', (req, res) => {
    Trip.findOne({_id: req.params.tripId})
    .then(data => {
        if(data) {
            console.log(data)
            const newCartItem = new CartItem({trip: data['_id']})
            newCartItem.save()
            .then(() => {res.json({result: 'Trip successfully added to cart', newCartItem: newCartItem})})
        } else {
            res.json({error: 'Trip not found'})
        }
    })
}
) 

router.delete("/:id", (req, res) => {
    CartItem.findOne({_id: req.params.id})
    .then(data => {
        if (data) {
            CartItem.deleteOne({_id: data.id})
            .then(() => CartItem.find().populate('trip'))
            .then(data => res.json({ cartItems: data }))
        } else {
            res.json({ error: "Cart item not found" });
        }
    })
})

module.exports = router