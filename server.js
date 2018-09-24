const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Bear = require('./app/models/bear');



// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
mongoose.connect('mongodb://localhost:27017/api', {useNewUrlParser: true});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

const router = express.Router();

router.use(function(req, res, next) {
  console.log("A request has been made...bitch!")
  next();
})

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

router.route('/bears')
  .post(function(req, res) {
      var bear = new Bear();
      bear.name = req.body.name;
      bear.save(function(err) {
          if(err)
            res.send(err);

          res.json({message: 'Bear Created!'});
        })
  })

  .get(function(req,res) {
    Bear.find(function(err, bears) {
      if (err)
        res.send(err);

      res.json(bears);
    })
  })

router.route('/bears/:bear_id')
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    })
  })
  .put(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err)
        res.send(err);
      bear.name = req.body.name;
      bear.save(function(err) {
        if (err)
          res.send(err);
        res.json({ mesasge: 'Bear updated!'})
      })
    })
  })
    .delete(function(req, res) {
        Bear.remove({
          _id: req.params.bear_id
        }, function(err, bear) {
          if (err)
            res.send(err)

          res.json ({ message: 'Successfully deleted'})

        })
      })

  // })






app.use('/api', router);

app.listen(port);
console.log('Magic happens on port ' + port);
