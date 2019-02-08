const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  console.log(req.body)
  if (req.body.password !== req.body.confirmPassword) return res.status(500).json({ msg: "The passwords don't match" });
  const salt = bcrypt.genSaltSync(256);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const { name, email, role } = req.body;

  User.create({ name, email, password: hashedPassword, role })
    .then(() => {
      res.status(201).json({ msg: "User successfully created" })

    })
    .catch(err => {
      res.status(500).json({ err, msg: "Unable to create" })
    })
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).json({ msg: "Unvalid e-mail" });
  let validPassword = bcrypt.compareSync(req.body.password, user.password);
  if (!validPassword) return;
  const token = jwt.sign(
    { id: user._id },
    process.env.SECRET,
    { expiresIn: 8600 }
  );
  //desaparece el password de User
  delete user._doc.password;
  res.status(200).json({user, token});
});

router.get('/', (req, res) => {
  User.find({"role": 'store'})
    .then(users => {
      res.status(200).json({ users })
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, '_id name')
    .then(user => {
      res.status(200).json({ user })
    })
    .catch(err => {
      console.log(err);
    })
});

/*router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(() => {
      res.status(200).json({ msg: "User modified successfully" });
    })
    .catch(err => {
      console.log(err);
    })
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ msg: "User deleted successfully" });
    })
    .catch(err => {
      console.log(err);
    })
});*/


module.exports = router;