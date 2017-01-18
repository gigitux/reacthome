const express = require('express');
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();
var Home = require('./house')
var mongoose = require('mongoose');
var Users = require('./user');


const app = express();

// Setup logger
// app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Connection with mongodb
mongoose.connect('mongodb://localhost:27017/myproject');


// Serve static assets
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api', router);

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
        console.log("ci stai provando")
          var user = new Users();
          user.name = req.body.name;
          user.surname = req.body.surname;
          user.password = req.body.password;
          user.save(function(err) {
              if (err){
                return res.json({status: 500, error: err});
              }
              res.json({ message: 'Utente creato' });
          });
      })

      .get(function(req, res) {
          Users.find(function(err, house) {
              if (err)
                  res.send(err);

              res.json(house);
          });
      });

      router.route('/users/:id')
      .get(function(req, res) {
          Users.find({id: req.params.id}, function(err, home) {
              if (err)
                  res.send(err);
              res.json(home);
          });
      })

      .delete(function(req, res) {
                Users.remove({
                    id: req.params.id
                }, function(err, bear) {
                    if (err)
                        res.send(err);

                    res.json({ message: 'Utente eliminato' });
                });
            });
module.exports = app;
