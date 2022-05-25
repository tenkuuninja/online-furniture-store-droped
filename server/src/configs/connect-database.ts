import mongoose from 'mongoose';
import bluebird from 'bluebird';

require('dotenv').config();

export default function () {
  mongoose.Promise = bluebird;

  const connectionString = process.env.MONGO_URI || "mongodb://localhost:27017/online-furniture-store";

  return mongoose
    .connect(connectionString)
    .then(() => console.log('Connected to database successful!!'))
    .catch((e: any) => {
      console.log('e :>> ', e);
      console.log('Connected to database failed!!');
    });
}
