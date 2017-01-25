const express = require('express');
const morgan = require('morgan');
const path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var router = express.Router();
var Home = require('./house')
var mongoose = require('mongoose');
var Users = require('./user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');


const app = express();

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Connection with mongodb
mongoose.connect('mongodb://localhost:27017/myproject');


// Serve static assets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(cookieParser())
app.use(session({ secret: 'derpy', key: 'user.connect', cookie: {httpOnly: false }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use('/api', router);

//passport
passport.serializeUser(function(user, done) {
  console.log(user._id)
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  Users.findById(id, function(err, user) {
    done(err, user);
  });
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

router.use(function(req, res, next) {
    // do logging
    console.log('Qualcosa sta accadendo.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/house')

.post(function(req, res) {
  console.log("cistodentro")
    var home = new Home();
    home.title = req.body.title;
    home.description = req.body.description;
    home.save(function(err) {
      if (err){
        return res.json({status: 500, error: err});
      }
      res.json({ message: 'Casa creata' });
    });
})

.get(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    Home.find(function(err, house) {
        if (err)
          res.send(err);
        res.json(house);
    });
});

router.route('/house/:id')
.get(function(req, res) {
    Home.find({id: req.params.id}, function(err, home) {
        if (err)
          res.send(err);
          res.json(home);
    });
})
.put(function(req, res) {
  Home.findOne({id: req.params.id}, function(err, home) {
    if (err)
    res.send(err);

    home.title = req.body.title;
    home.description = req.body.description;

    home.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Casa aggiornata!' });
    });
  });
});

router.route('/prenotation')
.put(function(req, res) {
  console.log("prenotazione")
  console.log(req.body.id)
  console.log(req.body.startDate)
  console.log(req.body.endDate)
  Home.findOne({id: req.body.id}, function(err, home) {
    console.log(home)
    if (err)
    res.send(err);

    home.reserved[0].startDate = req.body.startDate;
    home.reserved[0].endDate = req.body.endDate;

    home.save(function(err) {
      if (err)
      res.send(err);
      res.json({ message: 'Casa aggiornata!' });
    });
  });
})

.delete(function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
    Home.remove({
      id: req.params.id
    }, function(err, bear) {
        if (err)
          res.send(err);
          res.json({ message: 'Casa eliminata' });
    });
});

  router.route('/registration')
  .post(function(req, res) {
    var user = new Users();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email
    user.password = req.body.password;
    user.save(function(err) {
      if (err){
        return res.json({status: 500, error: err});
      }
      res.json({ message: 'Utente creato' });
    });
  })

  router.route('/user')

  .post(function(req, res) {
    console.log(req.body.id)
    console.log("ggg")
      Users.find({id: req.body.id}, function(err, user) {
          if (err)
            res.send(err);
            res.json(user);
      });
  });


  app.post('/login', passport.authenticate('local'),function(req, res){
    res.json(req.user);
     });

    passport.use(new LocalStrategy(
      function(username, password, done) {
        console.log(username, password, "blabla")
        Users.findOne({ email: username }, function(err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (user.password != password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));





module.exports = app;
