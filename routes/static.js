
const router = require('express').Router()
const path = require('path') /*a package mod to configure file routes in 1*/
const root = path.join(__dirname, '..' ,'public') /*The '..' is to navigate to the 404 route page its otside to routes and in public */

router.get('/', (request,response)=>{
    /*Link your Home-page to the home index.html file...This is linked to that direct route */
    response.sendFile('index.html', {root})
})

router.all('*', (request, response) => {
    response.status(404).sendFile('404.html', {root})
})

module.exports = router
