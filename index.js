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
                id: "qrl05dw",
                content: copilot,
                role: "user"
            }
        ],
        id: "qrl05dw",
        enhancePrompt: false,
        useFunctions: false
    };

    try {
        const response = await axios.post('https://www.whiterabbitneo.com/api/chat', payload, {
            headers: {
                'Accept-Encoding':
'gzip, deflate, br, zstd',
                'Accept-Language':
'en-US,en;q=0.9',
                'Content-Type': 'text/plain;charset=UTF-8',
                'Cookie': 
                    '__Host-next-auth.csrf-token=12cc33a0ac7ae7fd8a82e6c582f83db80cf845e4f70b65f4fbed0bd47372b3c1%7C403c14cda39ebd98f5adbabb206f55dc7f34739541d16f764e90fe44bba6de68; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.whiterabbitneo.com; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..A5U0FA_kBTBqLs-u.wQoSskbTb60RDQz1vdCoaKltFGLaz7OA-0Ca_gFeDmh3bzVZkxxHeT3C5ux1oTVWmMHBv30Kh013IRUMk6oTO6CVUzkmbRevQWXNQo1kxX2mwZdsaHAOsokOjDpgW6sQW0OxkPHFBeHNqlYC-1a7MoVnWIlqgtFGRQbtLTJcFnuYTzxB9x1WXPvNi8VZJmoBU3WXKsEdv5xaf8RI6gYYg_cXWLvr9ccUox5X8OVL4Bqwb66h0XbthBSeMrNxQT8cyRFXUK118OStGuGPtLMKodRpLT6K3htlL6iyQN4hHK92Nyz2NUcN0dK6_vP6jRackJOq8ZtRkreRvNDgo0USh1foDZzSNvs4Jc-7GQOTql9EOw0JcA8pdu3tnxL77nOR49TQrXNaAjHs_g.QaTxuEBBv1Dd_AT9rYdPCA',
                'Origin':
                'https://www.whiterabbitneo.com',
                'Priority':
                'u=1, i',
                'Referer':               'https://www.whiterabbitneo.com/',
                'Sec-Ch-Ua-Mobile':
                '?0',
                'Sec-Ch-Ua-Platform':
                "Windows",
                'Sec-Fetch-Dest':
                'empty',
                'Sec-Fetch-Mode':
                'cors',
                'Sec-Fetch-Site':
                'same-origin',
                'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});