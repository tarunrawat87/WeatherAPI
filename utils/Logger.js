var winston=require('winston');
var winstonMongodb=require('winston-mongodb');
var MongoUtil=require('../utils/mongoUtil');
var tsFormat = () => (new Date()).toLocaleTimeString();

  console.log(MongoUtil);


class Logger{
constructor(){
this.logger=null;    
}
    init(){
     this.logger = winston.createLogger({
            transports: [
                new (winston.transports.MongoDB)({
                    timestamp: true,
                    level: 'error',
                    collection:'logs',
                    db:MongoUtil.getDb(),
                    
                    format: winston.format.combine(
                        winston.format.label({ label: 'Weather Api ' }),
                        winston.format.timestamp()
                        
        
                      )
                }),
                new (winston.transports.MongoDB)({
                    timestamp: true,
                    level: 'warn',
                    collection:'logs',
                    db:MongoUtil.getDb(),
                    format: winston.format.combine(
                        winston.format.label({ label: 'Weather Api ' }),
                        winston.format.timestamp()
                    
        
                      ),
                    
                }),
                new (winston.transports.MongoDB)({
                    level: 'info',
                    timestamp: true,
                    collection:'logs',
                    db:MongoUtil.getDb(),
                    format: winston.format.combine(
                        winston.format.label({ label: 'Weather Api ' }),
                        winston.format.timestamp()
                        
        
                      )
                }) 
        
        
            ],
            exitOnError: false    
          });

        
    }
getLogger(){
    return this.logger;
}
}

  module.exports=new Logger();