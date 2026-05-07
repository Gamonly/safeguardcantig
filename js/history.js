const historyList = document.getElementById("historyList");
const search = document.getElementById("search");

function loadHistory() {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    historyList.innerHTML = "";

    history.forEach((item) => {
        const card = document.createElement("div");
        card.className = "history-card";
        card.innerHTML = `
            <h2>${item.type}</h2>
            <h3>${item.risk}% — ${item.status}</h3>
            <p>${item.reason}</p>
            ${item.details?.location ? `<p><strong>Lokasi:</strong> ${item.details.location}</p>` : ''}
            <small>${item.time}</small>
        `;
        card.style.cursor = "pointer";
        card.onclick = () => showDetail(item);
        historyList.appendChild(card);
    });
}

function showDetail(item) {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Detail Analisa - ${item.type}</h2>
                <span class="close" onclick="this.parentElement.parentElement.parentElement.remove()">×</span>
            </div>
            <p><strong>Waktu:</strong> ${item.time}</p>
            <p><strong>Lokasi:</strong> ${item.details?.location || 'Tidak dicantumkan'}</p>
            <hr>
            <h3>Parameter Lingkungan:</h3>
            <ul>
                <li>Suhu: ${item.details?.temp || 0}°C</li>
                <li>Kelembapan: ${item.details?.humidity || 0}%</li>
                <li>Curah Hujan: ${item.details?.rainfall || 0} mm</li>
                <li>Tinggi Air: ${item.details?.water || 0} cm</li>
                <li>Getaran: ${item.details?.vibration || 0}</li>
            </ul>
            <p><strong>Kesimpulan:</strong> ${item.reason}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "flex";
}

function clearHistory() {
    if (confirm("Hapus semua riwayat?")) {
        localStorage.removeItem("history");
        loadHistory();
    }
}


search.addEventListener("input", () => {
    const term = search.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".history-card");

    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(term) ? "block" : "none";
    });
});

loadHistory();