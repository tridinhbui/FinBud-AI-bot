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
      const OPENAI_API_KEY = "sk-proj-CEwo8ToEoICRHxYFos29T3BlbkFJgEx01EqwIWZ0I1LZC6SH";
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: prompt}],
          temperature: 0.7
        })
      });

      // Return response content
      const responseData = await response.json();
      return responseData.choices[0]?.message?.content || "";

    } catch (error) {
      console.error('Error in fetching or generating response:', error);
      throw error;
    }
  }
  

/**
 * Defines a term using openai.
 * @param {string} str - The term to define.
 * @returns {Promise<string>} - A promise that resolves with the AI-generated text about the term.
 */
export async function gptAPICallDefine(str) {
  try {
    const prompt = `Explain ${str} to me as if I'm 15.`;

    // Now, call the GPT API with the prompt
    const OPENAI_API_KEY = "sk-proj-CEwo8ToEoICRHxYFos29T3BlbkFJgEx01EqwIWZ0I1LZC6SH";
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
        temperature: 0.7
      })
    });

    // Return response content
    const responseData = await response.json();
    return responseData.choices[0]?.message?.content || "";

  } catch (error) {
    console.error('Error in fetching or generating response:', error);
    throw error;
  }
}
