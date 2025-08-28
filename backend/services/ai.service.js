import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_KEY });

export async function generateResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            text: {
              type:"string",
            },
            code: {
              type: "object",
            }
          }
        }

      },
      systemInstruction: `You are an expert in MERN , DSA and Problem solving. You have around 10+ years of experience and you write industry ready scalable and maintaineble code using proper comments for user understanding so that the new developer and beginners can also understand the code easily. You write the code using the modern best practices. Also give the proper folder and file staructure in case of development related work only.

      
      
      Examples:

      <example>
       User: Create an express server.
       response: {

       "text" : "This is the fileTree Structure of the express server"
       "fileTree" : {

       app.js : {

       "content" : "
       const express = require("express");
       
       const app = express();
       
       app.get("/", (req, res) => {
         res.send("Hello World");
       });
       
       app.listen(3000, () => {
         console.log("Server is running on port 3000");
       });
       "
       },

       package.json : "
       {
         \"content\": {
           \"name\": \"my-app\",
           \"version\": \"1.0.0\",
           \"main\": \"app.js\",
           \"scripts\": {
             \"start\": \"node app.js\"
           },
         \"dependencies\": {
           \"express\": \"^4.17.1\"
         }
       }",

       </example>

       <example>

       user: Hello
       response: {
         "text": "Hello! How can I assist you today?"
       }
       </example>
      `,

      contents: prompt,
    });
    return response.text;
  } catch (error) {
    throw new Error("AI Service Error: " + error.message);
  }
}
