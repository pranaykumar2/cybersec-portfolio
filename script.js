window.addEventListener('load', function() {
  const loaderWrapper = document.querySelector('.loader-wrapper');
  if (loaderWrapper) {
    setTimeout(() => {
      loaderWrapper.classList.add('fade-out');
      setTimeout(() => {
        loaderWrapper.remove();
      }, 500);
    }, 500);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  initTerminalTypewriter();
  initTypedText();
  initScrollAnimations();
  initSmoothScrolling();
  initFloatingNavbar();
  updateNavOnScroll();
  initContactForm();
  initProgressBars();
  initScrollTopButton();
  updateYear();
  initSpotifyPlayer();
});

function initFloatingNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  navbar.classList.add('navbar-floating');
  navbar.classList.add('scrolled-up');

  let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
  let ticking = false;

  function onScroll() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScroll <= 50) {
          navbar.classList.remove('scrolled-down');
          navbar.classList.add('scrolled-up');
        } else if (currentScroll > lastScroll) {
          navbar.classList.remove('scrolled-up');
          navbar.classList.add('scrolled-down');
        } else {
          navbar.classList.remove('scrolled-down');
          navbar.classList.add('scrolled-up');
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  document.querySelectorAll('.navbar .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('.navbar-collapse');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap && bootstrap.Collapse ? bootstrap.Collapse.getInstance(collapse) : null;
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

function initTerminalTypewriter() {
  const commandElement = document.getElementById('command-text');
  const outputElement = document.getElementById('terminal-output');
  const cursor = document.querySelector('.terminal-cursor');
  
  if (!commandElement || !outputElement) return;
  
  const command = 'whoami';
  const userInfo = [
    { label: 'Name:', value: 'Pranay Kumar' },
    { label: 'Age:', value: '21 years' },
    { label: 'Expertise:', value: 'Cybersecurity' },
    { label: 'Location:', value: 'Remote | Global' },
    { label: 'Education:', value: 'B.Tech. Computer Science' },
    { label: 'Status:', value: 'Available for Hire' }
  ];
  
  let commandIndex = 0;
  let outputIndex = 0;
  let charIndex = 0;
  
  function typeCommand() {
    if (commandIndex < command.length) {
      commandElement.textContent += command[commandIndex];
      commandIndex++;
      setTimeout(typeCommand, 100);
    } else {
      cursor.style.display = 'none';
      setTimeout(showOutput, 500);
    }
  }
  
  function showOutput() {
    if (outputIndex < userInfo.length) {
      const line = document.createElement('div');
      line.className = 'terminal-output-line';
      const info = userInfo[outputIndex];
      line.innerHTML = `<span class="output-label">${info.label}</span> <span class="output-value">${info.value}</span>`;
      outputElement.appendChild(line);
      outputIndex++;
      setTimeout(showOutput, 300);
    } else {
      setTimeout(() => {
        const finalLine = document.createElement('div');
        finalLine.className = 'terminal-output-line';
        outputElement.appendChild(finalLine);
      }, 500);
    }
  }
  
  setTimeout(typeCommand, 1000);
}

function initTypedText() {
  const roles = [
    'Software Developer',
    'SOC Analyst',
    'Penetration Tester',
    'Digital Forensics'
  ];
  
  const typedTextElement = document.querySelector('.typed-text');
  if (!typedTextElement) return;
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;
  
  function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let timeout = isDeleting ? deleteSpeed : typeSpeed;
    
    if (!isDeleting && charIndex === currentRole.length) {
      timeout = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      timeout = 500;
    }
    
    setTimeout(type, timeout);
  }
  
  type();
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        if (entry.target.classList.contains('about-content')) {
          animateStatCards();
        }
        
        if (entry.target.classList.contains('interests-section')) {
          animateInterestBadges();
        }
      }
    });
  }, observerOptions);
  
  const animatedElements = document.querySelectorAll(`
    .section-header,
    .about-image-container,
    .about-content,
    .interests-section,
    .skill-card,
    .project-card,
    .cert-card,
    .contact-card
  `);
  
  animatedElements.forEach(el => observer.observe(el));
}

