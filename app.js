const connectDB = require("./utils/connectDB");
const initialData = require("./data/initialData");
const queryDataForCSV = require("./data/queryDataForCSV");
const updateUserData = require("./data/updateUserData");

const startTask = async () => {
    await connectDB();
    await initialData();

    //Question 1
    await queryDataForCSV();

    //Question 2
    await updateUserData();
}

startTask();