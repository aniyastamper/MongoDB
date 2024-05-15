/*We downloaded our express npm file and now want to initalize it with our code*/ 
const express = require('express')
const app = express()
const path = require('path') /*a package mod to configure file routes in 1*/

const { getCollection, ObjectId } = require('./joke-db') /*We can now use the ID's mongo gives us directly */

/**These prompts will hold our Middleware AKA the connection from Json to HTML */
/**We want our webpage to be able to run json throughout our code and webpage */
app.use(express.json())
app.use(express.static('public')) /*This is our page Route for/to html files*/

const root = path.join(__dirname, 'public')

// const jokes = [
//     /*Map over the array so that An index can be added to all current and new items which can be added */
//     /*The randomIndex automatically indexes each object 0-w.e */
//     { "joke":"Why couldn't the bicycle stand up by itself?", "punchline":" It was two tired!"},
//     {  "joke":"What do you call fake spaghetti?", "punchline":" An impasta! "},
//     {  "joke":"Why did the tomato turn red?", "punchline":" Because it saw the salad dressing!"},
//     {  "joke":"Why don't scientists trust atoms?", "punchline":" Because they make up everything!"},
//     {  "joke":"What did one ocean say to the other ocean?", "punchline":" Nothing, they just waved!"},
//     {  "joke":"How does a penguin build its house?", "punchline":" Igloos it together!"},
//     {  "joke":"Why did the math book look sad?", "punchline":"Because it had too many problems. "},
// ].map((joke, id) => ({ id, ...joke }))

/**You may be given a defult port or you may not to be sure give yourself options with ||=OR */
const port = process.env.PORT || 3000 

/*Simply displaying data in the webpage from a json Object -- Use App.Get */

app.get('/', (request,response)=>{
    /*Link your Home-page to the home index.html file...This is linked to that direct route */
    response.sendFile('index.html', {root})
})

app.get('/api/v1/joke/:id', async (request,response)=>{ /*Order matters, be sure to specify the which specifc object in the collection we call */
   const { id } = request.params
   const collection = await getCollection('Jokes-API', 'Jokes')
   const joke = await collection.findOne({"_id": new ObjectId(id)}) /*Find one will filter through our collection to find one object to pull */
    response.json(joke)

})


app.get('/api/v1/random', async (request,response) => {
    const collection = await getCollection('Jokes-API', 'Jokes')
    const jokes = await collection.find({}).toArray()
    const randomIndex = Math.floor(Math.random() * jokes.length)
    response.json(jokes[randomIndex])
})

app.get('/api/v1/random/exclude/:id', async (request,response)  => { /*Pay attention to your routings */
    const {id} = request.params
    const collection = await getCollection('Jokes-API', 'Jokes')
    const jokes = await collection.find({}).toArray()
    const filteredJokes = jokes.filter( ({_id}) => _id.toString() !== id) /*We want to filter out strings that have been used and string the id from the jokes objet*/
    const randomIndex = Math.floor(Math.random() * filteredJokes.length) /*Is randomizing the jokes we JUST filtered to keep it fun / diffrent and non-repeating */
    response.json(filteredJokes[randomIndex])

})

/*Adding Data to an object from the webpage? -- Use App.post */
/*This will be the refrence point for the admin page */
app.post('/api/v1/new', async (request, response) => {
    const { joke, punchline } = request.body
    const collection = await getCollection('Jokes-API', 'Jokes')
    await collection.insertOne({ joke, punchline })
    // jokes.push({ id: jokes.length, joke, punchline })
    response.json({message: 'New Joke Added!'})
})

/* Want to create a Error Page? */

app.all('*', (request, response) => {
    response.status(404).sendFile('404.html', {root})
})

app.listen(port, () => console.log(`Server is Running http://localhost:${port}`))