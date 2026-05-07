const map = L.map('map').setView([-7.2575, 112.7521], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let currentMarker = null;
const locationInput = document.getElementById("locationInput");
const suggestions = document.getElementById("suggestions");

locationInput.addEventListener("input", async () => {
    const query = locationInput.value.trim();
    if (query.length < 3) {
        suggestions.innerHTML = "";
        return;
    }
    try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6`);
        const data = await response.json();
        suggestions.innerHTML = "";
        data.features.forEach(place => {
            const item = document.createElement("div");
            item.classList.add("suggestion-item");
            item.innerHTML = `${place.properties.name || 'Lokasi'} <small>${place.properties.city || ''}</small>`;
            item.addEventListener("click", () => {
                const lat = place.geometry.coordinates[1];
                const lon = place.geometry.coordinates[0];
                locationInput.value = place.properties.name || 'Lokasi Terpilih';
                suggestions.innerHTML = "";
                map.setView([lat, lon], 16);
                if (currentMarker) map.removeLayer(currentMarker);
                currentMarker = L.marker([lat, lon]).addTo(map).bindPopup(`<b>${place.properties.name}</b>`).openPopup();
            });
            suggestions.appendChild(item);
        });
    } catch (e) {
        suggestions.innerHTML = "<div class='suggestion-item'>Gagal mencari lokasi</div>";
    }
});

document.addEventListener("click", (e) => {
    if (!locationInput.contains(e.target)) suggestions.innerHTML = "";
});

function validateInputs() {
    const location = locationInput.value.trim();
    if (!location) {
        alert("⚠️ Lokasi harus diisi!");
        locationInput.focus();
        return false;
    }
    const inputs = ['temperature', 'humidity', 'rainfall', 'water', 'vibration'];
    let filled = 0;
    inputs.forEach(id => {
        if (document.getElementById(id).value.trim() !== "") filled++;
    });
    if (filled < 3) {
        alert("⚠️ Harap isi minimal 3 parameter lingkungan.");
        return false;
    }
    return true;
}

function analyzeData() {
    if (!validateInputs()) return;

    const temp = parseFloat(document.getElementById("temperature").value) || 0;
    const humidity = parseFloat(document.getElementById("humidity").value) || 0;
    const rainfall = parseFloat(document.getElementById("rainfall").value) || 0;
    const water = parseFloat(document.getElementById("water").value) || 0;
    const vibration = parseFloat(document.getElementById("vibration").value) || 0;
    const location = locationInput.value.trim();

    let fireRisk = 0, floodRisk = 0, earthquakeRisk = 0;

    // Logika lebih halus
    if (temp >= 30) fireRisk += Math.min((temp - 28) * 2.8, 70);
    if (humidity <= 40) fireRisk += Math.min((45 - humidity) * 1.3, 40);

    if (rainfall >= 60) floodRisk += Math.min((rainfall - 50) * 0.75, 65);
    if (water >= 35) floodRisk += Math.min((water - 25) * 1, 60);

    if (vibration >= 18) earthquakeRisk += Math.min((vibration - 15) * 2.8, 80);

    fireRisk = Math.min(Math.round(fireRisk), 100);
    floodRisk = Math.min(Math.round(floodRisk), 100);
    earthquakeRisk = Math.min(Math.round(earthquakeRisk), 100);

    const maxRisk = Math.max(fireRisk, floodRisk, earthquakeRisk);

    let disaster = "AMAN";
    let risk = maxRisk;
    let reason = "Kondisi saat ini relatif aman.";
    let status = "AMAN";

    if (maxRisk >= 15) {
        if (fireRisk === maxRisk) {
            disaster = "KEBAKARAN";
            reason = "Suhu tinggi dan kelembapan rendah meningkatkan risiko kebakaran.";
        } else if (floodRisk === maxRisk) {
            disaster = "BANJIR";
            reason = "Curah hujan dan tinggi air menunjukkan potensi banjir.";
        } else if (earthquakeRisk >= 20) {
            disaster = "GEMPA";
            reason = "Getaran tanah terdeteksi oleh sistem AI.";
        }

        if (risk <= 30) status = "WASPADA RINGAN";
        else if (risk <= 65) status = "WASPADA";
        else status = "BAHAYA";
    }

    saveHistory(disaster, risk, status, reason, {temp, humidity, rainfall, water, vibration, location});

    document.getElementById("scanner").style.display = "block";
    const texts = ["Scanning environmental conditions...", "Processing AI prediction...", "Generating disaster simulation...", "Analyzing risk percentage..."];
    let i = 0;
    const interval = setInterval(() => {
        document.getElementById("scanText").innerHTML = texts[i];
        i = (i + 1) % texts.length;
    }, 800);

    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("scanner").style.display = "none";
        document.getElementById("result").style.display = "block";

        document.getElementById("predictionText").innerHTML = `
            <h2>RISIKO ${disaster}</h2>
            <h1>${risk}%</h1>
            <h3>STATUS : ${status}</h3>
            <p>${reason}</p>
        `;

        document.getElementById("progressBar").style.width = risk + "%";
        createChart(fireRisk, floodRisk, earthquakeRisk);
    }, 3500);
}

function saveHistory(type, risk, status, reason, details) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.unshift({ type, risk, status, reason, details, time: new Date().toLocaleString('id-ID') });
    localStorage.setItem("history", JSON.stringify(history.slice(0, 50)));
}