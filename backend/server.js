const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/media", express.static(path.join(__dirname, "media"))); // Serve images from media folder
// app.use("/api/products", productRoutes);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/brands", require("./routes/brandRoutes"));
app.use('/api/auth', require("./routes/authRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
// app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/banners", require("./routes/bannerRoutes"));;

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


