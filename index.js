const { Client } = require("saweria");
const axios = require("axios");

// Mengambil Stream Key dari GitHub Secrets
const STREAM_KEY = process.env.SAWERIA_STREAM_KEY; 
// URL Worker Cloudflare kamu
const CLOUDFLARE_URL = "https://saweria-webhook.linzee000.workers.dev";

const client = new Client();
client.setStreamKey(STREAM_KEY);

client.on("donations", async (donations) => {
    for (const donation of donations) {
        console.log(`Donasi baru: ${donation.donator} - ${donation.amount}`);
        
        try {
            // Mengirim data ke Cloudflare
            await axios.post(CLOUDFLARE_URL, {
                donator: donation.donator,
                amount: donation.amount,
                message: donation.message,
                timestamp: Date.now()
            });
            console.log("Data berhasil dikirim ke Cloudflare");
        } catch (error) {
            console.error("Gagal kirim ke Cloudflare:", error.message);
        }
    }
});

client.on("connected", () => console.log("Berhasil terhubung ke Saweria!"));
client.on("error", (err) => console.error("Koneksi Error:", err));
