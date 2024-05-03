// src/services/gptServices.js

/**
 * Fetches stock data from Alpha Vantage and then uses it to generate a contextual response from a GPT API.
 * @param {string} stockSymbol - The stock symbol to fetch data for and discuss.
 * @returns {Promise<string>} - A promise that resolves with the AI-generated text about the stock.
 */
export async function gptAPICall(stockSymbol) {
    try {
      // First, fetch stock data from Alpha Vantage
      const apiKey = 'LUVO8ME3IQXIVHMP';
      const stockUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${apiKey}`;
      const stockResponse = await fetch(stockUrl);
      const stockData = await stockResponse.json();
  
      // Extract the relevant data to form a prompt for the GPT model
      const price = stockData['Global Quote']['05. price'];
      const prompt = `Generate a detailed analysis of ${stockSymbol} which currently trades at $${price}.`;
  
      // Now, call the GPT API with the prompt
      const gptResponse = await fetch('https://api.gptservice.com/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer your_gpt_api_key_here' // Ensure to replace with your GPT API key
        },
        body: JSON.stringify({ prompt: prompt, max_tokens: 150 })
      });
  
      const gptData = await gptResponse.json();
      return gptData.choices[0].message.content; // Assuming the GPT API returns choices in this structure
    } catch (error) {
      console.error('Error in fetching or generating response:', error);
      throw error;
    }
  }
  