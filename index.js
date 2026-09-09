const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');

const location = path.join(__dirname, 'items.json');


app.get('/api/items', (req, res) => {

    fs.readFile(location, 'utf-8', (err, data) => {

        if (err) {
            return res.status(500).json({
                error: 'Could not read items'
            });
        }

        try {
            const items = JSON.parse(data);

            res.status(200).json(items);

        } catch (error) {

            res.status(500).json({
                error: 'Invalid JSON data'
            });
        }
    });
});


app.get('/api/items/:id', (req, res) => {

    const id = req.params.id;

    fs.readFile(location, 'utf-8', (err, data) => {

        if (err) {
            return res.status(500).json({
                error: 'Could not read items'
            });
        }

        try {
            const items = JSON.parse(data);

            const item = items.find((item) => item.id === id);

            if (!item) {
                return res.status(404).json({
                    error: 'Not found'
                });
            }

            res.status(200).json(item);

        } catch (error) {

            res.status(500).json({
                error: 'Invalid JSON data'
            });
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});