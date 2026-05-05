# 💰 Quand serai-je millionnaire ?

Interactive compound interest calculator — visualize your path to **€1,000,000**.

[Demo Live](https://metanef.github.io/freel1fe/)

<img width="1050" height="863" alt="image" src="https://github.com/user-attachments/assets/eac9e002-53e8-41aa-8247-67f102b4dad8" />

![UI](https://img.shields.io/badge/UI-Tailwind_CSS-38B2AC?style=flat-square)
![Charts](https://img.shields.io/badge/Charts-Chart.js-FF6384?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- Real-time results as you type
- Capital growth chart (Chart.js)
- Target date, final age, and duration at a glance
- ☀️ / 🌙 theme toggle — FR / EN language switcher
- Fully responsive (desktop, tablet, mobile)

## Usage

Open `index.html` in any modern browser and adjust the sidebar:

| Field | Description |
|---|---|
| Âge actuel | Your current age |
| Capital de départ | Current savings |
| Épargne mensuelle | Monthly investment |
| Rendement annuel | Expected annual return (e.g. 7% for S&P 500) |
| Date de début | Investment start date |

## Stack

HTML5 · Tailwind CSS (CDN) · Chart.js · Vanilla JS (ES6) · Google Fonts

## Math

Monthly compounded interest with contributions:

$$A = P(1 + r/12)^{12t} + PMT \times \frac{(1 + r/12)^{12t} - 1}{r/12}$$

The simulation loops monthly until balance ≥ €1,000,000 or 100 years elapse.

## Files

```
index.html   — markup
style.css    — custom styles
i18n.js      — FR/EN translations
script.js    — logic, chart, event handlers
```

---

© metanef · MIT License · *For educational purposes only.*
