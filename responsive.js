// Mobile menu toggle and lazy image support
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (toggle && nav) {
        toggle.addEventListener('click', () => nav.classList.toggle('open'));
        // close when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
        });
    }

    // Simple lazy-loading fallback for imgs without native support
    const imgs = document.querySelectorAll('img[data-src]');
    if ('loading' in HTMLImageElement.prototype) {
        imgs.forEach(i => { i.src = i.dataset.src; i.removeAttribute('data-src'); });
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target; img.src = img.dataset.src; img.removeAttribute('data-src'); io.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });
        imgs.forEach(i => io.observe(i));
    }
});
