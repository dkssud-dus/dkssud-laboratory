import { projects } from "./data.js";

const vanillaSection = document.querySelector(".Vanilla");
const reactSection = document.querySelector(".React");
const navItems = document.querySelectorAll(".Navigation__Item");

// Rendering
function renderProjects(section, list) {
  section.innerHTML = "";
  const ul = document.createElement("ul");
  ul.classList.add("Lab__Items");

  list.forEach((project) => {
    const li = document.createElement("li");
    li.classList.add("Lab__Item");

    // Tags
    const tags = project.tags
      .map((tag) => `<span class="Tag">${tag}</span>`)
      .join("");

    li.innerHTML = `<a href="${project.path}" target="_blank">${project.title}</a>...`;

    // Tooltip GIF
    const tooltip = document.createElement("img");
    tooltip.src = project.thumb;
    tooltip.classList.add("Tooltip");
    li.appendChild(tooltip);

    ul.appendChild(li);
  });

  section.appendChild(ul);
}

// Tab
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((i) => i.classList.remove("Navigation__Item--Active"));
    item.classList.add("Navigation__Item--Active");

    if (item.classList.contains("Navigation__Item--Vanilla")) {
      vanillaSection.style.display = "block";
      reactSection.style.display = "none";
    } else {
      vanillaSection.style.display = "none";
      reactSection.style.display = "block";
    }
  });
});

//
renderProjects(vanillaSection, projects.vanilla);
renderProjects(reactSection, projects.react);
vanillaSection.style.display = "block";
reactSection.style.display = "none";
