// Global Theme, Font & Text Size Functions
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

function loadSavedHomeHighlights() {
    try {
        const saved = localStorage.getItem("user_highlights_" + window.location.pathname);
        if (!saved) return;
        const highlights = JSON.parse(saved);
        if (!Array.isArray(highlights)) return;
        const bodyElements = document.querySelectorAll('.hero-excerpt p, .about-content p, .section-subtitle, .quote-text, .m-desc');
        highlights.forEach(textSnippet => {
            if (!textSnippet || textSnippet.length < 3) return;
            bodyElements.forEach(p => {
                if (p.textContent.includes(textSnippet) && !p.querySelector(`mark.user-highlight[data-hl-text="${CSS.escape(textSnippet)}"]`)) {
                    const regex = new RegExp(`(${textSnippet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g');
                    p.innerHTML = p.innerHTML.replace(regex, `<mark class="user-highlight" data-hl-text="${textSnippet}" title="Click to remove highlight">$1</mark>`);
                }
            });
        });
    } catch(e) {}
}

// Bulletproof Global Drawer & Settings Toggles
window.closeAllDrawers = function() {
    const panel = document.getElementById('settingsPanel');
    const drawer = document.getElementById('chapterDrawer');
    const overlay = document.getElementById('settingsOverlay');
    const modal = document.getElementById('contactModal');

    if (panel) {
        panel.classList.remove('active');
        panel.style.cssText = "position: fixed; top: 0; right: -420px !important; width: 380px; max-width: 100vw; height: 100vh; background: var(--bg-drawer); z-index: 999999; padding: 3rem 2rem; overflow-y: auto; transition: right 0.4s ease;";
    }
    if (drawer) {
        drawer.classList.remove('active');
        drawer.style.cssText = "position: fixed; top: 0; left: -420px !important; width: 380px; max-width: 100vw; height: 100vh; background: var(--bg-drawer); z-index: 999999; padding: 3rem 2rem; overflow-y: auto; transition: left 0.4s ease;";
    }
    if (overlay) {
        overlay.classList.remove('active');
        overlay.style.cssText = "position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 999998; opacity: 0 !important; pointer-events: none !important;";
    }
    if (modal) {
        modal.classList.remove('active');
        modal.style.cssText = "position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 100000; opacity: 0 !important; pointer-events: none !important;";
    }
};

window.openSettings = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllDrawers();
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('settingsOverlay');
    if (panel) {
        panel.classList.add('active');
        panel.style.cssText = "position: fixed; top: 0; right: 0px !important; width: 380px; max-width: 100vw; height: 100vh; background: var(--bg-drawer); z-index: 999999 !important; padding: 3rem 2rem; overflow-y: auto; display: block !important; box-shadow: -10px 0 35px rgba(0,0,0,0.85); transition: right 0.4s ease;";
    }
    if (overlay) {
        overlay.classList.add('active');
        overlay.style.cssText = "position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); z-index: 999998 !important; opacity: 1 !important; pointer-events: all !important;";
    }
};

window.openChapters = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllDrawers();
    const drawer = document.getElementById('chapterDrawer');
    const overlay = document.getElementById('settingsOverlay');
    if (drawer) {
        drawer.classList.add('active');
        drawer.style.cssText = "position: fixed; top: 0; left: 0px !important; width: 380px; max-width: 100vw; height: 100vh; background: var(--bg-drawer); z-index: 999999 !important; padding: 3rem 2rem; overflow-y: auto; display: block !important; box-shadow: 10px 0 35px rgba(0,0,0,0.85); transition: left 0.4s ease;";
    }
    if (overlay) {
        overlay.classList.add('active');
        overlay.style.cssText = "position: fixed; inset: 0; background: rgba(0, 0, 0, 0.75); z-index: 999998 !important; opacity: 1 !important; pointer-events: all !important;";
    }
};

window.openContact = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    window.closeAllDrawers();
    const modal = document.getElementById('contactModal');
    const overlay = document.getElementById('settingsOverlay');
    if (modal) {
        modal.classList.add('active');
        modal.style.opacity = '1';
        modal.style.pointerEvents = 'all';
    }
    if (overlay) {
        overlay.classList.add('active');
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';
    }
};

// Theme, Font & Text Scaling Handlers inside Settings Panel
document.addEventListener("click", (e) => {
    const themeBtn = e.target.closest("[data-theme]");
    if (themeBtn) {
        e.preventDefault();
        let theme = themeBtn.getAttribute("data-theme");
        if (theme === 'default') theme = 'dark';
        window.applyTheme(theme);
    }

    const fontBtn = e.target.closest("[data-font]");
    if (fontBtn) {
        e.preventDefault();
        const font = fontBtn.getAttribute("data-font");
        window.applyFont(font);
    }

    const sizeBtn = e.target.closest("[data-size]");
    if (sizeBtn) {
        e.preventDefault();
        const size = sizeBtn.getAttribute("data-size");
        window.applySize(size);
    }
});

function syncResumeReadingButtons() {
    try {
        const lastRead = localStorage.getItem('last_read_chapter') || 'chapter1.html';
        const match = lastRead.match(/chapter(\d+)\.html/i);
        const num = match ? match[1] : "1";
        const formattedNum = num.padStart(2, '0');

        const resumeBtns = document.querySelectorAll('a[href*="chapter"].primary-button, .cta-group a, a#resumeReadingBtn');
        resumeBtns.forEach(btn => {
            if (btn.textContent.includes('Resume') || btn.textContent.includes('Continue') || btn.textContent.includes('Start')) {
                btn.setAttribute('href', lastRead);
                btn.innerHTML = `Resume Reading (Chapter ${formattedNum}) →`;
            }
        });
    } catch(e) {}
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedHomeHighlights();
    syncResumeReadingButtons();
});

// Standard link navigation
function updateChapterLockBadges() {}

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
        }
    }
});

window.handleCommentSubmit = function(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    const commentForm = document.getElementById("commentForm");
    const nameInput = document.getElementById("reviewerName");
    const emailInput = document.getElementById("reviewerEmail");
    const messageInput = document.getElementById("reviewerMessage");
    const submitBtn = commentForm ? commentForm.querySelector('button[type="submit"]') : null;

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !message) {
        alert("Kripya apna Naam aur Message dono bharein!");
        return false;
    }

    const newComment = {
        name: name,
        message: message,
        date: new Date().toLocaleDateString()
    };

    saveCommentToLocal(newComment);
    renderComment(newComment);

    if (commentForm) commentForm.reset();

    // Background web3forms API dispatch
    try {
        const formData = new FormData();
        formData.append("access_key", "78b08615-65ca-4c89-a320-b21b236bba26");
        formData.append("subject", "New Comment on Peer-e-Kamil");
        formData.append("name", name);
        formData.append("email", email || "Not Provided");
        formData.append("message", message);
        fetch("https://api.web3forms.com/submit", { method: "POST", body: formData }).catch(function(){});
    } catch(err) {}

    alert("🎉 Your comment has been posted successfully !");
    return false;
};

// Auto load comments when DOM is ready or immediately if already loaded
if (document.readyState === "complete" || document.readyState === "interactive") {
    loadComments();
} else {
    document.addEventListener("DOMContentLoaded", loadComments);
}

function saveCommentToLocal(commentObj) {
    try {
        let comments = JSON.parse(localStorage.getItem("parda_comments")) || [];
        comments.push(commentObj);
        localStorage.setItem("parda_comments", JSON.stringify(comments));
    } catch(err) {}
}

function renderComment(commentObj) {
    const commentsList = document.getElementById("commentsList");
    if (!commentsList) return;

    const commentDiv = document.createElement("div");
    commentDiv.className = "comment-item";
    commentDiv.style.cssText = "background: var(--bg-main); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 12px; margin-top: 1rem;";
    commentDiv.innerHTML = `
        <div class="comment-header" style="color: var(--accent-gold); margin-bottom: 0.5rem;">
            <strong>${escapeHTML(commentObj.name)}</strong>
        </div>
        <p style="color: var(--text-primary); margin: 0; line-height: 1.6;">${escapeHTML(commentObj.message)}</p>
    `;
    commentsList.prepend(commentDiv);
}

function loadComments() {
    try {
        let comments = JSON.parse(localStorage.getItem("parda_comments")) || [];
        comments.forEach(comment => {
            renderComment(comment);
        });
    } catch(err) {}
}

function escapeHTML(str) {
    if (!str) return "";
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

// ==========================================
// HEADER NAVIGATION & SMOOTH SCROLL SYSTEM
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a, a.logo");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const headerOffset = 90;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Auto Active Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    function highlightNavOnScroll() {
        const scrollPosition = window.pageYOffset + 120;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll(".nav-links a").forEach(a => {
                    a.classList.remove("active");
                    if (a.getAttribute("href") === "#" + sectionId) {
                        a.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNavOnScroll);
    highlightNavOnScroll();
});

// ==========================================
// AMBIENT SOUND GENERATOR (Web Audio API)
// ==========================================
let ambientAudioContext = null;
let ambientOsc1 = null;
let ambientOsc2 = null;
let ambientGain = null;
let isAmbientPlaying = false;

window.toggleAmbient = function(type, btn) {
    if (!isAmbientPlaying) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!ambientAudioContext) {
                ambientAudioContext = new AudioCtx();
            }
            if (ambientAudioContext.state === 'suspended') {
                ambientAudioContext.resume();
            }

            ambientOsc1 = ambientAudioContext.createOscillator();
            ambientOsc2 = ambientAudioContext.createOscillator();
            ambientGain = ambientAudioContext.createGain();

            ambientOsc1.type = 'sine';
            ambientOsc1.frequency.setValueAtTime(220, ambientAudioContext.currentTime);

            ambientOsc2.type = 'triangle';
            ambientOsc2.frequency.setValueAtTime(277.18, ambientAudioContext.currentTime);

            ambientGain.gain.setValueAtTime(0.01, ambientAudioContext.currentTime);
            ambientGain.gain.exponentialRampToValueAtTime(0.08, ambientAudioContext.currentTime + 2);

            ambientOsc1.connect(ambientGain);
            ambientOsc2.connect(ambientGain);
            ambientGain.connect(ambientAudioContext.destination);

            ambientOsc1.start();
            ambientOsc2.start();
            isAmbientPlaying = true;

            if (btn) {
                btn.innerHTML = "🔊 Sound: On";
                btn.style.borderColor = "var(--accent-gold)";
                btn.style.color = "var(--accent-gold)";
            }
        } catch (err) {
            console.error("Audio error:", err);
        }
    } else {
        if (ambientGain && ambientAudioContext) {
            ambientGain.gain.exponentialRampToValueAtTime(0.0001, ambientAudioContext.currentTime + 0.4);
            setTimeout(() => {
                if (ambientOsc1) ambientOsc1.stop();
                if (ambientOsc2) ambientOsc2.stop();
                isAmbientPlaying = false;
            }, 400);
        } else {
            isAmbientPlaying = false;
        }

        if (btn) {
            btn.innerHTML = "Sound";
            btn.style.borderColor = "";
            btn.style.color = "";
        }
    }
};

// ==========================================
// QUOTES SHARING SYSTEM
// ==========================================
window.shareQuote = function(quoteText) {
    const textToShare = `"${quoteText}" — Peer-e-Kamil Novel`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare)}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToShare).catch(() => {});
    }

    window.open(whatsappUrl, '_blank');
};

// ==========================================
// COMMUNITY POLL SYSTEM
// ==========================================
window.vote = function(btnElement, optionText) {
    const pollButtons = document.querySelectorAll('.poll-btn');
    pollButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.7';
    });

    if (btnElement) {
        btnElement.style.opacity = '1';
        btnElement.style.borderColor = 'var(--accent-gold)';
        btnElement.style.background = 'rgba(226, 184, 87, 0.2)';
    }

    const resultText = document.getElementById('pollResult');
    if (resultText) {
        resultText.style.display = 'block';
        resultText.innerHTML = `✅ <strong>Aapka Vote: "${escapeHTML(optionText)}"</strong> record ho gaya hai! Thank you!`;
    }

    localStorage.setItem("user_poll_vote", optionText);
};
