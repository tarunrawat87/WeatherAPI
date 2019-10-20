var DataSource=require('../ds/data-source')


class WeatherController{

    
   getWeatherInfo(query){
     //add invalid data handler
     let me=this;
            
    return new Promise((resolve,reject)=>{
        try{

            if(!query.date){
                reject("date param is missing");
            }

            let date=new Date(query.date);

            if(me.isValidDate(date)==false){
                console.log("invalid date");
                reject("invalid date format");

                return;
            }    

            if(me.isDatePrime(date)) {
    
                
              let key,value;
              if(query.city_name||query.city_id){
                
                if(query.city_id){
                    key="city.id";value=query.city_id; 
                }else{
                    key="city.name";value=query.city_name;
                }

              } else{
                  reject("invalid params");
              }     
             let milliseconds=me.convertDateToMilliseconds(query.date);
             let mongoquery=this.prepareMongoQuery(key,value,milliseconds);      
                DataSource.getDataFromDb(mongoquery).then((res)=>{
                    resolve(res);
                }).catch((err)=>{
                    reject("internal server error");
                   console.log(err); 
                })

            }else{
                reject("date is not Prime");
            }
   
        }catch(err){
            console.log(err);
            reject("internal server error");
        }
       
    });

   } 
    
   isDatePrime(day){
    let dayValue=day.getDate();
    let isPrime=true;
    let i=2;
    while(i<=dayValue/2){

        if(dayValue%i==0){
            isPrime=false;
            break;
        }
        i++;
    }
    return isPrime;
   }

prepareMongoQuery(key,value,milliseconds){
let query=[];
let match;
if(key=="city.name"){
    match={"$match":{"city.name":value}};
}else{
    match={"$match":{"city.id":value}};

}

query.push(match);
let projection={"$project":{
    "data":{
        "$filter": {
                "input": "$data",
                "as": "dates",
                "cond":{"$eq":["$$dates.dt",milliseconds]}
             } 
         },"city":1   
}}
query.push(projection);
return query;
}

isValidDate(d) {
return d instanceof Date && !isNaN(d);
}

   convertDateToMilliseconds(date){
  let dateInstance=new Date(date);
   //since in database every value in milliseconds
   //since every value is database has time 11.00 so converting the it 
   let milliSecValue=dateInstance.valueOf()+21600000;

   return milliSecValue/1000; 
   }    

}

module.exports=new WeatherController();