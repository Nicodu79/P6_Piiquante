

// Importation de mongoose
const mongoose = require("mongoose");

// Création d'un schéma mongoose
const sauceSchema = mongoose.Schema({
    userId : { tpye : String },
    name : { type : String, required : true},
    manufacturer : { type : String, required : true},
    description : { type : String, required : true},
    heat : { type : String, required : true},
    imageUrl : { type : String, required : true},
    mainPepper : { type : String, required : true},
    likes : { type : Number, default : 0 },
    dislikes : { type : Number, default: 0 },
    usersliked : { type : [String] },
    usersDisliked : { type : [String] },
});



module.exports = mongoose.model("sauce", sauceSchema);


