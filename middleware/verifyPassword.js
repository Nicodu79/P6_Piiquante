const passwordSchema = require("../models/password");

module.exports = (req, res, next) => {
    if(!passwordSchema.validate(req.body.password)) {
        res.status(400).json({message : "Mot de passe requis : 8 caractères minimum / 1 Majuscule / 1 minuscule / 1chiffre"})
    } else {
        next()
    }
};