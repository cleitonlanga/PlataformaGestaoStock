import dotenv from "dotenv";

dotenv.config();

const config = {
  mongoURI:
    process.env.MONGO_URI ||
    "mongodb+srv://cleytonlanga:8wB4saI4FNiQTrfH@db.uhsy4dz.mongodb.net/?retryWrites=true&w=majority&appName=db",
};

export default config;
