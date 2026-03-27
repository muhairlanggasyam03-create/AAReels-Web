// --- PLUGIN HALAMAN (PAGINATION) ---
let currentPage = 1;
const itemsPerPage = 6; // Jumlah film per halaman (bisa diganti)

function tampilkanHalaman(dataArray, page) {
    currentPage = page;
    
    // Potong data sesuai halaman
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = dataArray.slice(start, end);

    // Render kartu film ke layar
    renderFilms(paginatedData);

    // Render tombol navigasi
    renderTombolHalaman(dataArray.length, dataArray);
}

function renderTombolHalaman(totalItems, dataArray) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    let paginationContainer = document.getElementById('pagination-container');

    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.id = 'pagination-container';
        paginationContainer.className = 'pagination';
        document.getElementById('app').after(paginationContainer);
    }

    paginationContainer.innerHTML = ''; 
    if (totalPages <= 1) return; 

    // Tombol Previous [<]
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '❮';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => tampilkanHalaman(dataArray, currentPage - 1);
    paginationContainer.appendChild(prevBtn);

    // Tombol Angka [1] [2] [3]
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.innerText = i;
        if (i === currentPage) pageBtn.classList.add('active');
        pageBtn.onclick = () => tampilkanHalaman(dataArray, i);
        paginationContainer.appendChild(pageBtn);
    }

    // Tombol Next [>]
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '❯';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => tampilkanHalaman(dataArray, currentPage + 1);
    paginationContainer.appendChild(nextBtn);
}
