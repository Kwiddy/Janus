const app =  require('./app');
const express = require('express');


var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 1042353776096-b40nc822i1clrtc12gc7tiu3g57hin85.apps.googleusercontent.com,
    clientSecret: _2gzvWyy4Mt_FK6c3KyzAzex,
    callbackURL: "https://janusjobs.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


app.listen(process.env.PORT||8090);
