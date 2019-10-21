var express = require('express');
var app = express();
var MongoUtil = require('./utils/mongoUtil')
var WeatherRoute = require('./routes/weather-route');
var EnvProvider = require('./utils/env-provider');
var cpus = require('os').cpus().length;
var cluster = require('cluster');
var LoggerUTIl = require('./utils/Logger');
var ClusterInfo = require('./utils/cluster-info');
var logger;
MongoUtil.init(app);
//this will be invoked on successfully connection to db

app.on('success', () => {
  LoggerUTIl.init();
  logger = LoggerUTIl.getLogger();
  logger.info('cluster :' + ClusterInfo.getClusterInfo() + ':connect to MongoDb');
  if (cluster.isMaster) {
    logger.info('cluster master :staring the instance instance count=' + cpus);
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
  } else {
    createServer();
  }


});
//will be invoked if app cannot connect to mongodb
app.on('failure', (err) => {
  //logger.error('cluster :'+clusterInfo.get+',app is terminating cluster=');
  //cannot log to Logger as connection to mongodb failed    
  console.log('app is termincating..!,Possibly due to failed connection with mongodb');


});
//creating server
function createServer() {

  registerRoutes();
  app.listen(process.env.PORT || EnvProvider.getConfig("PORT"), () => {
    logger.info('cluster :' + ClusterInfo.getClusterInfo() + ',app is listening to ' + EnvProvider.getConfig("PORT"));

  })
}



//registering routes afer init of app
function registerRoutes() {
  app.use('/', WeatherRoute);
}

//universal error handler
app.use((err, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  logger.error('cluster :' + ClusterInfo.getClusterInfo() + 'encontured err', err);
  res.status(500).send({
    "ok": -1,
    "errMessg": "internal server error"
  });
  next();
})

//if one of instance goes down
cluster.on('exit', (worker) => {
  logger.warn('cluster :' + ClusterInfo.getClusterInfo() + ' is exiting');
  cluster.fork()
  logger.info('cluster :' + ClusterInfo.getClusterInfo() + ' creating a new instance again');
});
//in case of any uncaught exception
process.on('uncaughtException', (err) => {
  logger.error('cluster :' + ClusterInfo.getClusterInfo() + 'encontured err', err);

})