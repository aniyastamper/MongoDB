/*
 * HERE in site.js is where we display/ Run the object created in our app.js file to convert over to our webpage
    *GET,POST,DELETE
 */

alert('Hey I work')

let ignoreID= -1

/*Receive a joke to return to the webpage console */ 
 /* When passing a object change the ticks! */
const getJoke = async () => {
    const response = await fetch(`/api/v1/random/exclude/${ignoreID}`)
    const { _id ,joke, punchline} = await response.json()
    //will display which joke is fulling the page
   // alert(id)
    ignoreID = _id /* When a joke runs through the function the first time its all free, After that the current Joke id # is now excluded */ 

    document.querySelector('.joke p').textContent = joke
    document.querySelector('.joke .punchline').textContent = punchline
}

getJoke()

/*Aligning the joke to the button click  */
document.querySelector('.joke button').addEventListener('click', getJoke)