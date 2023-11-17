const dotenv = require("dotenv");
dotenv.config();

class Config {
    constructor () {
        this.PORT = +process.env.PORT || 8000;
        this.OPENAI_API_KEY = process.env.OPENAI_API_KEY || ""
        // this.ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "$#@secret-key#$";
        // this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "$refresh-key@#";
        this.MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb+srv://dassibasish46:QqFypehrot69tjpo@cluster0.d4dxg82.mongodb.net/book";
    }
}

module.exports = new Config();
