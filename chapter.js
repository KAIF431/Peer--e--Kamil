document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 0. RESTORE USER PREFERENCES
    // ==========================================
    const savedTheme = localStorage.getItem('selectedTheme') || localStorage.getItem('parda_theme');
    const savedFont = localStorage.getItem('selectedFont') || localStorage.getItem('parda_font');
    const savedSize = localStorage.getItem('selectedSize') || localStorage.getItem('parda_size');

    if (savedTheme) applyTheme(savedTheme);
    if (savedFont) applyFont(savedFont);
    if (savedSize) applySize(savedSize);

    // Dynamic Home logo link resolver
    const logoLink = document.querySelector("a.logo");
    if (logoLink) {
        logoLink.setAttribute("href", "peer_e_kaamil.html");
    }

    // ==========================================
    // 1. CHARACTER DATA & AUTO-HIGHLIGHTER SYSTEM
    // ==========================================
    const characterData = {
        salar: { name: "Salar Sikander", desc: "Main Protagonist. Exceptionally intelligent (IQ 150+), complex, lost in questions, searching for guidance." },
        imama: { name: "Imama Hashim", desc: "Main Protagonist. Courageous, firm in faith, patient, and unwavering in her values." }
    };

    function autoHighlightCharacters() {
        const storyBody = document.querySelectorAll('.story-body');
        if (!storyBody.length) return;

        storyBody.forEach(body => {
            const paragraphs = body.querySelectorAll('p');
            paragraphs.forEach(p => {
                if (p.getAttribute('data-highlighted') === 'true') return;

                let html = p.innerHTML;

                // Match ONLY Salar and Imama
                html = html.replace(/\bSalar Sikander\b/g, '<span class="highlight-name" data-char="salar">Salar Sikander</span>');
                html = html.replace(/\bSalar\b/g, '<span class="highlight-name" data-char="salar">Salar</span>');
                html = html.replace(/\bImama Hashim\b/g, '<span class="highlight-name" data-char="imama">Imama Hashim</span>');
                html = html.replace(/\bImama\b/g, '<span class="highlight-name" data-char="imama">Imama</span>');

                p.innerHTML = html;
                p.setAttribute('data-highlighted', 'true');
            });
        });

        setupPopoverDelegation();
    }

    // ==========================================
    // 2. POPOVER HOVER SYSTEM
    // ==========================================
    function setupPopoverDelegation() {
        let popover = document.getElementById('charPopover');
        
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'charPopover';
            popover.className = 'char-popover';
            popover.innerHTML = `<h4 id="charName"></h4><p id="charDesc"></p>`;
            document.body.appendChild(popover);
        }

        const popName = document.getElementById('charName');
        const popDesc = document.getElementById('charDesc');

        document.body.addEventListener('mouseover', (e) => {
            const target = e.target.closest('.highlight-name');
            if (!target) return;

            const key = target.getAttribute('data-char');
            if (characterData[key]) {
                if (popName) popName.innerText = characterData[key].name;
                if (popDesc) popDesc.innerText = characterData[key].desc;

                const rect = target.getBoundingClientRect();
                const popoverWidth = 280;
                
                let leftPos = rect.left + (rect.width / 2) - (popoverWidth / 2);
                let topPos = rect.top - 90;

                if (leftPos < 10) leftPos = 10;
                if (topPos < 10) topPos = rect.bottom + 10;

                popover.style.left = `${leftPos}px`;
                popover.style.top = `${topPos}px`;
                popover.classList.add('active');
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            if (e.target.closest('.highlight-name')) {
                popover.classList.remove('active');
            }
        });
    }

    autoHighlightCharacters();

    // ==========================================
    // 3. STATS & CHARACTER MENTIONS CALCULATOR
    // ==========================================
    window.updateChapterStats = function() {
        const storyBody = document.querySelector('.story-body');
        const fullText = storyBody ? (storyBody.innerText || storyBody.textContent || "") : "";
        const words = fullText.trim().split(/\s+/).filter(w => w.length > 0).length;
        
        const wordCountElement = document.getElementById('word-count');
        const readTimeElement = document.getElementById('read-time');

        if (wordCountElement) wordCountElement.innerText = `${words.toLocaleString()} Words`;
        if (readTimeElement) {
            const readTime = Math.ceil(words / 180) || 1;
            readTimeElement.innerText = `⏱️ ${readTime} Min Read`;
        }

        const salarMatches = fullText.match(/\bSalar\b/gi);
        const imamaMatches = fullText.match(/\bImama\b/gi);

        const salarEl = document.getElementById('salar-mentions');
        const imamaEl = document.getElementById('imama-mentions');

        if (salarEl) salarEl.innerText = salarMatches ? salarMatches.length : 0;
        if (imamaEl) imamaEl.innerText = imamaMatches ? imamaMatches.length : 0;
    };

    window.updateChapterStats();

    // Live Scroll Progress Bar Listener
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = scrollHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollTop / scrollHeight) * 100))) : 0;

        const progressBar = document.getElementById("progress-bar");
        const sidebarPercent = document.getElementById("sidebar-scroll-percent");

        if (progressBar) progressBar.style.width = scrolled + "%";
        if (sidebarPercent) sidebarPercent.innerText = scrolled + "%";
    });

    // ==========================================
    // 4. DRAWERS TOGGLE SYSTEM
    // ==========================================
    const openChapters = document.getElementById('openChapters');
    const openSettings = document.getElementById('openSettings');
    const closeChapters = document.getElementById('closeChapters');
    const closeSettings = document.getElementById('closeSettings');
    const chapterDrawer = document.getElementById('chapterDrawer');
    const settingsPanel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('settingsOverlay');

    function closeAllPanels() {
        if (chapterDrawer) chapterDrawer.classList.remove('active');
        if (settingsPanel) settingsPanel.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    if (openChapters) {
        openChapters.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllPanels();
            if (chapterDrawer) chapterDrawer.classList.add('active');
            if (overlay) overlay.classList.add('active');
        });
    }

    if (openSettings) {
        openSettings.addEventListener('click', (e) => {
            e.preventDefault();
            closeAllPanels();
            if (settingsPanel) settingsPanel.classList.add('active');
            if (overlay) overlay.classList.add('active');
        });
    }

    if (closeChapters) closeChapters.addEventListener('click', closeAllPanels);
    if (closeSettings) closeSettings.addEventListener('click', closeAllPanels);
    if (overlay) overlay.addEventListener('click', closeAllPanels);

    // ==========================================
    // 5. BACK TO TOP BUTTON
    // ==========================================
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    let floatBtn = document.getElementById('floatingBackToTop');
    if (!floatBtn) {
        floatBtn = document.createElement('button');
        floatBtn.id = 'floatingBackToTop';
        floatBtn.className = 'floating-back-to-top';
        floatBtn.innerHTML = '↑ Top';
        floatBtn.title = 'Back to top';
        document.body.appendChild(floatBtn);
    }

    floatBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollToTop();
    });

    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        if (floatBtn) {
            if (scrollTop > 250) {
                floatBtn.classList.add('visible');
            } else {
                floatBtn.classList.remove('visible');
            }
        }

        // Auto-save last read chapter and exact scroll position
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentFile = window.location.pathname.split('/').pop() || 'chapter1.html';
            if (currentFile.includes('chapter')) {
                localStorage.setItem('last_read_chapter', currentFile);
                localStorage.setItem('last_read_scroll_' + currentFile, scrollTop);
            }
        }, 200);
    });

    // Auto-restore reading scroll position when opening chapter
    const currentFile = window.location.pathname.split('/').pop() || 'chapter1.html';
    if (currentFile.includes('chapter')) {
        localStorage.setItem('last_read_chapter', currentFile);
        const savedScroll = localStorage.getItem('last_read_scroll_' + currentFile);
        if (savedScroll && parseInt(savedScroll, 10) > 80) {
            setTimeout(() => {
                window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'smooth' });
            }, 300);
        }
    }
});

