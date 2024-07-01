const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/okeyai', async (req, res) => {
    const ask = req.query.ask;

    if (!ask) {
        return res.status(400).json({ error: 'Query parameter "ask" is required.' });
    }

    const url = "https://api-okeymeta.vercel.app/api/ssailm/model/okeyai2.0-basic/okeyai";
    const params = {
        ask: ask,
        apiKey: "okeymeta-wzPaWgcbThWqSOc4Lb4THello"
    };

    try {
        const response = await axios.get(url, { params });
        const data = response.data;
        console.log("Full JSON Response:", data);
        const status = data.status;
        const model = data.model;
        const description = data.description;
        const max_token = data.max_token;
        const max_context_length = data.max_context_length;
        const version = data.version;
        const team = data.team;
        const developer = data.developer;
        const response_text = data.response;
        const api_key = data.API_KEY;
        console.log(`Status: ${status}`);
        console.log(`Model: ${model}`);
        console.log(`Description: ${description}`);
        console.log(`Max Token: ${max_token}`);
        console.log(`Max Context Length: ${max_context_length}`);
        console.log(`Version: ${version}`);
        console.log(`Team: ${team}`);
        console.log(`Developer: ${developer}`);
        console.log(`Response: ${response_text}`);
        console.log(`API Key: ${api_key}`);

        return res.status(200).json(data);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            return res.status(error.response.status).json({ error: error.response.data });
        } else if (error.request) {
            console.error('Error request:', error.request);
            return res.status(500).json({ error: 'No response received from API.' });
        } else {
            console.error('Error', error.message);
            return res.status(500).json({ error: error.message });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
