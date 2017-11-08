'use strict';

var Burger  = require('../models/burger');


exports.list_all_burgers = function(req, res) {
  Burger.find({}, function(err, burgers) {
    if (err)
      res.send(err);

    res.json(burgers);
  });
};


exports.create_a_burger = function(req, res) {
  var new_burger = new Burger();
  new_burger.name        = req.body.name;
  new_burger.description = req.body.description;
  new_burger.image_url   = req.body.image_url;
  new_burger.ingredients = req.body.ingredients;

  new_burger.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Burger created!' });
  });
};


exports.read_a_random_burger = function(req, res) {
  Burger.count().exec(function(err, count) {
    if (err)
      res.send(err);

    // add LODASH LIB for random func
    var random = Math.floor(Math.random() * count);
    Burger.findOne().skip(random).exec(function(err, result) {
      if (err)
        res.send(err)

      res.json([result]);
    });
  });
};


exports.read_a_burger = function(req, res) {
  var burger_id = req.params.burger_id;
  Burger.findById(burger_id, function(err, burger) {
    if (err)
      res.send(err);

    res.json([burger]);
  });
};
