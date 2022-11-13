const models = require('../models/models')
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

const queryDataForCSV = async () => {
    try {
        const data = await models.GroupUserModel.aggregate([
            {
                $lookup: {
                    from: 'groups',
                    localField: 'groupId',
                    foreignField: '_id',
                    as: 'groups'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'users',
                }
            },
            {
                $project: { _id: 0, name: '$groups.name', username: '$users.username', email: '$users.email', isPrivate: '$groups.meta.isPrivate', createdAt: 1 },
            }
        ])

        const result = data.map((value) => {
            if (!value) return false
            if (value.createdAt >= new Date('2021-11-01T00:00:00.000+00:00') && value.createdAt <= new Date('2021-11-30T00:00:00.000+00:00'))
                if (value.isPrivate) {
                    const newValue = { groupname: value.name[0], username: value.username[0], email: value.email[0] }
                    return newValue;
                }
        }).
            filter((fil) => fil !== undefined).
            sort((a, b) => a.groupname.localeCompare(b.groupname) && a.username.localeCompare(b.username))

        //write csv file
        const json2csvParser = new Json2csvParser({ header: true });
        const csvData = json2csvParser.parse(result);
        fs.writeFile("data_from_mongodb.csv", csvData, (err) => {
            if (err) return console.error(err);
            console.log("Write to data_from_mongodb.csv successfully!");
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = queryDataForCSV