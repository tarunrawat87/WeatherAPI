var express=require('express');
var app=express();
var MongoUtil=require('./utils/mongoUtil')
var WeatherRoute=require('./routes/weather-route');
var EnvProvider=require('./utils/env-provider');
var cpus=require('os').cpus().length;
var cluster=require('cluster')
MongoUtil.init(app);
//this will be invoked on successfully connection to db

app.on('success',()=>{

     if (cluster.isMaster) {
      
        for (let i = 0; i < cpus; i++) {
          cluster.fork();
        }}else{
        createServer();
        }


});

app.on('failure',()=>{
    console.log('app is termincating..!');
});

function createServer(){

    registerRoutes();
        app.listen(process.env.PORT||EnvProvider.getConfig("PORT"),()=>{
            console.log('app is listening to '+EnvProvider.getConfig("PORT"));

    })
}




function registerRoutes(){
app.use('/',WeatherRoute);
}

//universal error handler
app.use((err,req,res,next)=>{
res.status(500).send({"ok":-1,"errMessg":"internal server error"});
})

//if one of instance goes down
cluster.on('exit', (worker) => {
    //console.log('mayday! mayday! worker', worker.id, ' is no more!')
    cluster.fork()
})