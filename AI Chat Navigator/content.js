let currentActiveIndex = null;
let lastPromptsSignature = ""; 
let cachedPrompts = [];

function createSidebar() {
    if (document.getElementById('ai-nav-container')) return;
    
    const container = document.createElement('div');
    container.id = 'ai-nav-container';
    
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'ai-nav-toggle';
    toggleBtn.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
    `;
    toggleBtn.title = "Toggle Navigation";
    
    const sidebar = document.createElement('div');
    sidebar.id = 'ai-nav-sidebar';
    sidebar.innerHTML = '<div class="nav-header">Table of Contents</div><div id="nav-list"></div>';
    
    toggleBtn.onclick = () => {
        sidebar.classList.toggle('hidden');
    };
    
    container.appendChild(toggleBtn);
    container.appendChild(sidebar);
    document.body.appendChild(container);
    
    updateNavigation();
}

function updateNavigation() {
    const navList = document.getElementById('nav-list');
    if (!navList) return;

    // This single selector magically works for BOTH Gemini and ChatGPT!
    cachedPrompts = Array.from(document.querySelectorAll('user-query, [data-message-author-role="user"]'));
    
    const currentSignature = cachedPrompts.map(p => p.textContent.trim().substring(0, 30)).join('|');
    
    if (currentSignature === lastPromptsSignature && navList.children.length > 0) {
        return; 
    }
    
    lastPromptsSignature = currentSignature;
    navList.innerHTML = '';
    currentActiveIndex = null;

    if (cachedPrompts.length === 0) {
        navList.innerHTML = '<div class="nav-item" style="color: #8e918f; cursor: default;">No questions found yet.</div>';
        return;
    }

    cachedPrompts.forEach((prompt, index) => {
        const item = document.createElement('div');
        item.className = 'nav-item';
        item.id = `nav-item-${index}`; 
        
        // Clean up the text (removes "You said", "Edit", and line breaks)
        let text = prompt.textContent.trim().replace(/\n/g, ' ');
        text = text.replace(/^You said\s*/i, '').replace(/Edit$/i, '').trim();
        
        if (!text) text = "Attached Media / Prompt " + (index + 1); 
        
        item.innerText = `${index + 1}. ${text}`;
        item.title = text; 
        
        item.onclick = () => {
            prompt.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
        
        navList.appendChild(item);
    });

    checkScrollPosition();
}

function checkScrollPosition() {
    if (cachedPrompts.length === 0) return;

    let activeIndex = 0;
    // Trigger line set slightly higher (25%) to account for ChatGPT's sticky top header
    const triggerLine = window.innerHeight * 0.25;

    cachedPrompts.forEach((prompt, index) => {
        const rect = prompt.getBoundingClientRect();
        if (rect.top <= triggerLine) {
            activeIndex = index;
        }
    });

    if (activeIndex !== currentActiveIndex) {
        highlightActiveItem(activeIndex);
    }
}

function highlightActiveItem(index) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    currentActiveIndex = index;
    
    const activeItem = document.getElementById(`nav-item-${index}`);
    if (activeItem) {
        activeItem.classList.add('active');
        
        const sidebar = document.getElementById('ai-nav-sidebar');
        const itemTop = activeItem.offsetTop;
        const itemBottom = itemTop + activeItem.offsetHeight;
        const viewTop = sidebar.scrollTop;
        const viewBottom = viewTop + sidebar.offsetHeight;

        if (itemTop < viewTop || itemBottom > viewBottom) {
            activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

if (!window.aiNavScrollAttached) {
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(checkScrollPosition);
    }, true);
    window.aiNavScrollAttached = true;
}

const observer = new MutationObserver(() => {
    clearTimeout(window.navUpdateTimeout);
    window.navUpdateTimeout = setTimeout(updateNavigation, 1000);
});

setTimeout(() => {
    createSidebar();
    observer.observe(document.body, { childList: true, subtree: true });
}, 3000);