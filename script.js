// --- GEMBOK ANTI LONG PRESS/KLIK KANAN ---
window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
}, false);

const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

let allFilmsData = []; // Tempat nyimpen data asli mentahan

function nonton(id) {
    tg.openTelegramLink("https://t.me/AAReels_bot?start=nonton_" + id);
    tg.close();
}

// Fungsi utama buat ngerender kartu film ke layar
function renderFilms(dataArray) {
    const container = document.getElementById('app');
    container.innerHTML = ''; // Bersihin layar dulu

    if (dataArray.length === 0) {
        container.innerHTML = `<p style="grid-column: 1 / -1; text-align:center; color: #888; font-size: 14px; margin-top: 50px;">Film tidak ditemukan...</p>`;
        return;
    }
    
    dataArray.forEach(item => {
        const card = `
            <div class="card">
                <img src="${item.poster}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Poster'">
                <div class="info">
                    <h3>${item.judul}</h3>
                    <p>⭐ ${item.rating} | ${item.genre}</p>
                    <button onclick="nonton('${item.id}')" class="btn">NONTON SEKARANG</button>
                </div>
            </div>`;
        container.innerHTML += card;
    });
}

// Mesin penarik data (Ditingkatin buat nyimpen data global)
async function loadContent() {
    try {
        const urlBaru = 'data.json?v=' + new Date().getTime();
        const res = await fetch(urlBaru, { cache: 'no-store' });
        const data = await res.json();
        
        allFilmsData = data; // Simpen data asli ke global
        renderFilms(allFilmsData); // Tampilin semua film pas awal buka
        
    } catch (e) {
        document.getElementById('app').innerHTML = `<p style="grid-column: 1 / -1; text-align:center;">Gagal memuat data...</p>`;
    }
}

// --- FITUR BARU: Logika Kolom Pencarian (Search) ---
const searchInput = document.getElementById('searchBar');
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.toLowerCase().trim();
    
    if (keyword === "") {
        renderFilms(allFilmsData); // Kalau search bar kosong, balikin semua
        return;
    }

    // Filter berdasar Judul, Genre, atau Rating
    const filteredResults = allFilmsData.filter(film => {
        return film.judul.toLowerCase().includes(keyword) ||
               film.genre.toLowerCase().includes(keyword) ||
               film.rating.toString().includes(keyword);
    });
    
    renderFilms(filteredResults); // Tampilin hasil filter
});

loadContent();
