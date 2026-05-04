// translations is loaded from i18n.js

let currentLang = 'fr';
let chart = null;

// --- Helper Functions ---

// Formats number to string with spaces (e.g., 1000 -> 1 000)
function formatNumber(val) {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Cleans string to number (removes spaces)
function cleanNumber(str) {
    return parseFloat(str.replace(/\s/g, '')) || 0;
}

// --- core Logic ---

function calculate() {
    const age = parseFloat(document.getElementById('currentAge').value) || 0;
    const initial = cleanNumber(document.getElementById('initialCapital').value);
    const monthly = cleanNumber(document.getElementById('monthlySavings').value);
    const rate = parseFloat(document.getElementById('annualReturn').value) || 0;
    const startDate = new Date(document.getElementById('startDate').value);
    
    const target = 1000000;
    const monthlyRate = (rate / 100) / 12;
    
    let balance = initial;
    let months = 0;
    let dataPoints = [initial];
    let labels = [0];

    while (balance < target && months < 1200) {
        balance = balance * (1 + monthlyRate) + monthly;
        months++;
        if (months % 12 === 0) {
            dataPoints.push(Math.round(balance));
            labels.push(months / 12);
        }
    }

    const t = translations[currentLang];

    if (balance >= target) {
        const years = months / 12;
        const resDate = new Date(startDate);
        resDate.setMonth(startDate.getMonth() + months);

        document.getElementById('targetDate').innerText = resDate.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { year: 'numeric', month: 'long' });
        document.getElementById('targetAge').innerText = `${Math.floor(age + years)} ${t.yearLabel}`;
        document.getElementById('duration').innerText = `${Math.floor(years)} ${t.yearLabel} & ${months % 12} ${t.monthLabel}`;
        
        document.getElementById('results').classList.remove('hidden');
        document.getElementById('impossibleMessage').classList.add('hidden');
    } else {
        document.getElementById('results').classList.add('hidden');
        document.getElementById('impossibleMessage').classList.remove('hidden');
    }

    updateChart(labels, dataPoints);
}

function updateChart(labels, data) {
    const ctx = document.getElementById('growthChart').getContext('2d');
    if (chart) chart.destroy();
    
    const isDark = document.documentElement.classList.contains('dark');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: translations[currentLang].chartLabel,
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.3,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    ticks: { color: isDark ? '#94a3b8' : '#64748b' },
                    grid: { color: isDark ? '#1e293b' : '#e2e8f0' }
                },
                x: { 
                    ticks: {
                        color: isDark ? '#94a3b8' : '#64748b',
                        maxRotation: 0,
                        maxTicksLimit: 8
                    },
                    grid: { display: false }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// --- Event Handlers ---

// Format input while typing
['initialCapital', 'monthlySavings'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input', (e) => {
        let cursor = e.target.selectionStart;
        let originalLen = e.target.value.length;
        let raw = e.target.value.replace(/\s/g, '');
        if(!isNaN(raw)) {
            e.target.value = formatNumber(raw);
            // Adjust cursor position
            let newLen = e.target.value.length;
            e.target.setSelectionRange(cursor + (newLen - originalLen), cursor + (newLen - originalLen));
        }
        calculate();
    });
});

// Other inputs
['currentAge', 'annualReturn', 'startDate'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        document.getElementById('returnVal').innerText = document.getElementById('annualReturn').value + '%';
        calculate();
    });
});

// Language Switcher
function switchLang(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerText = translations[lang][key];
    });
    
    // Toggle UI buttons
    document.getElementById('langFR').className = lang === 'fr' ? 'px-3 py-1 rounded-md text-sm font-bold bg-blue-600 text-white' : 'px-3 py-1 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400';
    document.getElementById('langEN').className = lang === 'en' ? 'px-3 py-1 rounded-md text-sm font-bold bg-blue-600 text-white' : 'px-3 py-1 rounded-md text-sm font-bold text-slate-500 dark:text-slate-400';
    
    calculate();
}

document.getElementById('langFR').onclick = () => switchLang('fr');
document.getElementById('langEN').onclick = () => switchLang('en');

// Dark Mode Toggle
function switchTheme(dark) {
    if (dark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    document.getElementById('themeLight').className = !dark ? 'px-3 py-1 rounded-md text-sm font-bold transition-all bg-blue-600 text-white' : 'px-3 py-1 rounded-md text-sm font-bold transition-all text-slate-500 dark:text-slate-400';
    document.getElementById('themeDark').className = dark ? 'px-3 py-1 rounded-md text-sm font-bold transition-all bg-blue-600 text-white' : 'px-3 py-1 rounded-md text-sm font-bold transition-all text-slate-500 dark:text-slate-400';
    calculate(); // Refresh chart colors
}

document.getElementById('themeLight').onclick = () => switchTheme(false);
document.getElementById('themeDark').onclick = () => switchTheme(true);

// Initial State
document.getElementById('startDate').valueAsDate = new Date();
calculate();