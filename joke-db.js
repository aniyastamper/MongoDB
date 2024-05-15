const { MongoClient, ObjectId } = require('mongodb') /*Add and install mongo data-base */
const { url } = process.env.MONGODB_URL || require('./secrets/mongodb.json')
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {    /*Is our connection to our data Base */
    await client.connect() 
    return client.db(dbName).collection(collectionName)
}

module.exports = { getCollection, ObjectId}