require('dotenv').config()
const express = require("express");
const app= express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const {Leopard} = require("@picovoice/leopard-node");

const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

connection();
app.use(express.json());



app.post("/api/transcribe", async (req, res) => {
    try {
        const link = req.body.link;

        if (!link) {
            return res.status(400).json({ error: "Missing 'link' parameter in the request body." });
        }
        const accessKey = "Your-Access-Key";
        const handle = new Leopard(accessKey);

        const remoteAudioFileUrl = link;

        const response = await axios.get(remoteAudioFileUrl, { responseType: "arraybuffer" });
        const audioData = response.data;

        const tempAudioFilePath = path.join(__dirname, "temp_audio.mp3");
        fs.writeFileSync(tempAudioFilePath, audioData);

        const result = handle.processFile(tempAudioFilePath);

        res.json({status:"success",transcript: result.transcript });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred during transcription." });
    }
});
app.listen(3002, function ()
{
    console.log("connected to server :!");
});
