/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  if(process.env.NODE_ENV == 'development'){
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
  }else{
    var express = require("express"),
           app = express();

      app.get('*', function(req,res) {

        // log

        sails.log("bootstrap.js -> Request incoming: "+req.url);

        if(req.isSocket)
            return res.redirect('wss://' + req.headers.host + req.url)

        return res.redirect('https://' + req.headers.host + req.url)

      }).listen(80);

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
  };
};
