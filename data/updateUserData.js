const models = require('../models/models')

const updateUserData = async () => {
    await models.UserModel.find({}, async (err, user) => {
        if (err) return console.error(err);
        for (let i = 0; i < user.length; i++) {
            const doc = await models.UserModel.findById(user[i]._id);
            doc.username = user[i].username.charAt(0).toUpperCase() + user[i].username.slice(1).toLowerCase();
            await doc.save();
        }
    })
}

module.exports = updateUserData