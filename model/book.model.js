
const mongoose=require("mongoose")

const bookSchema=mongoose.Schema({
    title: String,
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 

})

const BookModel=mongoose.model("book",bookSchema)

module.exports={
    BookModel
}