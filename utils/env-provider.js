
//This is class which provides Env variables to app
class EnvProvider{
constructor(){
this.keyValues=require('../configurations/config.json');    
}
    getConfig(key){
        return this.keyValues[key];
         
    }
    
}

module.exports=new EnvProvider();