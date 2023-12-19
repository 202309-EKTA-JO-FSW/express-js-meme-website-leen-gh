const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")


const memes = [
    {
        name: "Memes that make us smile",
        imgURL: "https://exse.eyewated.com/pict/c38cc4d7ef9a30de-1024x683.jpg",
        price: "$20.00 - $30.00"
    },
    {
        name: "Programmer memes",
        imgURL: "https://aprogrammerlife.com/images/pictuers/programmers_looking_at_programming_memes.jpg",
        price: "$10.00"
    }
]

app.listen(3000, () => console.log("Server running on port 3000"))

module.exports = app

app.get("/", (req, res) => {
  res.render("index", {memes})
  
})

app.get('/add-meme', function(req, res) {
  res.render("add-meme")
});

app.get("/memes", (req, res) => {
    res.send(memes);
});

app.post("/memes", (req, res) => {
  const newMeme = {
    name: req.body.name,
    imgURL: req.body.imgUrl,
    price: req.body.price
  }
  memes.push(newMeme)
  res.redirect('/');
});
  
app.get("/meme/:id", (req, res) => {
  const id = req.params.id;
  const meme = memes.find((meme) => meme.id === id);
  if (meme) {
    res.status(200).send(meme);
  } else {
    res.status(422).json("meme not found");
    }
});
