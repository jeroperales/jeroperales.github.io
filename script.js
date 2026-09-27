/* ==========================================================================
   PORTFOLIO DATA + RENDER
   To add/edit content, only touch the data objects in section 1.
   The render functions in section 2 do the rest — no HTML editing needed.
   ========================================================================== */

/* -----------------------------------------
   1. DATA — edit this to update the site
   ----------------------------------------- */

   
const projects = [
  {
    title: "GuardRail",
    description: "Browser security extension for detecting suspicious links.",
    stack: ["Python", "FastAPI", "JavaScript"],
    github: "https://github.com/jeroperales/GuardRail---Extension", 
    demo: ""                        // leave empty string if there is no live demo
  },
  {
    title: "LaRedonda",
    description: "Full-stack football application that consumes live sports APIs to display real-time match updates and team information. Includes user login and authentication, basic CRUD operations, API integration, and dynamic data rendering for an interactive user experience.",
    stack: ["Angular", "Javascript", "HTML/CSS", "REST APIs"],
    github: "https://github.com/jeroperales/LaRedonda-TPFinal://github.com/",
    demo: ""                        // leave empty string if there is no live demo
  }

];

const skills = {
  "Languages": ["JavaScript", "Python", "Java", "C"],
  "Web": ["HTML", "CSS", "Angular"],
  "Tools": ["Git", "GitHub", "SQL"]
  // Add or rename groups freely — each key becomes a labeled row of tags.
};

const experience = [
  {
    dateRange: "Apr 2025 — Present",
    role: "Bank Teller",
    org: "Central Bank", // TODO: replace with actual employer name if different
    details: [
      "Customer service and transaction processing",
      "Cash handling and balancing",
      "Compliance and operational procedures"
    ]
  },
  {
    dateRange: "Nov 2023 — Mar 2024",
    role: "Guest Service Representative",
    org: "Uthgra", // TODO: replace with actual employer name if different
    details: [
      "Communicated with international customers ensuring a seamless guest experience."
    ]
  },
  {
    dateRange: "Dec 2020 - Aug 2021",
    role: "Front Desk Receptionist",
    org: "Visitar SRL", // TODO: replace with actual employer name if different
    details: [
      "Assisted clients with insurance policies, claims, and inquiries, ensuring clarity and satisfaction."
    ]
  }
];

const education = [
  {
    dateRange: "2023 — Present",
    role: "Technical Degree in Programming",
    org: "UTN — Universidad Tecnológica Nacional",
    details: [
      "Mar del Plata, Argentina"
    ]
  }
  ,
  {
    dateRange: "2014 — 2020",
    role: "High School Diploma - Social Sciences & Economics",
    org: "IAM",
    details: [
      "Mar del Plata, Argentina"
    ]
  }
];

const contact = [
  { label: "GitHub", href: "https://github.com/jeroperales" },     // TODO: real GitHub URL
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jeronimo-perales-807389293//" }, // TODO: real LinkedIn URL
     
];

/* -----------------------------------------
   2. RENDER — generic, no need to edit below
   ----------------------------------------- */

function renderProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = projects.map((p, i) => {
    const index = String(i + 1).padStart(2, "0");
    const stackHtml = p.stack.map(t => `<span>${escapeHtml(t)}</span>`).join("");

    const links = [];
    if (p.github) {
      links.push(`<a href="${escapeAttr(p.github)}" target="_blank" rel="noopener noreferrer">GitHub &rarr;</a>`);
    }
    if (p.demo) {
      links.push(`<a href="${escapeAttr(p.demo)}" target="_blank" rel="noopener noreferrer">Live Demo &rarr;</a>`);
    }

    return `
      <article class="project-card">
        <div class="project-head">
          <h3 class="project-name">${escapeHtml(p.title)}</h3>
          <span class="project-index" aria-hidden="true">${index}</span>
        </div>
        <p class="project-desc">${escapeHtml(p.description)}</p>
        <p class="project-stack">${stackHtml}</p>
        ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
      </article>
    `;
  }).join("");
}

function renderSkills() {
  const container = document.getElementById("skillGroups");
  container.innerHTML = Object.entries(skills).map(([group, items]) => `
    <div class="skill-group">
      <p class="skill-group-label">${escapeHtml(group)}</p>
      <div class="skill-tags">
        ${items.map(item => `<span class="skill-tag">${escapeHtml(item)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderEntries(data, elementId) {
  const container = document.getElementById(elementId);
  container.innerHTML = data.map(entry => `
    <div class="entry">
      <div class="entry-date">${escapeHtml(entry.dateRange)}</div>
      <div>
        <div class="entry-role">${escapeHtml(entry.role)}</div>
        <div class="entry-org">${escapeHtml(entry.org)}</div>
        ${entry.details && entry.details.length ? `
          <ul class="entry-details">
            ${entry.details.map(d => `<li>${escapeHtml(d)}</li>`).join("")}
          </ul>
        ` : ""}
      </div>
    </div>
  `).join("");
}

function renderContact() {
  const list = document.getElementById("contactLinks");
  list.innerHTML = contact.map(c => {
    const isExternal = c.href.startsWith("http");
    return `
      <li>
        <a href="${escapeAttr(c.href)}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          ${escapeHtml(c.label)}
        </a>
      </li>
    `;
  }).join("");
}

/* -----------------------------------------
   3. UTILITIES
   ----------------------------------------- */

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after a link is tapped
  links.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* -----------------------------------------
   4. INIT
   ----------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderSkills();
  renderEntries(experience, "experienceList");
  renderEntries(education, "educationList");
  renderContact();
  initNavToggle();

  document.getElementById("year").textContent = new Date().getFullYear();
});
