var express=require('express');
var router=express.Router();
var bodyParser=require('body-parser');
var WeatherController=require('../controller/weather-controller');

router.use(bodyParser.json());
//router.use(bodyParser.urlencoded({ extended: true }))


router.post('/find',(req,res)=>{
var query=req.body.query;

WeatherController.getWeatherInfo(query).then((result)=>{
let response={"ok":1,"result":result}    
res.send(response);
}).catch((err)=>{
    console.log(err);
res.status('500').send({"ok":-1,"errMsg":err});
});


});


module.exports=router;