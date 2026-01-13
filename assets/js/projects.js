async function loadProjects() {
  const res = await fetch("assets/data/projects.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Could not load projects.json");
  return res.json();
}

function projectBadgeText(title) {
  // simple initials
  const words = title.replace(/[^a-z0-9\s]/gi, "").split(/\s+/).filter(Boolean);
  const initials = words.slice(0, 2).map(w => w[0].toUpperCase()).join("");
  return initials || "MM";
}

function renderProjects(projects) {
  const list = document.getElementById("projectList");
  list.innerHTML = "";

  for (const p of projects) {
    const tags = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join("");
    const el = document.createElement("article");
    el.className = "project";
    el.innerHTML = `
      <div class="badge" aria-hidden="true">${projectBadgeText(p.title)}</div>
      <div>
        <h3>${p.title}</h3>
        <p class="meta"><strong>Status:</strong> ${p.status} • <strong>Updated:</strong> ${p.updated}</p>
        <p>${p.summary}</p>
        <div class="tags">${tags}</div>
        <div class="links">
          <a class="btn" href="${p.page}">Read page</a>
          <a class="btn" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    `;
    list.appendChild(el);
  }
}

function wireSearch(projects) {
  const input = document.getElementById("projectSearch");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    const filtered = projects.filter(p => {
      const hay = [
        p.title, p.status, p.summary, (p.tags || []).join(" ")
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
    renderProjects(filtered);
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const projects = await loadProjects();
    // newest first
    projects.sort((a, b) => (b.updated || "").localeCompare(a.updated || ""));
    renderProjects(projects);
    wireSearch(projects);
  } catch (e) {
    const list = document.getElementById("projectList");
    list.innerHTML = `<div class="card"><h2>Projects failed to load</h2><p>${e.message}</p></div>`;
  }
});
