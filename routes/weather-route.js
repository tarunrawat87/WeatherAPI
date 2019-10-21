var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var WeatherController = require('../controller/weather-controller');
var LoggerUTIl = require('../utils/Logger');
var ClusterInfo = require('../utils/cluster-info');
var process = require('process');
var logger;
router.use(bodyParser.json());

//route for getting info
router.post('/find', (req, res) => {
    logger = LoggerUTIl.getLogger();
    var query = req.body.query;
    if (!query) { //if query is not proper
        logger.warn('cluster :' + ClusterInfo.getClusterInfo() + ' params were undefined or null ');

        res.status('400').send({
            "ok": -1,
            "errMsg": "No params send or Incorrect params send"
        });
        return;
    }
    logger.info('cluster :' + ClusterInfo.getClusterInfo() + ' recieved request query = ' + query);
    //calling controller method and passing data
    WeatherController.getWeatherInfo(query).then((result) => {
        let response = {
            "ok": 1,
            "result": result
        }
        logger.info('cluster :' + ClusterInfo.getClusterInfo() + ' sending  response status 200 OK result= ' + JSON.stringify(result));

        res.send(response);
    }).catch((err) => {
        //console.log(err);
        logger.error('cluster :' + ClusterInfo.getClusterInfo() + ' sending  response status 500 = ' + err);

        res.status(err.status).send({
            "ok": -1,
            "errMsg": err.msg
        });
    });


});


module.exports = router;