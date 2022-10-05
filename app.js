require("dotenv").config();

// Importation d'express
const express = require("express");

// Permet d'extraire l'objet JSON des requetes POST
const bodyParser = require("body-parser");

// Connexion a la base de données MongoDB
const mongoose = require("mongoose");

const sauce = require("./models/sauces");

const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauces");
const path = require("path");

// Connexion à MongoDB
mongoose.connect("mongodb+srv://"+process.env.LOGIN_MONGO_DB+":"+process.env.MDP_MONGO_DB+"@cluster0.cfyo9bf.mongodb.net/?retryWrites=true&w=majority",
{ useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log("connexion a MongoDB reussie !!"))
.catch(() => console.log("connexion a MongoDB echoue !"));


const app = express();

app.use(express.json());


// middleware Header débloquant certains systemes de sécurité CORS
app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});


app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;

