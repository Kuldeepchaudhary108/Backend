import mongoose from "mongoose"

const ImageSchema= new mongoose.Schema({
    imagePath: {
        type:String,
        required: true
    },
})

const Image=mongoose.model("Image",ImageSchema);

export default Image