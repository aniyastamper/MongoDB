/* USe the router function of express js and call*/
/*This will allow for us to use the API Endpoints :) */
const router = require('express').Router()

const { getCollection, ObjectId } = require('../joke-db') /*We can now use the ID's mongo gives us directly */


router.get('/joke/:id', async (request,response)=>{ /*Order matters, be sure to specify the which specifc object in the collection we call */
   const { id } = request.params
   const collection = await getCollection('Jokes-API', 'Jokes')
   const joke = await collection.findOne({"_id": new ObjectId(id)}) /*Find one will filter through our collection to find one object to pull */
    response.json(joke)

})

router.get('/random', async (request,response) => {
    const collection = await getCollection('Jokes-API', 'Jokes')
    const jokes = await collection.find({}).toArray()
    const randomIndex = Math.floor(Math.random() * jokes.length)
    response.json(jokes[randomIndex])
})

router.get('/random/exclude/:id', async (request,response)  => { /*Pay attention to your routings */
    const {id} = request.params
    const collection = await getCollection('Jokes-API', 'Jokes')
    const jokes = await collection.find({}).toArray()
    const filteredJokes = jokes.filter( ({_id}) => _id.toString() !== id) /*We want to filter out strings that have been used and string the id from the jokes objet*/
    const randomIndex = Math.floor(Math.random() * filteredJokes.length) /*Is randomizing the jokes we JUST filtered to keep it fun / diffrent and non-repeating */
    response.json(filteredJokes[randomIndex])
})

/*Adding Data to an object from the webpage? -- Use App.post */
/*This will be the refrence point for the admin page */
router.post('/new', async (request, response) => {
    const { joke, punchline } = request.body
    const collection = await getCollection('Jokes-API', 'Jokes')
    await collection.insertOne({ joke, punchline })
    // jokes.push({ id: jokes.length, joke, punchline })
    response.json({message: 'New Joke Added!'})
})

module.exports = router /* Now this file will be able to handle all of the API Routing */