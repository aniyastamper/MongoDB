/* express npm file and now initalize it with code*/ 
const express = require('express')
const app = express()

/*Middleware AKA the connection from Json to HTML */
/**We want our webpage to be able to run json throughout our code and webpage */
app.use(express.json())
app.use(express.static('public')) /*This is our page Route for/to html files*/
app.use('/api/v1', require('./routes/api-v1'))  /*We hard coded /api/v1 to our routes now app.use will automatically use it */
app.use (require('./routes/static')) /* require your needed route and DB connections */

/**You may be given a defult port or you may not to be sure give yourself options with ||=OR */
const port = process.env.PORT || 3000 
/* Want to create a Error Page? */

app.listen(port, () => console.log(`Server is Running http://localhost:${port}`))