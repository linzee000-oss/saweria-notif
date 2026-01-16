# Saweria Notif Roblox 🚀

Sistem notifikasi donasi Saweria secara real-time untuk game Roblox. Menggunakan GitHub Actions sebagai listener dan Cloudflare Workers sebagai bridge.

## 🔥 Fitur Utama
* **Direct Data**: Mengambil data donasi langsung dari Saweria menggunakan Stream Key.
* **Cloudflare Bridge**: Webhook stabil melalui Cloudflare Worker.
* **Stable Polling**: Sistem pengambilan data yang stabil di sisi Roblox.
* **Auto UI**: Notifikasi muncul otomatis di layar pemain.
* **Queue System**: Donasi tidak akan bertumpuk (muncul satu per satu).

## 🏗️ Arsitektur
1. **GitHub Actions**: Menjalankan `index.js` secara otomatis untuk memantau donasi.
2. **Cloudflare Workers**: Menerima data dari GitHub dan menyimpannya sementara.
3. **Roblox Server**: Melakukan HTTP Get ke Cloudflare setiap 5 detik untuk cek donasi baru.

## 🛠️ Cara Setup
1. **Cloudflare**: 
   - Buat Worker di `saweria-webhook.linzee000.workers.dev`.
   - Tambahkan variabel `SAWERIA_STREAM_KEY` di Settings.
2. **GitHub Secrets**: 
   - Masukkan Stream Key `8d76d0dbc7d6f6cfb2eebf25529b993c` ke Repository Secrets dengan nama `SAWERIA_STREAM_KEY`.
3. **Roblox**: 
   - Gunakan `HttpService` untuk memanggil URL Worker kamu.

## 📝 Catatan Keamanan
Jangan pernah membagikan Stream Key kamu di dalam file kode publik. Selalu gunakan **GitHub Secrets** atau **Cloudflare Secrets**.
