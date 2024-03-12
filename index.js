const express = require("express");
const app = express();
const PORT = 3000;
const axios = require("axios");
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

let pokemons = [{
    id: 1,
    name: "Squirtle",
    type: "water"
}];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  
//Read
app.get("/pokemons", async (req, res) => {
    try {
        const response = await axios.get("https://pokemonapilab220240312105041.azurewebsites.net/pokemon");
        res.json(response.data);
    
      } catch (error) {
        res.status(500).send(error.message);
      }


})


app.get("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get("https://pokemonapilab220240312105041.azurewebsites.net/pokemon/${id}");
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

//Create
app.post("/pokemon/:name/:type/:id", async (req, res) => {
    try {
        const { name, type, id } = req.params;
        const response = await axios.post("https://pokemonapilab220240312105041.azurewebsites.net/pokemon", {
          Name: name,
          Type: type,
          Id: id,
        });
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

//Update
app.put("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
    
        const response = await axios.put("https://pokemonapilab220240312105041.azurewebsites.net/pokemon/${id}", {
          Name: name,
          Type: type,
        });
    
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error.message);
      }
});

app.delete("/pokemon/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete("https://pokemonapilab220240312105041.azurewebsites.net/pokemon/${id}");
        res.json(response.data);
      } catch (error) {
        res.status(500).send(error.message);
      }
})

app.listen(PORT, () => {
    console.log("Listening to port" + PORT);
})