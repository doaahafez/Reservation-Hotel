import express from "express";
import cors from "cors";
import {sample_foods} from "./data"
import { sample_tags } from '../../fullDemo/shard/models/data'
const app = express();
const Port = 5000;
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/foods", (req, res) => {
    res.send(sample_foods)
});
app.get("/api/foods/search/:searchTerm", (req, res) =>{
    const searchTerm = req.params.searchTerm;
    const foods = sample_foods
    .filter(food => food.name.toLowerCase()
    .includes(searchTerm.toLocaleLowerCase()));
    res.send (foods);
})
 
app.get("/api/foods/tags", (req, res) =>{
res.send(sample_tags);
})

app.get("/api/foods/tags/:tagName",(req,res)=>{
    const tagName = req.params.tagName;
    const foods = sample_foods
    .filter(food => food.tags?.includes(tagName) ) 
    res.send(foods);
})

app.get("/api/foods/:foodId",(req, res)=>{
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id === foodId);
    res.send(food);
})

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});