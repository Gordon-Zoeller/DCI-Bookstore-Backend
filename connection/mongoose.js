import mongoose from "mongoose";

async function mongooseConnection(){
try {
    await mongoose.connect(`${process.env.DBCONNECTION}`);
    console.log('connected to database');
} catch (error) {
    console.log(error);
}
}

export {mongooseConnection}