const express = require('express')
const cors = require('cors')
const body_parser = require('body-parser')

const fs = require('fs')

const app = express()
app.use(cors())
app.use(body_parser.json())

let POSTS = []

app.get("/", (req, res) => {
    res.json(POSTS)
})

app.post("/posts-for-category", (req, res) => {
    const criteria = req.body

    const filtered_posts = []

    for (let post of POSTS) {
        if (post.category == criteria.category) {
            filtered_posts.push(post)
        }
    }

    res.json(filtered_posts)

})

app.get("/categories", (req, res) => {
    const categories = []

    for(let post of POSTS) {
        let is_found = false 
        for(let category of categories) {
            if(post.category == category) {
                is_found = true 
                break
            }
        }
            if(!is_found) {
                categories.push(post.category)
            }
    }

    for(let i = 0; i < categories.length - 1; i++)
        for(let j = i + 1; j < categories.length; j++)
        if(categories[i].localeCompare(categories[j]) == 1) {
            tmp = categories[i]
            categories[i] = categories[j]
            categories[j] = tmp
        }


    res.json(categories)
})


app.listen(3000, () => {
    console.log("Server is listening at http://127.0.0.1:3000")
    const raw_data_string = fs.readFileSync("./data/posts.json")
    POSTS = JSON.parse(raw_data_string)
})