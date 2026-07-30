(function () {
    'use strict';

    var modal = document.getElementById('portfolioModal');
    if (!modal) return;

    var modalImg = document.getElementById('portfolioModalImg');
    var modalTitle = document.getElementById('portfolioModalTitle');
    var modalIframe = document.getElementById('portfolioModalIframe');
    var modalLink = document.getElementById('portfolioModalLink');
    var tabs = modal.querySelectorAll('.portfolio-tab');
    var panels = modal.querySelectorAll('.portfolio-panel');
    var liveTab = modal.querySelector('[data-tab="live"]');
    var currentUrl = '';

    function switchTab(tabName) {
        tabs.forEach(function (tab) {
            tab.classList.toggle('is-active', tab.dataset.tab === tabName);
        });
        panels.forEach(function (panel) {
            panel.classList.toggle('is-active', panel.dataset.panel === tabName);
        });
    }

    function openModal(preview, title, url) {
        currentUrl = url || '';
        modalTitle.textContent = title || 'Aperçu du projet';
        modalImg.src = preview;
        modalImg.alt = 'Aperçu complet — ' + (title || 'projet');

        if (currentUrl) {
            modalIframe.src = currentUrl;
            liveTab.disabled = false;
            modalLink.href = currentUrl;
            modalLink.hidden = false;
        } else {
            modalIframe.src = '';
            liveTab.disabled = true;
            modalLink.hidden = true;
            switchTab('preview');
        }

        modal.hidden = false;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        switchTab('preview');
    }

    function closeModal() {
        modal.hidden = true;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        modalIframe.src = '';
        modalImg.src = '';
    }

    document.querySelectorAll('.btn-view-project').forEach(function (btn) {
        btn.addEventListener('click', function () {
            openModal(
                btn.dataset.preview,
                btn.dataset.title,
                btn.dataset.url
            );
        });
    });

    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
        el.addEventListener('click', closeModal);
    });

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            if (tab.disabled) return;
            switchTab(tab.dataset.tab);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
})();
