const updateVisuals = (step) => {
    const svg = document.getElementById('main-svg');
    const gMap = document.getElementById('germany-map');
    const bDetail = document.getElementById('berlin-detail');
    [gMap, bDetail].forEach(el => el.classList.remove('visible'));
    if (step === 'map-germany') {
        gMap.classList.add('visible');
        svg.style.transform = 'scale(1) rotate(-1deg)';
    } else if (step === 'map-berlin') {
        bDetail.classList.add('visible');
        svg.style.transform = 'scale(1.55) translateX(-15px) rotate(0deg)';
    }
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const card = entry.target.querySelector('.narrative-card');
        if (entry.isIntersecting) {
            updateVisuals(entry.target.getAttribute('data-step'));
            if (card) card.classList.remove('inactive');
        } else {
            if (card) card.classList.add('inactive');
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('section[data-step]').forEach(s => observer.observe(s));
