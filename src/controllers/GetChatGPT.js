const axios = require('axios');
const apiKey = process.env.OPENAI_TOKEN;

exports.createChatGPTAnswer = async (req, res) => {
    try {
        const { addedContext, userMessage } = req.body;

        if (userMessage.trim() === '') {
            console.error("Empty message sent - Bad Request");
            res.status(400).end();
            return;
        };

        const url = 'https://api.openai.com/v1/chat/completions';
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const data = {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: addedContext }, { role: 'user', content: userMessage }]
        };

        console.log({ addedContext, userMessage })

        const response = await axios.post(url, data, { headers });
        res.status(201).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response.status || 500).end();
    }
};