function animateStatCards() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('visible');
      
      const numberElement = card.querySelector('.stat-number');
      const targetText = numberElement.textContent;
      const hasPlus = targetText.includes('+');
      const hasPercent = targetText.includes('%');
      const targetNumber = parseInt(targetText);
      
      if (!isNaN(targetNumber)) {
        let currentNumber = 0;
        const increment = targetNumber / 50;
        const timer = setInterval(() => {
          currentNumber += increment;
          if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
          }
          let displayText = Math.floor(currentNumber).toString();
          if (hasPlus) displayText += '+';
          if (hasPercent) displayText += '%';
          numberElement.textContent = displayText;
        }, 30);
      }
    }, index * 150);
  });
}

function animateInterestBadges() {
  const badges = document.querySelectorAll('.interest-badge');
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.classList.add('visible');
    }, index * 100);
  });
}

function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        updateActiveNavLink(targetId);
      }
    });
  });
}

function updateActiveNavLink(targetId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

function updateNavOnScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    updateActiveSectionInNav();
  }, { passive: true });
}

function updateActiveSectionInNav() {
  const sections = document.querySelectorAll('section[id]');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const scrollPosition = window.pageYOffset + navbarHeight + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function initProgressBars() {
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.skill-card').forEach(card => {
    progressObserver.observe(card);
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  emailjs.init('wyrZadIleVGW6dFLu'); 
  
  let captchaAnswer;
  generateCaptcha();
  
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    const captchaQuestion = document.getElementById('captchaQuestion');
    if (captchaQuestion) {
      captchaQuestion.textContent = `What is ${num1} + ${num2}?`;
    }
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const captchaInput = document.getElementById('captchaAnswer');
    const userAnswer = parseInt(captchaInput.value);
    
    if (userAnswer !== captchaAnswer) {
      alert('❌ Captcha answer is incorrect. Please try again.');
      generateCaptcha();
      captchaInput.value = '';
      return;
    }
    
    const submitBtn = document.getElementById('submitButton');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const successAlert = document.getElementById('formSuccess');
    const errorAlert = document.getElementById('formError');
    
    successAlert.classList.add('d-none');
    errorAlert.classList.add('d-none');
    
    btnText.classList.add('d-none');
    btnSpinner.classList.remove('d-none');
    submitBtn.disabled = true;

    emailjs.sendForm('service_cybersec2025', 'template_e1axppd', form)
      .then(function(response) {
        console.log('✅ SUCCESS!', response.status, response.text);
        
        successAlert.classList.remove('d-none');
        
        form.reset();
        generateCaptcha();
        
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          successAlert.classList.add('d-none');
        }, 5000);
      }, function(error) {
        console.error('❌ FAILED...', error);
        
        errorAlert.classList.remove('d-none');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          errorAlert.classList.add('d-none');
        }, 5000);
      })
      .finally(function() {
        btnText.classList.remove('d-none');
        btnSpinner.classList.add('d-none');
        submitBtn.disabled = false;
      });
  });
}

function updateYear() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initScrollTopButton() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallaxSpeed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function initSpotifyPlayer() {
  const playlists = [
    {
      name: 'Rock',
      uri: 'spotify:playlist:37i9dQZF1DWXRqgorJj26U'
    },
    {
      name: 'EDM',
      uri: 'spotify:playlist:37i9dQZF1DX4dyzvuaRJ0n'
    },
    {
      name: 'Pop',
      uri: 'spotify:playlist:37i9dQZF1DXcBWIGoYBM5M'
    },
    {
      name: 'Hip-hop',
      uri: 'spotify:playlist:37i9dQZF1DX0XUsuxWHRQd'
    }
  ];

  const randomPlaylist = playlists[Math.floor(Math.random() * playlists.length)];
  
  const container = document.getElementById('spotify-embed-container');
  
  if (container) {
    const iframe = document.createElement('iframe');
    iframe.style.borderRadius = '12px';
    iframe.src = `https://open.spotify.com/embed/playlist/${randomPlaylist.uri.split(':')[2]}?utm_source=generator&theme=0`;
    iframe.width = '100%';
    iframe.height = '352';
    iframe.frameBorder = '0';
    iframe.allowFullscreen = '';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    
    container.appendChild(iframe);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initTypedText,
    initScrollAnimations,
    initSmoothScrolling,
    initContactForm
  };
}
