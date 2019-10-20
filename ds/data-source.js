var MongoUtil=require('../utils/mongoUtil');
var EnvProvider=require('../utils/env-provider');
var LoggerUTIL=require('../utils/Logger');
var ClusterInfo=require('../utils/cluster-info');
var logger
class DataSource{



getDataFromDb(query){
let db=MongoUtil.getDb();
logger=LoggerUTIL.getLogger();

return new Promise((resolve,reject)=>{
    logger.info('cluster :'+ClusterInfo.getClusterInfo()+' quering mongo.. ');
 
db.collection(EnvProvider.getConfig("COL_NAME")).aggregate(query).toArray((err,data)=>{
 
if(err)reject(err);
else
resolve(data);
})

});

}


}

module.exports=new DataSource();
