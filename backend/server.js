// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const itemRoutes = require('./routes/itemRoutes');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/github-data', async (req, res) => {
    try {
        const { username } = req.query;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        res.status(500).json({ error: 'Error fetching GitHub data' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'github.html'));
});

app.get('/job-search', async (req, res) => {
    const appId = "59f63c39";
    const appKey = "17305031b2706a13919335e05bfc8c17";
    const apiEndpoint = "1";

    const searchParams = {
        app_id: appId,
        app_key: appKey,
        results_per_page: 10,
    };

    const apiUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${apiEndpoint}?${new URLSearchParams(searchParams)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error in API request:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/news-feed', async (req, res) => {
    const apiUrl = 'https://ok.surf/api/v1/news-feed';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error in API request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

mongoose.connect('mongodb://localhost:27017/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/items', itemRoutes);

app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
