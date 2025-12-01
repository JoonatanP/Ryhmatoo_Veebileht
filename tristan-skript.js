// darkmode nupp kood : https://www.w3schools.com/howto/howto_js_toggle_dark_mode.asp
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    toggleBtn.textContent = document.body.classList.contains("dark-mode")
        ? "☀️"
        : "🌙";
});
// Suvaline fakt minu kohta. Kood:https://stackoverflow.com/a // Posted by Harshana
//faktid minu kohta
var facts = [
    "Olen sõitnud kuumaõhupalliga", 
    'Lõpetasin gümnaasiumi kuldmedaliga',
    'Mu õde õppib samuti Tartus informaatikat',
    'Lemmik arvutimäng on Minecraft'
];

function randomlist(list) {
    // Leian juhusliku täisarvu 
    var x = Math.floor(Math.random() * list.length);
    return list[x];
}

// nupu vajutusel:
function generateFacts() {
    var randomFact = randomlist(facts); 
    
    // 3. Kuvan fakti kohal here .
    document.getElementById('here').innerHTML = randomFact;
}

