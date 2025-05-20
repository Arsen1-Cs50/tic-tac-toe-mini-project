const video = document.getElementById('introVideo');
const intro = document.getElementById('intro');
const app = document.getElementById('app');


window.addEventListener('DOMContentLoaded', () => {
    const hasPlayedIntro = sessionStorage.getItem('introPlayed');

    if (hasPlayedIntro) {
        intro.style.display = 'none';
        app.classList.add('fade-in');
        app.classList.remove('hidden');
        
    } else {
        video.addEventListener('ended', () => {
            intro.classList.add('fade-out');
            app.classList.add('fade-in');

            setTimeout(() => {
                intro.style.display = 'none';
                app.classList.remove('hidden');
                document.body.style.overflow = 'auto';
                sessionStorage.setItem('introPlayed', 'true');
            }, 600); 
        });
    }
});


function selectMode(mode) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        if (mode === '1p') {
            window.location.href = '1p.html';
        } else if (mode === '2p') {
            window.location.href = '2p.html';
        }
    }, 600); 
}
