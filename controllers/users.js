var jwt = require('jsonwebtoken');

var User = require('../models/user');
var config = require('../web.config');

exports.signUp = function (req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';

  var user = new User({
    username: username,
    password: password
  });

  user.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      var token = jwt.sign(user, config.tokenSecret);

      res.json({ token: token });
    }
  });
};

exports.signIn = function (req, res) {
  var username = req.body.username || '';
  var password = req.body.password || '';

  User.findOne({ username: username, password: password }, function (err, user) {
    if (!user) {
      res.satatus(401).send({ message: 'invalid username or password' });
    } else {
      var token = jwt.sign(user, config.tokenSecret);
      res.json({ token: token });
    }
  });
}

exports.getUser = function (req, res) {
  User.find({ _id: req.params.user_id, _id: req.user._id }, function (err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
}