document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initMagneticElements();
  initMobileMenu();
  initSpotifyPlayer();
  initDate();

  const spans = document.querySelectorAll('.hero-text span');
  spans.forEach((span, index) => {
    setTimeout(() => {
      span.style.transition = 'opacity 0.8s, transform 0.8s';
      span.style.opacity = '1';
      span.style.transform = 'translateY(0)';
    }, 100 + (index * 100));
  });
});

function initCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      if (typeof gsap !== 'undefined') {
        gsap.to(cursorCircle, {
          x: posX,
          y: posY,
          duration: 0.15,
          ease: "power2.out",
          left: 0,
          top: 0
        });
      } else {
        cursorCircle.style.left = `${posX}px`;
        cursorCircle.style.top = `${posY}px`;
      }
    });

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

function initMagneticElements() {
  if (typeof gsap === 'undefined') return;

  const magnets = document.querySelectorAll('.magnetic');

  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', function (e) {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(magnet, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    magnet.addEventListener('mouseleave', function () {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}

function initSpotifyPlayer() {
  const playlists = [
    { uri: 'spotify:playlist:37i9dQZF1DWXRqgorJj26U' },
    { uri: 'spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n' }
  ];

  const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
  const container = document.getElementById('spotify-embed-container');

  if (container) {
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '12px';
    iframe.src = `https://open.spotify.com/embed/playlist/${randomPlaylist.uri.split(':')[2]}?utm_source=generator&theme=0`;
    iframe.width = '100%';
    iframe.height = '152'; // Improved standard height
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';

    container.appendChild(iframe);
  }
}

function initDate() {
}

function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const closeBtn = document.querySelector('.mobile-menu-close');
  const links = document.querySelectorAll('.mobile-link');

  if (toggleBtn && overlay && closeBtn) {
    toggleBtn.addEventListener('click', () => {
      overlay.classList.add('active');
      toggleBtn.classList.add('hidden');
    });
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      toggleBtn.classList.remove('hidden');
    });
    links.forEach(link => {
      link.addEventListener('click', () => {
        overlay.classList.remove('active');
        toggleBtn.classList.remove('hidden');
      });
    });
  }
}

// Function to Copy Email
function copyEmail() {
  const emailText = document.getElementById('email-text').innerText;
  navigator.clipboard.writeText(emailText).then(() => {
    const trigger = document.querySelector('.email-clipboard-trigger');
    trigger.classList.add('copied');

    setTimeout(() => {
      trigger.classList.remove('copied');
    }, 2000); // Reset after 2s
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}
