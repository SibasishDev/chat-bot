const  { Configuration, OpenAIApi } = require("openai");
const config = require("../config/config");

class AIController{
    constructor(){
        this.openAi = new OpenAIApi(new Configuration({
            apiKey: config.OPENAI_API_KEY,
          }));
    }

    getAnswers = async (question) => {
        try{
        const response = await this.openAi.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }],
          temperature: 0.9,
          max_tokens: 150,
          top_p: 1,
          frequency_penalty: 0.0,
          presence_penalty: 0.6,
          stop: ["Human:", " AI:"],
        });
        const messageArray = response.data.choices[0].message.content
          .split("\n")
          .filter((line) => line !== "" && !line.startsWith("```"));
        return messageArray;
      }catch(e){
        console.log(e.message);
        return [];
      }
    }
}

module.exports = new AIController();