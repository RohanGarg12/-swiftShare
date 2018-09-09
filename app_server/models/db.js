var mongoose = require('mongoose');

var readLine = require('readline');
var gracefulShutdown;

var dbURI = 'mongodb://127.0.0.1/swiftShare';
if(process.env.NODE_ENV === 'production') {
  dbURI = 'mongodb://abhishekp1996:Gtasan12345@ds125914.mlab.com:25914/apps';
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});

gracefulShutdown = function(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

if(process.platform === 'win32') {
  var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on('SIGINT', function(){
    process.emit('SIGINT');
  })
}

//For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function() {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
});

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./docs');