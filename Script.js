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
window.loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        // This gets the user's name automatically!
        const name = result.user.displayName; 
        
        await setDoc(doc(db, 'artifacts', lessonId, 'users', result.user.uid), {
            displayName: name,
            loginTime: new Date()
        }, { merge: true });

        document.getElementById('login-overlay').classList.add('hidden');
        document.getElementById('main-content').classList.remove('locked');
    } catch (error) {
        console.error("Google Login Failed", error);
    }
};
