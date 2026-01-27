document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMagneticElements();
  initSpotifyPlayer();
  initDate();

  // Animate Hero text on load
  const spans = document.querySelectorAll('.hero-text span');
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.style.transition = 'opacity 0.8s, transform 0.8s';
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
});

// 1. Custom Cursor (Inverted)
function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  // Only on desktop
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot follows instantly
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Circle follows with slight delay (using GSAP if available, else CSS transition)
      if (typeof gsap !== 'undefined') {
        gsap.to(cursorCircle, {
          x: posX,
          y: posY,
          duration: 0.15,
          ease: "power2.out",
          left: 0, // Reset these as GSAP handles transform
          top: 0
        });
      } else {
        cursorCircle.style.left = `${posX}px`;
        cursorCircle.style.top = `${posY}px`;
      }
    });

    // Hover effects
    const interactiveElements = document.querySelectorAll('a, button, .magnetic');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('active');
      });
    });
  }
}

// 2. Magnetic Elements
function initMagneticElements() {
  if (typeof gsap === 'undefined') return;

  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', function (e) {
      const rect = magnet.getBoundingClientRect();
      // Calculate distance from center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Move element towards mouse (strength 0.3)
      gsap.to(magnet, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    magnet.addEventListener('mouseleave', function () {
      // Spring back
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

// 3. Spotify Player
function initSpotifyPlayer() {
  // Minimal playlist selection
  const playlists = [
    { uri: 'spotify:playlist:37i9dQZF1DWXRqgorJj26U' }, // Cyberpunk
    { uri: 'spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n' }  // Coding Mode
  ];

  const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
  const container = document.getElementById('spotify-embed-container');

  if (container) {
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '0'; // Sharp corners for minimal theme
    iframe.src = `https://open.spotify.com/embed/playlist/${randomPlaylist.uri.split(':')[2]}?utm_source=generator&theme=0`;
    iframe.width = '100%';
    iframe.height = '80'; // Very compact
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';

    container.appendChild(iframe);
  }
}

function initDate() {
  // No year element in new HTML, but good to have logic ready
}
