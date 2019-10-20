var MongoClient = require('mongodb').MongoClient;
var EnvProvider = require('../utils/env-provider');
class MongoUtil {
    constructor() {
        this.db = null;
    }
    init(emitterObject) {
        let object = this;
        MongoClient.connect(EnvProvider.getConfig("MONGO_URL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, db) {
            
            try {
                object.db = db.db(EnvProvider.getConfig("DB"));
            } catch (err) {
            //    logger.error('Error connecting to database');
                emitterObject.emit('failure');
                // reject(err); 
                return;
            }
            if (err) {
             //   logger.error('Error connecting to database');
                emitterObject.emit('failure');

                //Logging Error
            } else {
               // logger.info('connect to mongodb successfully');

                emitterObject.emit('success');

            }


        });






    }

    getDb() {
        return this.db;
    }

    getMongoClient(){
        //
    return MongoClient;
   //return null;
    }

}

module.exports = new MongoUtil;