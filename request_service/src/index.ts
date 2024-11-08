import express from "express"
import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";
const s3 = new S3({
    accessKeyId: "d44587c06cb25df3caf2cb8c64512e58",
    secretAccessKey: "264ebe9af90eac1c4e5ca8412db999920e1eaa1df3bafa0c912793e72a09f0bd",
    endpoint: "https://0583be5510082091fe24c5e95049dcd6.r2.cloudflarestorage.com"
})

const app=express()

app.get("/*",async (req,res)=>{
    //id.vercel.com
    const host = req.hostname;
    const id = host.split(".")[0];
    const filePath = req.path;

    const contents = await s3.getObject({
        Bucket: "vercel",
        Key: `dist/${id}${filePath}`
    }).promise();
    
    const type = filePath.endsWith("html") ? "text/html" : filePath.endsWith("css") ? "text/css" : "application/javascript"
    res.set("Content-Type", type);

    res.send(contents.Body);
})

app.listen(3001)