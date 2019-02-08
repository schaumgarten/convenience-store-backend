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

router.get('/:storeId', (req, res) => {
  Product.find({"_store":req.params.storeId})
    .then(products =>{
      res.status(200).json({products})
    })
    .catch(err => {
      console.log(err)
    })
});

/*router.patch('/:id',(req, res) =>{
  Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
      .then(() => {
          res.status(200).json({msg: "Product succesfully modified"});
      })
      .catch(err => {
          console.log(err);
      })
});*/

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