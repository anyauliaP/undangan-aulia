// NAVIGATION / SLIDES
const coverScreen = document.getElementById("buka_cover");
const coupleScreen = document.getElementById("couple-screen");
const mainScreen = document.getElementById("main-invitation");

const tombolBuka = document.getElementById("btn-buka_Undangan");
const tombolLanjut = document.getElementById("btn-lanjut_doa");

tombolBuka.addEventListener("click", function () {
    coverScreen.classList.add("hidden");
    coupleScreen.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
});

tombolLanjut.addEventListener("click", function () {
    coupleScreen.classList.add("hidden");
    mainScreen.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
});


// RSVP
let statusKehadiran = "";

function pilihKehadiran(status) {
    statusKehadiran = status;
    const form = document.getElementById("rsvp_form");
    const pendamping = document.getElementById("bagian-pendamping");
    const statusPilihan = document.getElementById("status-pilihan");

    form.hidden = false;
    statusPilihan.textContent = "Anda Memilih: " + status;

    // Pendamping hanya ditampilkan jika tamu hadir
    pendamping.hidden = status !== "Hadir";

    // Tandai tombol yang dipilih
    document.querySelectorAll(".rsvp-option").forEach(tombol => {
        tombol.classList.remove("terpilih");
    });

    const tombolDipilih = [...document.querySelectorAll(".rsvp-option")]
        .find(tombol => tombol.textContent.includes(status));

    if (tombolDipilih) {
        tombolDipilih.classList.add("terpilih");
    }
}

document.getElementById("rsvp_form").addEventListener("submit", function(e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapan").value.trim();
    const jumlahPendamping = statusKehadiran === "Hadir" ? Number(document.getElementById("pendamping").value) : 0;

    if (!statusKehadiran || !nama || !ucapan) {
        alert("Mohon lengkapi data terlebih dahulu.");
        return;
    }

    // Buat elemen ucapan
    const kartu = document.createElement("div");
    kartu.className = "ucapan-item";

    const judul = document.createElement("strong");
    judul.textContent = nama;

    const status = document.createElement("div");
    status.textContent = statusKehadiran;

    const pesan = document.createElement("p");
    pesan.textContent = ucapan;

    kartu.append(judul, status);

    if (statusKehadiran === "Hadir") {
        const jumlah = document.createElement("div");
        jumlah.textContent = "Jumlah pendamping: " + jumlahPendamping + " orang";
        kartu.appendChild(jumlah);
    }

    kartu.appendChild(pesan);
    document.getElementById("isi-ucapan").prepend(kartu);

    alert("Pesan berhasil dikirim!");

    this.reset();
    this.hidden = true;
    document.getElementById("bagian-pendamping").hidden = true;
    document.getElementById("status-pilihan").textContent = "";

    document.querySelectorAll(".rsvp-option").forEach(tombol => {
        tombol.classList.remove("terpilih");
    });
    statusKehadiran = "";
});


// COUNTDOWN
const weddingDate = new Date("2026-11-06T15:00:00+07:00").getTime();

function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    const daysElement = document.getElementById("cd-days");
    const hoursElement = document.getElementById("cd-hours");
    const minutesElement = document.getElementById("cd-minutes");
    const secondsElement = document.getElementById("cd-seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;

    if (distance <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);


// COPY REKENING/ALAMAT
function salinTeks(teks) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(teks)
        .then(() => {
            document.getElementById("gift-notification").textContent = "Berhasil disalin! 🤍";
        })
        .catch(() => {
            document.getElementById("gift-notification").textContent = "Gagal menyalin.";
        });
    } else {
        document.getElementById("gift-notification").textContent = "Silakan salin teks secara manual: " + teks;
    }
}

function salinRekening() {
    const rekening = document.getElementById("nomor-rekening").textContent.trim();
    salinTeks(rekening);
}

function salinAlamat() {
    const alamat = "Nama Penerima: Saufiq & Lia, Alamat: Jl. Mekarsaluyu No.19, Bandung";
    salinTeks(alamat);
}


// MUSIK
const backsound = document.getElementById("backsound");
const tombolMusik = document.getElementById("tombol-musik");

tombolMusik.addEventListener("click", async function () {
    const ikon = tombolMusik.querySelector("i");
    if (backsound.paused) {
        try {
            await backsound.play();

            ikon.className = "bi bi-disc";
            tombolMusik.classList.add("playing");
            tombolMusik.setAttribute("aria-label", "Hentikan musik");
        } catch (error) {
            console.log("Musik gagal diputar. Periksa lokasi file lagu.mp3.");
        }
    } else {
        backsound.pause();
        ikon.className = "bi bi-music-note-beamed";
        tombolMusik.classList.remove("playing");
        tombolMusik.setAttribute("aria-label", "Putar musik");
    }
});