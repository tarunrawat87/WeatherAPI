var DataLoader=require('../utils/data-loader');


describe('loader',()=>{

it('loading data into mongo',()=>{

   DataLoader.loadData().then().catch((err)=>{
    console.log('data not loaded');
    console.log(err);  
   });
   
   
});

});