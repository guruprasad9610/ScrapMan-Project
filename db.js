import mongoose from 'mongoose';

const connectDb = async () => {
  const URL = "mongodb+srv://arn1245:Ajatus%40123@cluster0.gmz76kt.mongodb.net/scrapman_db";
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDb is connected');
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
