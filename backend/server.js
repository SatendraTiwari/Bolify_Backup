import app from "./app.js"
import cloudinary from "cloudinary";
import { connection } from "./database/connection.js";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


app.set('trust proxy', 1);

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

connection();
app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})