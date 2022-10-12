const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();

passwordSchema
.is().min(8)                  // Longueur minimum : 8 caractères
.has().uppercase()            // Doit avoir au moins une majuscule
.has().lowercase()            // Doit avoir au moins une minuscule
.has().digits()               // Doit avoir au moins un chiffre

module.exports = passwordSchema;