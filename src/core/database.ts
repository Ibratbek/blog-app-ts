import mongoose, { mongo } from 'mongoose';

export default class Database {
    url: string = process.env.MONGO_URL || "mongodb://localhost:27017/blogapp";

    connect() {
        return mongoose.connect(this.url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true,

        }, (err) => {
            if (err) {
                console.error(err)
            } else {
                console.log(`Connected MongoDB`);
            }
        })
    }
};