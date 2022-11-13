const models = require('../models/models')

const initialData = async () => {
    try {
        //check exist user before initial user
        await models.UserModel.countDocuments({}, async (err, count) => {
            if (err) return console.error(err);

            if (count === 0) {
                await models.UserModel.insertMany([
                    //date before Nov,21
                    { createdAt: new Date('2021-11-01'), email: 'user1@email.com', username: 'user1', updatedAt: new Date('2021-11-01') },
                    { createdAt: new Date('2021-11-02'), email: 'user2@email.com', username: 'user2', updatedAt: new Date('2021-11-02') },
                    { createdAt: new Date('2021-11-03'), email: 'user3@email.com', username: 'user3', updatedAt: new Date('2021-11-03') },
                    { createdAt: new Date('2021-11-04'), email: 'user4@email.com', username: 'user4', updatedAt: new Date('2021-11-04') },
                    //date now by default
                    { email: 'user5@email.com', username: 'user5' },
                    { email: 'user6@email.com', username: 'user6' },
                    { email: 'user7@email.com', username: 'user7' },
                    { email: 'user8@email.com', username: 'user8' },
                ]);
            }
        })

        //check exist group before initial group
        await models.GroupModel.countDocuments({}, async (err, count) => {
            if (err) return console.error(err);

            if (count === 0) {
                await models.GroupModel.insertMany([
                    //date before Nov,21 have private and public group
                    { createdAt: new Date('2021-11-01'), meta: { isPrivate: true }, name: 'Group 1', status: 'active', updatedAt: new Date('2021-11-01') },
                    { createdAt: new Date('2021-11-02'), name: 'Group 2', status: 'active', updatedAt: new Date('2021-11-02') },
                    { createdAt: new Date('2021-11-03'), name: 'Group 3', status: 'deleted', updatedAt: new Date('2021-11-03') },
                    //date now by default have private and public group
                    { meta: { isPrivate: true }, name: 'Group 4', status: 'active' },
                    { email: 'user5@email.com', name: 'Group 5', status: 'active' },
                    { email: 'user6@email.com', name: 'Group 6', status: 'deleted' },
                ]);
            }
        })

        //check exist group user before initial group user
        await models.GroupUserModel.countDocuments({}, async (err, count) => {
            if (err) return console.error(err);

            if (count === 0) {
                const userModel = await models.UserModel.find();
                const groupModel = await models.GroupModel.find().where({ status: 'active' });
                if (userModel.length === 8 && groupModel.length === 4) {
                    await models.GroupUserModel.insertMany([
                        //date before Nov,21
                        { createdAt: new Date('2021-11-01'), groupId: groupModel[0]._id, userId: userModel[0]._id, updatedAt: new Date('2021-11-01') },
                        { createdAt: new Date('2021-11-02'), groupId: groupModel[1]._id, userId: userModel[1]._id, updatedAt: new Date('2021-11-02') },
                        { createdAt: new Date('2021-11-03'), groupId: groupModel[2]._id, userId: userModel[2]._id, updatedAt: new Date('2021-11-03') },
                        { createdAt: new Date('2021-11-04'), groupId: groupModel[3]._id, userId: userModel[3]._id, updatedAt: new Date('2021-11-04') },
                        //date now by default
                        { groupId: groupModel[0]._id, userId: userModel[4]._id },
                        { groupId: groupModel[1]._id, userId: userModel[5]._id },
                        { groupId: groupModel[2]._id, userId: userModel[6]._id },
                        { groupId: groupModel[3]._id, userId: userModel[7]._id },
                    ]);
                }
            }
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = initialData