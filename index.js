//  express module
const express = require('express')

// initialize express
const app = express()

// import error handling class
const expressError = require('./expressError')

// import fakeDB
let fakeDataBase = require('./fakeDB')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// import shopping list routers
const shoppingListRouter = require('./shoppingRoute')

app.use('/list', shoppingListRouter)




module.exports = app














// error handling
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(err.status).send(err.message)
});


app.listen(5000, function () {
    console.log('Server running on port 5000')
})





