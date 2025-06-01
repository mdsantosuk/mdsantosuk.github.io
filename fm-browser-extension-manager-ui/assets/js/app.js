// Enable dark mode by default
document.documentElement.classList.add('dark-mode');
let darkMode = true;

// Get references to theme toggle button, root, and theme icons
const themeBtn = document.getElementById('themeToggle');
const root = document.documentElement;
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');

// Function to show the correct icon based on the current mode
function setThemeIcon() {
    if (darkMode) {
        moonIcon.style.display = 'none';
        sunIcon.style.display = '';
    } else {
        moonIcon.style.display = '';
        sunIcon.style.display = 'none';
    }
}

setThemeIcon();

// Add click event to toggle between dark and light mode
themeBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    root.classList.toggle('dark-mode', darkMode);
    setThemeIcon();
});

// App state variables
let extensions = [];
let currentFilter = "all";
let searchQuery = "";

// Fetch extension data from JSON file and render them
async function fetchExtensions() {
    const response = await fetch('./data.json'); 
    extensions = await response.json();
    renderExtensions();
}
fetchExtensions();

// Render extension cards in the grid based on filter and search
function renderExtensions() {
    const grid = document.getElementById('extensionsGrid');
    grid.innerHTML = '';

    // Filter extensions by status and search query
    let filtered = extensions.filter(ext => {
        let filterPass = (
            currentFilter === "all" ||
            (currentFilter === "active" && ext.isActive) ||
            (currentFilter === "inactive" && !ext.isActive)
        );
        let searchPass = ext.name.toLowerCase().includes(searchQuery) || ext.description.toLowerCase().includes(searchQuery);
        return filterPass && searchPass;
    });

    // Show message if no extensions to display
    if (filtered.length === 0) {
        grid.innerHTML = "<p class='no-extensions'>No extensions to display.</p>";
        return;
    }

    // Create and append each extension card
    filtered.forEach((ext, idx) => {
        const card = document.createElement('div');
        card.className = 'extension-card';
        card.innerHTML = `
            <div class="card-header">
                <img src="${ext.logo}" alt="${ext.name} logo" class="card-logo">
                <div>
                    <div class="card-title">${ext.name}</div>
                    <div class="card-desc">${ext.description}</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="remove-btn" data-idx="${getGlobalIdx(ext)}">Remove</button>
                <label class="toggle-switch">
                    <input type="checkbox" data-idx="${getGlobalIdx(ext)}" ${ext.isActive ? "checked" : ""}>
                    <span class="slider"></span>
                </label>
            </div>
        `;
        grid.appendChild(card);
    });

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.dataset.idx);
            extensions.splice(idx, 1);
            renderExtensions();
        });
    });

    // Add event listeners to toggle switches
    document.querySelectorAll('.toggle-switch input[type=checkbox]').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const idx = parseInt(this.dataset.idx);
            extensions[idx].isActive = this.checked;
            renderExtensions();
        });
    });
}

// Get the global index of an extension by name (for identifying in array)
function getGlobalIdx(ext) {
    return extensions.findIndex(e => e.name === ext.name);
}

// Add click listeners to filter buttons to update filter and re-render
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentFilter = this.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderExtensions();
    });
});

// Add listener to search box to filter extensions by name/description
document.getElementById('searchBox').addEventListener('input', function() {
    searchQuery = this.value.trim().toLowerCase();
    renderExtensions();
});
