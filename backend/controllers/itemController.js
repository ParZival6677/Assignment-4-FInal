// controllers/itemController.js
const db = require('../models');
const Item = db.items;

const createItem = async (req, res) => {
    try {
        const { pictures, names, descriptions } = req.body;

        const item = await Item.create({
            pictures,
            names,
            descriptions,
        });

        return res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateItem = async (req, res) => {
    try {
        const { pictures, names, descriptions } = req.body;
        const itemId = req.params.id;

        const item = await Item.findByIdAndUpdate(itemId, {
            pictures,
            names,
            descriptions,
        }, { new: true });

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const item = await Item.findByIdAndDelete(itemId);

        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }

        return res.status(200).json({ message: 'Item deleted successfully', item });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json(items);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getAllItems,
};
