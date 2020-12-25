const express = require('express');
const app = express();
const usersRoute = express.Router();

// The users model
let users = require('../models/Users');

// To Add users
usersRoute.route('/create').post((req, res, next) => {
  users.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// To Get All users
usersRoute.route('/').get((req, res) => {
  users.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// To Get single user
usersRoute.route('/read/:id').get((req, res) => {
  users.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// To Update the users
usersRoute.route('/update/:id').put((req, res, next) => {
  users.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// To Delete the users
usersRoute.route('/delete/:id').delete((req, res, next) => {
  users.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = usersRoute;