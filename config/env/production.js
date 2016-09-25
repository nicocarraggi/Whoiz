/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the production        *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMysqlServer'
  // },

  /***************************************************************************
   * Set the port in the production environment to 80                        *
   ***************************************************************************/

  // port: 80,
  port: 443,

  /***************************************************************************
   * Set the log level in production environment to "silent"                 *
   ***************************************************************************/

  // log: {
  //   level: "silent"
  // }

  /***************************************************************************
   * Your SSL certificate and key, if you want to be able to serve HTTP      *
   * responses over https:// and/or use websockets over the wss:// protocol  *
   * (recommended for HTTP, strongly encouraged for WebSockets)              *
   *                                                                         *
   * In this example, we'll assume you created a folder in your project,     *
   * `config/ssl` and dumped your certificate/key files there:               *
   ***************************************************************************/

  // /etc/letsencrypt/live/nicolascarraggi.com/fullchain.pem
  ssl: {
     ca: fs.readFileSync('/etc/letsencrypt/live/nicolascarraggi.com/chain.pem'),
     key: fs.readFileSync('/etc/letsencrypt/live/nicolascarraggi.com/privkey.pem'),
     cert: fs.readFileSync('/etc/letsencrypt/live/nicolascarraggi.com/fullchain.pem') // DON'T USE cert.pem !!
  },

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

  bootstrap = function(cb) {

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
  },

};
