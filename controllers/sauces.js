const Sauce = require("../models/sauces");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: "Sauce enregistrée !!" }) })
        .catch(error => {
            res.status(400).json({ error })
        })
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce)
        })
        .catch((error) => {
            res.status(404).json({ error })
        });
};


exports.getAllSauce = (req, res, next) => {
    // console.log("coucou")
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => {
            console.log(error)
            res.status(400).json({ error })
        });
};


exports.modifySauce = (req, res, next) => {

    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            if (sauce.userId !== sauceObject.userId) {
                res.status(403).json({ error: "Requete non autorisée !" })
            } else {
                if (req.file) {
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, function() {})
                    }
                    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
                            .catch(error => res.status(400).json({ error }));
                }
            })
};


exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId !== res.locals.userId) {
                res.status(403).json({ error: "Requete non autorisée !" })
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                        .catch(error => res.status(400).json({ error }));
                });
            }
        })
        .catch(error => res.status(500).json({ error }));
};


exports.likesDislikes = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((object) => {
            console.log(object);
            // like = 1 (like= +1)
            if (!object.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: 1 },
                        $push: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like +1" }))
                    .catch((error) => res.status(400).json({ error }));
            };

            // like = 0 (like = 0, enlever un like)
            if (object.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id },
                    {
                        $inc: { likes: -1 },
                        $pull: { usersLiked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce like -1" }))
                    .catch((error) => res.status(400).json({ error }));
            };

            // Dislike
            if (!object.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id },
                    {
                        $inc: { dislikes: 1 },
                        $push: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce dislike +1" }))
                    .catch((error) => res.status(400).json({ error }));
            };

            // si dislike, like = 0
            if (object.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id },
                    {
                        $inc: { dislikes: -1 },
                        $pull: { usersDisliked: req.body.userId }
                    }
                )
                    .then(() => res.status(201).json({ message: "Sauce dislike 0" }))
                    .catch((error) => res.status(400).json({ error }));
            };
        })
        .catch((error) => res.status(404).json({ error }));
}











