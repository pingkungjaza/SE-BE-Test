const mongoose = require("mongoose");
const UserSchema = require('../schemas/user');
const Groupchema = require('../schemas/group');
const GroupUserSchema = require('../schemas/group-user');

const models = {
    UserModel: mongoose.model('User', UserSchema),
    GroupModel: mongoose.model('Group', Groupchema),
    GroupUserModel: mongoose.model('GroupUser', GroupUserSchema),
}

module.exports = models