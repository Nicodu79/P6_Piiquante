
// Pour verifier les tokens
const jwt = require("jsonwebtoken");

// middleware d'authentification :
module.exports = (req, res, next) => {
    try {
        // récupère le token du user (bearer)
        const token = req.headers.authorization.split(" ")[1];
        // décode ce token à partir de la clé 
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        // récupère le userId
        const userId = decodedToken.userId;

        // vérifie si l'id encodé et l'id du user sont identiques
        if (req.body.userId && req.body.userId !== userId) {
            throw "User ID non valide !";
        } else {
            res.locals.userId = userId
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | "Requête non authentifiée !" });
    }
};