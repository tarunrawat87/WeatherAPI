var DataSource = require('../ds/data-source')
var LoggerUTIl = require('../utils/Logger');
var ClusterInfo = require('../utils/cluster-info');
var logger;

class WeatherController {

    //function that gives weather infp
    getWeatherInfo(query) {

        let me = this;
        logger = LoggerUTIl.getLogger();
        return new Promise((resolve, reject) => {
            try {
                //if date is not provided
                if (!query.date) {
                    logger.warn('cluster :' + ClusterInfo.getClusterInfo() + ' data param is missing ');

                    reject({
                        "msg": "date param is missing",
                        "status": 400
                    });
                }

                let date = new Date(query.date);

                if (me.isValidDate(date) == false) {
                    logger.warn('cluster :' + ClusterInfo.getClusterInfo() + ' invalid date format ');

                    reject({
                        "msg": "invalid date format",
                        "status": 400
                    });

                    return;
                }
                //if date is Prime
                if (me.isDatePrime(date)) {


                    let key, value;
                    if (query.city_name || query.city_id) {

                        if (query.city_id) {
                            key = "city.id";
                            value = query.city_id;
                        } else {
                            key = "city.name";
                            value = query.city_name;
                        }

                    } else {

                        logger.warn('cluster :' + ClusterInfo.getClusterInfo() + ' invalid params ');

                        reject({
                            "msg": "invalid params",
                            "status": 400
                        });

                    }
                    //since data in db is in milliseconds
                    let milliseconds = me.convertDateToMilliseconds(query.date);
                    let mongoquery = this.prepareMongoQuery(key, value, milliseconds);
                    DataSource.getDataFromDb(mongoquery).then((res) => {
                        resolve(res);
                    }).catch((err) => {
                        logger.error('cluster :' + ClusterInfo.getClusterInfo() + ' error while fetching data from mongo ' + err);
                        reject({
                            "msg": "internal server error",
                            "status": 500
                        });

                    })

                } else {
                    logger.info('cluster :' + ClusterInfo.getClusterInfo() + ' date is not prime ');

                    reject({
                        "msg": "date is not Prime",
                        "status": 400
                    });

                }

            } catch (err) {

                logger.error('cluster :' + ClusterInfo.getClusterInfo() + ' error in weather controller ' + err);

                reject({
                    "msg": "internal server error",
                    "status": 500
                });

            }

        });

    }

    isDatePrime(day) {
        let dayValue = day.getDate();
        let isPrime = true;
        let i = 2;
        while (i <= dayValue / 2) {

            if (dayValue % i == 0) {
                isPrime = false;
                break;
            }
            i++;
        }
        return isPrime;
    }
    //this function prepares query for mongo
    prepareMongoQuery(key, value, milliseconds) {
        let query = [];
        let match;
        if (key == "city.name") {
            match = {
                "$match": {
                    "city.name": value
                }
            };
        } else {
            match = {
                "$match": {
                    "city.id": value
                }
            };

        }

        query.push(match);
        let projection = {
            "$project": {
                "data": {
                    "$filter": {
                        "input": "$data",
                        "as": "dates",
                        "cond": {
                            "$eq": ["$$dates.dt", milliseconds]
                        }
                    }
                },
                "city": 1
            }
        }
        query.push(projection);
        logger.info('cluster :' + ClusterInfo.getClusterInfo() + ' querying mongo =' + JSON.stringify(query));
        return query;
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }
    //this function converts date to milliseconds
    convertDateToMilliseconds(date) {
        let dateInstance = new Date(date);
        //since in database every value in milliseconds
        //since every value is database has time 11.00 so converting the it 
        let milliSecValue = dateInstance.valueOf() + 21600000;

        return milliSecValue / 1000;
    }

}

module.exports = new WeatherController();