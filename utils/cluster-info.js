var cluster=require('cluster');


class ClusterInfo{

getClusterInfo(){

    if(cluster.isMaster){
       return "master"; 
    }else{
       return cluster.worker.id; 
    }
    
}

}

module.exports=new ClusterInfo;