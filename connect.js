const {MongoClient} =require("mongodb")
module.exports={
    db:null,
    async connect(){

        try{
        const connection=await MongoClient.connect("mongodb+srv://root:root@cluster0.qxxpm.mongodb.net?retryWrites=true&w=majority")
        this.db=connection.db("BikeRent")
       console.log("connected");
        
        }
        catch(err){
          
                console.log("error in db",err);
            }

        
    }
}

