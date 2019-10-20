

class EnvProvider{
constructor(){
this.keyValues=require('../configurations/config.json');    
}
    getConfig(key){
        return this.keyValues[key];
         
    }
    
}

module.exports=new EnvProvider();