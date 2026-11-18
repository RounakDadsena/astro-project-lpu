// ================= ZODIAC DATA =================
const zodiacSigns = [
    { name: "Aries",       symbol: "♈", dates: "Mar 21 - Apr 19", element: "Fire",  trait: "Brave, energetic and a natural leader." },
    { name: "Taurus",      symbol: "♉", dates: "Apr 20 - May 20", element: "Earth", trait: "Patient, reliable and loves comfort." },
    { name: "Gemini",      symbol: "♊", dates: "May 21 - Jun 20", element: "Air",   trait: "Curious, talkative and quick learner." },
    { name: "Cancer",      symbol: "♋", dates: "Jun 21 - Jul 22", element: "Water", trait: "Caring, emotional and protective." },
    { name: "Leo",         symbol: "♌", dates: "Jul 23 - Aug 22", element: "Fire",  trait: "Confident, generous and loves attention." },
    { name: "Virgo",       symbol: "♍", dates: "Aug 23 - Sep 22", element: "Earth", trait: "Practical, hardworking and detail lover." },
    { name: "Libra",       symbol: "♎", dates: "Sep 23 - Oct 22", element: "Air",   trait: "Fair, social and loves balance." },
    { name: "Scorpio",     symbol: "♏", dates: "Oct 23 - Nov 21", element: "Water", trait: "Passionate, mysterious and determined." },
    { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21", element: "Fire",  trait: "Adventurous, honest and optimistic." },
    { name: "Capricorn",   symbol: "♑", dates: "Dec 22 - Jan 19", element: "Earth", trait: "Disciplined, ambitious and responsible." },
    { name: "Aquarius",    symbol: "♒", dates: "Jan 20 - Feb 18", element: "Air",   trait: "Creative, independent and humanitarian." },
    { name: "Pisces",      symbol: "♓", dates: "Feb 19 - Mar 20", element: "Water", trait: "Kind, artistic and very intuitive." }
];

const predictions = [
    "Today brings a new opportunity at work. Stay alert!",
    "A long lost friend may contact you soon.",
    "Good day for studies. Your focus will be strong.",
    "Money matters look positive. Avoid unnecessary spending.",
    "Someone special is thinking about you.",
    "Take care of your health and drink more water.",
    "Travel is on the cards. Pack your bags!",
    "Your hard work will finally be noticed."
];

const luckyColors = ["Red", "Blue", "Green", "Yellow", "White", "Purple", "Orange", "Pink"];


// ================= SHOW ZODIAC CARDS =================
function loadZodiacCards() {
    const grid = document.getElementById("zodiacGrid");

    for (let i = 0; i < zodiacSigns.length; i++) {
        const sign = zodiacSigns[i];
        grid.innerHTML += `
            <div class="zodiac-card">
                <div class="symbol">${sign.symbol}</div>
                <h3>${sign.name}</h3>
                <small>${sign.dates} | ${sign.element}</small>
                <p>${sign.trait}</p>
            </div>
        `;
    }
}


// ================= FILL DROPDOWNS =================
function loadDropdowns() {
    const sign1 = document.getElementById("sign1");
    const sign2 = document.getElementById("sign2");

    zodiacSigns.forEach(function (sign) {
        sign1.innerHTML += `<option>${sign.name}</option>`;
        sign2.innerHTML += `<option>${sign.name}</option>`;
    });
}


// ================= FIND ZODIAC SIGN FROM DATE =================
function getZodiacSign(day, month) {
    if ((month == 3 && day >= 21) || (month == 4 && day < 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    return "Unknown";
}


// ================= CALCULATE AGE =================
function getAge(birthDate) {
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
}


// ================= HOROSCOPE BUTTON =================
function findHoroscope() {
    const name = document.getElementById("userName").value;
    const dobValue = document.getElementById("dob").value;
    const resultBox = document.getElementById("horoscopeResult");

    if (dobValue == "") {
        alert("Please select your date of birth!");
        return;
    }

    const dob = new Date(dobValue);
    const day = dob.getDate();
    const month = dob.getMonth() + 1;

    const sign = getZodiacSign(day, month);
    const age = getAge(dob);

    // pick prediction based on today's date so it changes daily
    const todayIndex = new Date().getDate() % predictions.length;
    const prediction = predictions[todayIndex];
    const luckyNumber = (day + month) % 9 + 1;
    const luckyColor = luckyColors[month % luckyColors.length];

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>Hello ${name}! You are a ${sign}</h3>
        <p><b>Age:</b> ${age} years</p>
        <p><b>Today's Prediction:</b> ${prediction}</p>
        <p><b>Lucky Number:</b> ${luckyNumber}</p>
        <p><b>Lucky Color:</b> ${luckyColor}</p>
    `;
}


// ================= LOVE MATCH BUTTON =================
function checkMatch() {
    const s1 = document.getElementById("sign1").value;
    const s2 = document.getElementById("sign2").value;
    const resultBox = document.getElementById("matchResult");

    const percent = Math.floor(Math.random() * 100) + 1;

    let message = "";
    if (percent > 75) {
        message = "Made for each other!";
    } else if (percent > 50) {
        message = "Good match, just keep communicating.";
    } else if (percent > 25) {
        message = "Needs some effort from both sides.";
    } else {
        message = "Stars are not aligned... but love can win!";
    }

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>${s1} + ${s2} = ${percent}%</h3>
        <p>${message}</p>
    `;
}


// ================= BOOKING FORM =================
document.getElementById("bookingForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("cName").value;
    const phone = document.getElementById("cPhone").value;
    const type = document.getElementById("cType").value;
    const resultBox = document.getElementById("bookingResult");

    resultBox.style.display = "block";
    resultBox.innerHTML = `
        <h3>Booking Confirmed!</h3>
        <p>Thank you ${name}. Our astrologer will call you on <b>${phone}</b> for your <b>${type}</b> consultation.</p>
    `;

    this.reset();
});


// ================= RUN ON PAGE LOAD =================
loadZodiacCards();
loadDropdowns();
