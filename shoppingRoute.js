const express = require('express');
const { route } = require('express/lib/application');
const router = new express.Router();

let fakeDataBase = require('./fakeDB')

const expressError = require('./expressError')

// get all shopping items
router.get('/', (req, res) => {
    return res.json(fakeDataBase)
})

// get single item from shopping list
router.get('/:name', (req, res) => {
    const name = req.params.name
    const shoppinhItem = fakeDataBase.find(item => item.name === name)

    if (!shoppinhItem) throw new expressError({message: 'item does not exist'}, 404)
    
    return res.json(shoppinhItem)
})


router.post('/', (req, res) => {
    const newItem = req.body
    fakeDataBase.push(newItem)
    res.json({added: newItem})
});

router.patch('/', (req, res) => {
    const item = req.query
    const newItem = req.body
    const itemInDatabase = fakeDataBase.find(i => i.name == item.name)
    if (!itemInDatabase) throw new expressError({ message: 'item does not exist' }, 404)
    
    itemInDatabase.name = newItem.name
    itemInDatabase.price = newItem.price

    res.json({ updated: itemInDatabase})
});

router.delete('/:name', (req, res) => {
    const item = req.params.name

    for (let i = 0; i < fakeDataBase.length; i++) {
        if (fakeDataBase[i].name === item) {
            fakeDataBase.splice(i, 1)
        }
    }
    res.json({message: 'DELETED'})
});


module.exports = router;







