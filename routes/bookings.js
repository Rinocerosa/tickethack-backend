var express = require('express');
var router = express.Router();
require('../models/connection');
const Trip = require('../models/trips');
const Booking = require('../models/bookings')
const CartItem = require('../models/cartItems')
const moment = require('moment')

router.get("/", (req, res) => {
    Booking.find().populate('trip')
    .then(data => {res.json({ bookings: data })});
});

router.post('/', (req, res) => {
    CartItem.find()
    .then(data => {
        if(data[0]){
            console.log(data)
            data.forEach((cartItem) => {
                let newBooking = new Booking ({trip: cartItem.trip})
                newBooking.save()
                .then(() => CartItem.deleteOne({_id: cartItem.id}))
                .then(() => console.log('Cart Item deleted'))
            })
            res.json({result: 'All bookings saved'})
        } else {
            res.json({error: 'No trips added to cart'})
        }        
    })
})
    // Trip.findOne({_id: req.params.tripId})
    // .then(data => {
    //     if(data) {
    //         newBooking = new Booking({trip: req.params.tripId})
    //         newBooking.save()
    //         .then(res.json({result: 'Trip successfully booked'}))
    //     } else {
    //         res.json({error: 'Trip not found'})
    //     }
    // })


router.delete("/:id", (req, res) => {
    Booking.findOne({_id: req.params.id})
    .then(data => {
        if (data) {
            Booking.deleteOne({_id: data.id})
            .then(() => Booking.find().populate('trip'))
            .then(result=> res.json({ bookings: result}))
        } else {
            res.json({ error: "Booking not found" });
        }
    })
})

module.exports = router