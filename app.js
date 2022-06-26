const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const Schema = mongoose.Schema;
const Blog = require("./models/Blog");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/cleanblog-test-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = 3200;

app.get("/", async(req, res) => {
    const blogs = await Blog.find({});
    res.render("index", { blogs });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/add_post", (req, res) => {
    res.render("add_post");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.post("/blogs", async(req, res) => {
    await Blog.create(req.body);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Sunucu ${port} da çalışıyor...`);
});