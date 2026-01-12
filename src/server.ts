import app from "./app";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URL!)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });