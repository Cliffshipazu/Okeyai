const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/hastebin', async (req, res) => {
    const data = req.query.upload;

    if (!data) {
        return res.status(400).json({ message: 'query upload string is missing' });
    }

    const url = 'https://hastebin.skyra.pw/documents';
    const headers = {
        'authority': 'hastebin.skyra.pw',
        'accept': 'application/json',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'text/plain',
        'origin': 'https://hastebin.skyra.pw',
        'referer': 'https://hastebin.skyra.pw/',
        'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-platform': '"Android"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
    };

    try {
        const response = await axios.post(url, data, { headers });
        const documentKey = response.data.key;

        if (documentKey) {
            const documentUrls = {
                status: "200",
                message: 'Document uploaded successfully',
                author: 'cliff',
                php: `https://hastebin.skyra.pw/${documentKey}.php`,
                csharp: `https://hastebin.skyra.pw/${documentKey}.csharp`,
                ts: `https://hastebin.skyra.pw/${documentKey}.ts`,
                css: `https://hastebin.skyra.pw/${documentKey}.css`,
                js: `https://hastebin.skyra.pw/${documentKey}.js`,  
                kotlin: `https://hastebin.skyra.pw/${documentKey}.kotlin`,  
            };
            res.status(200).json(documentUrls);
        } else {
            res.status(500).json({ message: 'skills issue Failed to upload the document' });
        }
    } catch (error) {
        res.status(500).json({ message: 'skills issue Error uploading the document', error: error.message });
    }
});

async function findUid(link) {
    try {
        const response = await axios.post(
            'https://seomagnifier.com/fbid',
            new URLSearchParams({
                'facebook': '1',
                'sitelink': link
            }),
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Cookie': 'PHPSESSID=0d8feddd151431cf35ccb0522b056dc6'
                }
            }
        );
        const id = response.data;
        if (isNaN(id)) {
            const html = await axios.get(link);
            const $ = cheerio.load(html.data);
            const el = $('meta[property="al:android:url"]').attr('content');
            if (!el) {
                throw new Error('UID not found');
            }
            const number = el.split('/').pop();
            return number;
        }
        return id;
    } catch (error) {
        throw new Error('An unexpected error occurred. Please try again.');
    }
}

app.get('/uid', async (req, res) => {
    const { fblink } = req.query;
    if (!fblink) {
        return res.status(400).json({ error: 'Missing fblink query parameter' });
    }

    try {
        const uid = await findUid(fblink);
        res.status(200).json({ uid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use(express.json());

app.get('/neo', async (req, res) => {
    const copilot = req.query.copilot;

    if (!copilot) {
        return res.status(400).json({ error: 'Copilot query parameter is required' });
    }

    const payload = {
        messages: [
            {
                id: "qucxWkG",
                content: copilot,
                role: "user"
            }
        ],
        id: "qucxWkG",
        enhancePrompt: false,
        useFunctions: false
    };

    try {
        const response = await axios.post('https://www.whiterabbitneo.com/api/chat', payload, {
            headers: {
                'authority': 'www.whiterabbitneo.com',
                'accept': '*/*',
                'accept-language': 'en-US,en;q=0.9',
                'content-type': 'text/plain;charset=UTF-8',
                'cookie': '__Host-next-auth.csrf-token=5c05f84fc8e29b1d30de0b9a69afae0ab7337b39fca6765993b31032feb3e1c3%7Ca6277e613bcbde13c942c643fd72291b39dee1596a03ca7695720a2ec2801fcd; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.whiterabbitneo.com%2F; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..IhuV0dMI3kx1juK3.J_3ZSOOA5hMRIYgw0R8-ztS9FoAmXNQppACPenVKAJg5N9V1fFdRvCDUxjU5jOt3Jflucfv-VtiXcgMLsqpA3zrV-av5ZsFVYa026xpIeKafAbIwIVqPDbVHySFRNMij-vegqq-2fS2C2w_ipN9P_-UJmy99qgOBJb1AD2UJY8ybicGbSFf1MqDRw7jXaWQM46j0XFybzYqUEckyEKI4KV6iYb7h__tgYyJgKtbshNCZ-3Q1LPQRvDsk0L8j9c_HhCWgclx3LBRt7YJvRk3E2gaOpG1o-GiVGQhi6G0i2JQnmhqpx5CxxeUVgsiSdAB9Oy9JqXLeoMPwgWKWfTqFXjTfM7jDrCbufh3YRmhirrFtGkXzqhDFnv5pWLLbM1OH6vewuLO7pseuED38z4JZdWlua4x4vWUUhe7an8hkMyMdxFMTZjR1SjiDsOZK0bV91mmSm8OXwYbOn4vLUCORBRUl33qikJgiKLc_XtwfLCyFgEacrx45Nwr7tsODfQ.mnmy_2XO3As6AmJ47jyJcw',
                'origin': 'https://www.whiterabbitneo.com',
                'referer': 'https://www.whiterabbitneo.com/',
                'sec-ch-ua': '"Not-A.Brand";v="99", "Chromium";v="124"',
                'sec-ch-ua-mobile': '?1',
                'sec-ch-ua-platform': '"Android"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
            }
        });

       res.status(200).json({cyberRabbit: response.data});
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.statusText });
        } else if (error.request) {

            res.status(500).json('Suspended by owner');
        } else {

            res.status(500).json({ error: 'Error limit request' });
        }
    }
});

const blackbox = require('@ozrageharm/blackbox-ai');

app.get('/blackbox', async (req, res) => {
    const question = req.query.question;

    if (!question) {
        return res.status(400).json({ error: 'Question query parameter is required' });
    }

    try {
        const output = await blackbox.chat(question, 'index.js');
        res.status(200).json({ blackbox: output.data });
    } catch (error) {
        res.status(500).json({ error: 'Error skills issue', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});