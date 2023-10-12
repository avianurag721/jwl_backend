const mongoose= require("mongoose")
require("dotenv").config()


exports.connect = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        family: 4,
    })
    .then(()=>console.log("connected to db successfully"))
    .catch(()=>console.log("unable to connect to the database"))
}