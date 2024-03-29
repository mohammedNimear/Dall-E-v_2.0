import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi} from 'openai'

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apikey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
    res.send('hola from DALL-E middleware !')
});

router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b46_json',
        })

        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({photo: image})
    } catch (err) {
        console.log(err)
    }
});

export default router;