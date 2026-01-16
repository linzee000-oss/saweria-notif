const { Client } = require("saweria");
const axios = require("axios");

const client = new Client();
// Mengambil Stream Key dari GitHub Secrets
client.setStreamKey(process.env.SAWERIA_STREAM_KEY);

client.on("donations", async (donations) => {
    for (const donation of donations) {
        console.log(`Donasi baru: ${donation.donator} - ${donation.amount}`);
        try {
            // URL Cloudflare kamu
            await axios.post("https://saweria-webhook.linzee000.workers.dev", {
                donator: donation.donator,
                amount: donation.amount,
                message: donation.message,
                timestamp: Date.now()
            });
        } catch (error) {
            console.error("Gagal kirim ke Cloudflare:", error.message);
        }
    }
});

client.on("connected", () => console.log("Berhasil terhubung ke Saweria!"));
