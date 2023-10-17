import mongoose from "mongoose";


const configOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true
}

const connectToDB = async() => {
    const connnectionUrl = "mongodb+srv://nihalgawale123:Aishwarya2205@projectecommerce.sadlez3.mongodb.net/"

    mongoose.connect(connnectionUrl,configOptions).then(() =>{
        console.log("Successfully connected to database")
    }).catch(err => console.log(`Error connecting to database ${err.message}`));
}

export default connectToDB;