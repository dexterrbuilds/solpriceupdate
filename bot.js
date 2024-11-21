const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

// Config
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const TOKEN_ADDRESS = 'So11111111111111111111111111111111111111112'; // Replace with Solana's token address
const PRICE_API_URL = `https://api.dexscreener.com/latest/dex/search?q=${TOKEN_ADDRESS}`;

// Init bot
const bot = new Telegraf(BOT_TOKEN);

// fetch Solana price
async function getSolanaPrice() {
    try {
        const response = await axios.get(PRICE_API_URL);
        const markets = response.data.pairs;

        // Example: Fetch price from the first pair
        const price = parseFloat(markets[0].priceNative);
        return price;
    } catch (error) {
        console.error('Error fetching Solana price:', error.message);
        return null;
    }
}

// send price update
async function sendPriceUpdate() {
    const price = await getSolanaPrice();
    if (price) {
        const message = `🌟 *Solana Price Update* 🌟\n\n💰 1 SOL = $${price.toFixed(2)} USD`;
        await bot.telegram.sendMessage(CHAT_ID, message, { parse_mode: 'Markdown' });
        console.log('Price update sent.');
    }
}

// Start bot
(async () => {
    bot.launch();
    console.log('Bot started.');

    // Update price every 3 minutes
    setInterval(() => {
        sendPriceUpdate();
    }, 180000);
})();

const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Telegram bot is running.\n");
}).listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
