var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
var WeatherController=require('../controller/weather-controller');
var LoggerUTIl=require('../utils/Logger');
var ClusterInfo=require('../utils/cluster-info');
var logger;
router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }))


router.post('/find',(req,res)=>{
logger=LoggerUTIl.getLogger();
var query=req.body.query;
if(!query){
    logger.warn('cluster :'+ClusterInfo.getClusterInfo()+' params were undefined or null ');

    res.status('500').send({"ok":-1,"errMsg":"No params send or Incorrect params send"});
return;
}
logger.info('cluster :'+ClusterInfo.getClusterInfo()+' recieved request query = '+query);
WeatherController.getWeatherInfo(query).then((result)=>{
let response={"ok":1,"result":result} 
logger.info('cluster :'+ClusterInfo.getClusterInfo()+' sending  response status 200 OK result= '+result);

res.send(response);
}).catch((err)=>{
//console.log(err);
logger.error('cluster :'+ClusterInfo.getClusterInfo()+' sending  response status 500 = '+err);

res.status('500').send({"ok":-1,"errMsg":err});
});


});


module.exports=router;