// Global Theme Switchers
window.applyTheme = function(themeName) {
    if (!themeName) return;
    const t = (themeName === 'default') ? 'dark' : themeName;
    document.documentElement.setAttribute('data-theme', t);
    if (document.body) document.body.setAttribute('data-theme', t);
    localStorage.setItem('selectedTheme', t);
    localStorage.setItem('parda_theme', t);
};

window.applyFont = function(fontName) {
    if (!fontName) return;
    document.documentElement.setAttribute('data-font', fontName);
    if (document.body) document.body.setAttribute('data-font', fontName);
    localStorage.setItem('selectedFont', fontName);
    localStorage.setItem('parda_font', fontName);
};

window.applySize = function(sizeName) {
    if (!sizeName) return;
    document.documentElement.setAttribute('data-size', sizeName);
    if (document.body) document.body.setAttribute('data-size', sizeName);
    localStorage.setItem('selectedSize', sizeName);
    localStorage.setItem('parda_size', sizeName);
};

// ==========================================
// FLOATING TEXT SELECTION & READER HIGHLIGHTER SYSTEM
// ==========================================
let userHighlights = [];

function getPageHighlightKey() {
    return "user_highlights_" + window.location.pathname;
}

function loadSavedUserHighlights() {
    try {
        const saved = localStorage.getItem(getPageHighlightKey());
        if (saved) userHighlights = JSON.parse(saved);
    } catch(e) { userHighlights = []; }

    if (!Array.isArray(userHighlights)) userHighlights = [];
    applyUserHighlightsToDOM();
}

