const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.post('/new', (req, res) => {
  const {name, price, _store} = req.body;
  Product.create({name, price, _store})
    .then(()=> {
      res.status(200).json({msg: "Product successfully created"})
    })
    .catch(err => {
      res.status(500).json({msg: "Unable to create"})
    })
})

router.get('/', (req, res) => {
  Product.find()
    .then(products =>{
      res.status(200).json({products})
    })
    .catch(err => {
      console.log(err)
    })
});

router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({msg: "Product successfully deleted"})
    })
    .catch(err => {
      console.log(err)
    })
});

module.exports = router;