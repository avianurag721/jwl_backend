const {cloudinaryConnect }= require("./Config/cloudinary");
const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 4000
const DB = require("./Config/DBconnect")
const fileUpload = require("express-fileupload");

const cors = require("cors");
DB.connect()
cloudinaryConnect()
app.use(express.json())
app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

// ********routes**********
const productRoutes=require("./Routes/product")

app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
    res.status(403).json({
        success:true,
        message:"home page"
    })
})



app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`)
})