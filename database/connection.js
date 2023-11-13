import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  const connnectionUrl =
    "mongodb+srv://nihalgawale123:Aishwarya2205@projectecommerce.sadlez3.mongodb.net/";

  //    mongoose.connect(connnectionUrl,configOptions).then(() =>{
  //        console.log("Successfully connected to database")
  //        return true;
  //     }).catch(err => {

  //         console.log(`Error connecting to database ${err.message}`)
  //         return false
  //     });
  const connection = await mongoose.connect(connnectionUrl, configOptions);
  if (connection) {
    console.log("Successfully connected to database");
    return true;
  } else {
    console.log(`Error connecting to database `);
    return false;
  }
};

export default connectToDB;
