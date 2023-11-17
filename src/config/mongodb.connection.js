const mongoose = require("mongoose");
const config = require("./config");

class MongoDB {

    constructor (){}

    async connect(){
        try{
            await mongoose.connect(config.MONGO_DB_URL,
                {
                    // useNewUrlParser: true,
                    // useUnifiedTopology: true,
                });

                console.log("Mongodb connected");

        }catch(e){
            console.log("Error in mongodb connection" + e);
        }
    }
}

module.exports = new MongoDB();