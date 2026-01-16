const { Client } = require("saweria");
const axios = require("axios");

const client = new Client();
// Masukkan STREAM KEY dari overlay Saweria di GitHub Secrets
const STREAM_KEY = process.env.SAWERIA_STREAM_KEY; 
const CLOUDFLARE_URL = "https://saweria-webhook-proxy.username.workers.dev";

client.setStreamKey(STREAM_KEY);

client.on("donations", async (donations) => {
  for (const donation of donations) {
    console.log(`Donasi dari ${donation.donator} terdeteksi!`);

    try {
      // Mengirim data ke Cloudflare
      await axios.post(CLOUDFLARE_URL, {
        donator: donation.donator,
        amount: donation.amount,
        message: donation.message
      });
      console.log("Berhasil diteruskan ke Cloudflare.");
    } catch (error) {
      console.error("Gagal mengirim ke Cloudflare:", error.message);
    }
  }
});

client.on("connected", () => console.log("Terhubung ke Saweria!"));