function applyUserHighlightsToDOM() {
    if (!userHighlights.length) return;
    const bodyElements = document.querySelectorAll('.story-body p');

    userHighlights.forEach(textSnippet => {
        if (!textSnippet || textSnippet.length < 3) return;
        bodyElements.forEach(p => {
            if (p.textContent.includes(textSnippet) && !p.querySelector(`mark.user-highlight[data-hl-text="${CSS.escape(textSnippet)}"]`)) {
                const regex = new RegExp(`(${textSnippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g');
                p.innerHTML = p.innerHTML.replace(regex, `<mark class="user-highlight" data-hl-text="${textSnippet}" title="Click to remove highlight">$1</mark>`);
            }
        });
    });
}

function saveUserHighlight(textSnippet) {
    if (!textSnippet || textSnippet.length < 3) return;
    if (!userHighlights.includes(textSnippet)) {
        userHighlights.push(textSnippet);
        localStorage.setItem(getPageHighlightKey(), JSON.stringify(userHighlights));
    }
    applyUserHighlightsToDOM();
}

function removeUserHighlight(textSnippet) {
    userHighlights = userHighlights.filter(t => t !== textSnippet);
    localStorage.setItem(getPageHighlightKey(), JSON.stringify(userHighlights));
    
    document.querySelectorAll(`mark.user-highlight[data-hl-text="${CSS.escape(textSnippet)}"]`).forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });
}

document.addEventListener('click', (e) => {
    const logoLink = e.target.closest('a.logo');
    if (logoLink) {
        const href = logoLink.getAttribute('href') || 'peer_e_kaamil.html';
        if (href && href !== '#' && !href.startsWith('#')) {
            e.preventDefault();
            window.location.href = href;
            return;
        }
    }

    const chapterLink = e.target.closest('a.chapter-link, a[href*="chapter"]');
    if (chapterLink) {
        const href = chapterLink.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('#')) {
            e.preventDefault();
            window.location.href = href;
            return;
        }
    }

    const markEl = e.target.closest('mark.user-highlight');
    if (markEl) {
        e.stopPropagation();
        const textSnippet = markEl.getAttribute('data-hl-text') || markEl.textContent.trim();
        if (confirm("Remove this highlight?")) {
            removeUserHighlight(textSnippet);
        }
    }
});

document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    const selectedText = selection ? selection.toString().trim() : "";
    
    let shareBar = document.getElementById('textShareBar');
    if (!shareBar) {
        shareBar = document.createElement('div');
        shareBar.id = 'textShareBar';
        shareBar.className = 'text-share-bar';
        shareBar.innerHTML = `
            <button id="shareWaBtn">💬 WhatsApp</button>
            <button id="copyQuoteBtn">📋 Copy</button>
            <button id="highlightBtn">🖍️ Highlight</button>
        `;
        document.body.appendChild(shareBar);
    }
    
    if (selectedText.length > 4 && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        let leftPos = rect.left + (rect.width / 2) - 120;
        let topPos = rect.top - 50;
        if (leftPos < 10) leftPos = 10;
        if (topPos < 10) topPos = rect.bottom + 10;

        shareBar.style.left = `${leftPos}px`;
        shareBar.style.top = `${topPos}px`;
        shareBar.classList.add('active');
        
        const shareWa = document.getElementById('shareWaBtn');
        const copyBtn = document.getElementById('copyQuoteBtn');
        const hlBtn = document.getElementById('highlightBtn');

        if (shareWa) {
            shareWa.onclick = (e) => {
                e.stopPropagation();
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent('"' + selectedText + '" — Peer-e-Kamil Novel')}`;
                window.open(url, '_blank');
            };
        }
        
        if (copyBtn) {
            copyBtn.onclick = (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(`"${selectedText}" — Peer-e-Kamil Novel`);
                alert("Quote copied!");
                shareBar.classList.remove('active');
            };
        }

        if (hlBtn) {
            hlBtn.onclick = (e) => {
                e.stopPropagation();
                saveUserHighlight(selectedText);
                selection.removeAllRanges();
                shareBar.classList.remove('active');
            };
        }
    } else {
        if (shareBar) shareBar.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadSavedUserHighlights();
});

// ==========================================
// TRANSIENT SESSION PASSWORD LOCK SYSTEM
// Secret Password: kaif@431
// No lock system enabled
