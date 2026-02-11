// ===== Mobile nav toggle =====
const navToggle = document.getElementById("navToggle");
const navMobile = document.getElementById("navMobile");

if (navToggle && navMobile) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navMobile.hidden = isOpen;
  });

  // Close mobile menu after click
  navMobile.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navMobile.hidden = true;
    });
  });
}

// ===== Footer year =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Mock data for demo matching =====
const mockListings = [
  {
    type: "Haydovchi",
    route: "Shofirkon → Samarqand",
    date: "Bugun",
    cargo: "Kichik quti / hujjatlar",
    limit: "15 kg gacha",
    contact: "+998 ** *** ** **"
  },
  {
    type: "Haydovchi",
    route: "G‘ijduvon → Samarqand",
    date: "Ertaga",
    cargo: "Quti / sumka",
    limit: "20 kg gacha",
    contact: "+998 ** *** ** **"
  },
  {
    type: "Jo‘natuvchi",
    route: "Shofirkon → Samarqand",
    date: "Bugun",
    cargo: "5 kg, 30×20×15 sm",
    limit: "Tez yetkazish",
    contact: "Chat orqali"
  },
  {
    type: "Jo‘natuvchi",
    route: "Buxoro → Navoiy",
    date: "Bugun",
    cargo: "10 kg, o‘rtacha quti",
    limit: "Arzon variant",
    contact: "Chat orqali"
  },
];

const fromInput = document.getElementById("fromInput");
const toInput = document.getElementById("toInput");
const findBtn = document.getElementById("findBtn");
const resultsBox = document.getElementById("resultsBox");

function normalize(s){
  return (s || "").trim().toLowerCase();
}

function renderResults(items){
  if (!resultsBox) return;

  if (!items.length){
    resultsBox.innerHTML = `<div class="results__empty">Mos e’lon topilmadi. Boshqa yo‘nalish kiriting (masalan: G‘ijduvon → Samarqand).</div>`;
    return;
  }

  resultsBox.innerHTML = items.map(item => `
    <div class="result">
      <div class="result__top">
        <div class="result__title">${item.type}: ${item.route}</div>
        <div class="result__pill">${item.date}</div>
      </div>
      <div class="result__meta"><b>Yuk:</b> ${item.cargo}</div>
      <div class="result__meta"><b>Shart:</b> ${item.limit}</div>
      <div class="result__meta"><b>Aloqa:</b> ${item.contact}</div>
    </div>
  `).join("");
}

function findMatches(from, to){
  const f = normalize(from);
  const t = normalize(to);
  if (!f || !t) return [];

  const query = `${f} → ${t}`;
  return mockListings.filter(x => normalize(x.route).includes(query));
}

if (findBtn) {
  findBtn.addEventListener("click", () => {
    const from = fromInput?.value || "";
    const to = toInput?.value || "";

    const matches = findMatches(from, to);
    renderResults(matches);
  });
}
// IMAGE PREVIEW (TEAM PHOTOS)
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('imgModalContent');
const closeBtn = document.getElementById('imgModalClose');

document.querySelectorAll('[data-preview]').forEach(img => {
  img.addEventListener('click', () => {
    modalImg.src = img.src;
    modal.removeAttribute('hidden');
  });
});

// yopish
closeBtn.addEventListener('click', () => {
  modal.setAttribute('hidden', true);
  modalImg.src = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.setAttribute('hidden', true);
    modalImg.src = '';
  }
});

// ===== SCROLL REVEAL ANIMATIONS =====
// Add scroll-reveal class to sections for animation on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

// Target all cards and sections for scroll reveal
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.card, .section__head, .hero__content, .hero__card');
  revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    scrollObserver.observe(el);
  });
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#top') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const yOffset = -80;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

// ===== NAVBAR ACTIVE STATE =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a, .nav__mobile a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

