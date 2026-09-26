import app from "./app/app.js"
import { connectDB } from "./config/DB/db.js";

await connectDB()

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
    
})