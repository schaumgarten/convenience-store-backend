const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

router.post('/new', (req, res) => {
  const {_store, _client, _product, quantity} = req.body;
  Sale.create({_store, _client, _product, quantity})
    .then(() => {
      res.status(200).json({msg: "Sale succesfully completed"})
    })
    .catch(err => {
      res.status(500).json({msg: "Could not complete sale"})
    })
});

router.get('/store/:id', (req, res) => {
  Sale.find({"_store": req.params.id})
    .populate('_product')
    .populate('_client','name')
    .then(sales => {
      res.status(200).json({sales})
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/client/:id/:storeId', (req, res) => {
  Sale.find({$and: [{"_store": req.params.storeId},{"_client": req.params.id}]})
    .populate('_product')
    .then(sales => {
      res.status(200).json({sales})
    })
    .catch(err => {
      console.log(err)
    })
});

router.get('/product/:id', (req, res) => {
  Sale.find({"_product": req.params.id})
    .populate('_client','name')
    .then(sales => {
      res.status(200).json({sales})
    })
    .catch(err => {
      console.log(err)
    })
});



module.exports = router;