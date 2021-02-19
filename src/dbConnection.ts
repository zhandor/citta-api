import mongoose from 'mongoose';

const connection = (database: string) => {
    const mongooseParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };

    const connect = () => {
        mongoose.connect(database, mongooseParams).then((result) => {
            console.log({result});            
            console.log("Connection successfull");
        }).catch((error) => {
            console.log("The following error occurred: ", error);
        });
    }

    connect();
};

export default connection