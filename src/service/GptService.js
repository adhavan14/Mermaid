import axios from "axios"

export const getCodeFromPrompt = async (prompt) => {
    const api_key = 'api_key'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`

    const body = {"contents": [
        {"role":"user",
         "parts":[{
           "text": "You are a helpful assistant that converts user input into Mermaid.js diagram code."}]},
        {"role": "model",
         "parts":[{
           "text": "Please provide your input"}]},
        {"role":"user",
         "parts":[{
           "text": `Generate a Mermaid.js diagram code with correct syntax for the following input: ${prompt}`}]}]}

    // const body = {"contents":
    //     [{"parts":[{"text": `Generate a Mermaid.js diagram code with correct syntax for the following input: ${prompt}`}]}]}


    const response = await axios.post(url, body)
    return response.data.candidates[0].content.parts[0].text.replace(/```mermaid|```/g, '');
}