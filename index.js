const { Client } = require("saweria");
const axios = require("axios");

const client = new Client();
client.setStreamKey(process.env.SAWERIA_STREAM_KEY); // Mengambil dari Secrets

client.on("donations", async (donations) => {
    for (const donation of donations) {
        console.log(`Donasi: ${donation.donator} - ${donation.amount}`);
        try {
            await axios.post("https://saweria-webhook.linzee000.workers.dev", {
                donator: donation.donator,
                amount: donation.amount,
                message: donation.message,
                timestamp: Date.now()
            });
        } catch (e) {
            console.error("Gagal kirim ke Cloudflare");
        }
    }
});

client.on("connected", () => console.log("Saweria Terhubung!"));
