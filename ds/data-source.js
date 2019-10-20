var MongoUtil=require('../utils/mongoUtil');
var EnvProvider=require('../utils/env-provider');
class DataSource{



getDataFromDb(query){
let db=MongoUtil.getDb();

return new Promise((resolve,reject)=>{

db.collection(EnvProvider.getConfig("COL_NAME")).aggregate(query).toArray((err,data)=>{

if(err)reject(err);
else
resolve(data);
})

});

}


}

module.exports=new DataSource();
