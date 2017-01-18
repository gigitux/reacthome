const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var Home = require('./house')
var mongoose = require('mongoose');
var Users = require('./user');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local').Strategy;




const app = express();

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Connection with mongodb
mongoose.connect('mongodb://localhost:27017/myproject');


// Serve static assets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);

//passport
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
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
  console.log("sto in put")
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
  })
.delete(function(req, res) {
          Home.remove({
              id: req.params.id
          }, function(err, bear) {
              if (err)
                  res.send(err);

              res.json({ message: 'Casa eliminata' });
          });
      });

      router.route('/user')

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
      router.route('/login')

    //   .post(function(req, res, next) {
    //     console.log("alla ricerca di utente")
    //     Users.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
    //        if(err) return next(err);
    //        if(!user) return res.send('Non loggato');
    //        req.session.user = req.body.email;
    //        return res.send('Loggato');
    //     });
    //  });
    // .post('/login',
    //     passport.authenticate('local'),
    //     function(req, res) {
    //         // If this function gets called, authentication was successful.
    //         // `req.user` contains the authenticated user.
    //         res.redirect('/users/' + req.user.username);
    //       });

    passport.use('login', new LocalStrategy({
            passReqToCallback: true
        },
        function(req, username, password, done) {
          console.log("sto provando a loggare")
            // check in mongo if a user with username exists or not
            Users.findOne({
                    'username': username,
                    'password': password
                },
                function(err, user) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!user) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false,
                            req.flash('message', 'User Not found.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)) {
                        console.log('Invalid Password');
                        return done(null, false,
                            req.flash('message', 'Invalid Password'));
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, user);
                }
            );
        }));

module.exports = app;
