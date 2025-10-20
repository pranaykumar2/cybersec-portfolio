# Pranay Kumar - Cybersecurity Portfolio

A modern, interactive portfolio website showcasing cybersecurity expertise, projects, and certifications.

## 🚀 Features

- **Modern Sketchy Design** - Hand-drawn, creative UI theme
- **Interactive Terminal** - Animated terminal with typewriter effect in hero section
- **Floating Navbar** - Auto-hide/show navbar on scroll
- **Dynamic Spotify Player** - Random playlist selection on each page load
- **Contact Form with Email** - EmailJS integration for form submissions
- **Fully Responsive** - Works perfectly on all devices
- **Fast Loading** - Optimized loader animation

## 🛠️ Technologies

- HTML5
- CSS3 (Sketchy Theme)
- Vanilla JavaScript
- Bootstrap 5.3.2
- Font Awesome 6.4.2
- EmailJS
- Spotify Embed API

## 📧 Contact Form Setup

The contact form uses EmailJS to send emails. To set it up:

1. Create account at [EmailJS](https://www.emailjs.com/)
2. Connect your Gmail service
3. Create email template (see HTML template structure in code)
4. Get your Public Key, Service ID, and Template ID
5. Update `script.js` (lines ~385 & ~420) with your credentials:

```javascript
emailjs.init('YOUR_PUBLIC_KEY');
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
```

## 🎵 Spotify Integration

The footer includes a random Spotify playlist that changes on each page refresh. Playlists include:
- Rock
- EDM
- Pop
- Hip-hop

## 📱 Responsive Design

- Desktop: Full features with floating navbar
- Tablet: Optimized layout
- Mobile: Touch-friendly with adjusted navbar

## 🌐 Deployment

This is a static website that can be deployed to:

- **GitHub Pages** - Free and easy
- **Netlify** - Best for static sites
- **Vercel** - Fast deployment
- **Any web hosting** - Just upload files

### GitHub Pages Deployment:

1. Create a new repository on GitHub
2. Push these files to the repository
3. Go to Settings → Pages
4. Select branch and root folder
5. Your site will be live at `https://yourusername.github.io/repository-name`

## 📂 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # All JavaScript functionality
├── icons/              # Icon assets (if any)
└── README.md           # This file
```

## ✨ Key Sections

1. **Home** - Terminal animation with personal info
2. **About** - Bio, stats, and areas of interest
3. **Skills** - Technical skills with categories
4. **Projects** - Portfolio projects with GitHub links
5. **Certifications** - Professional certifications
6. **Contact** - Working contact form with EmailJS

## 🎨 Customization

To customize for your own use:

1. **Personal Info**: Update name, email, and links in `index.html`
2. **Colors**: Modify CSS variables in `styles.css` (root section)
3. **Projects**: Add/edit projects in the Projects section
4. **Skills**: Update skill categories and items
5. **Social Links**: Update LinkedIn, GitHub links in footer

## 📄 License

© 2025 Pranay Kumar. All rights reserved.

## 🤝 Contact

- **Email**: ypranaykumar1002@gmail.com
- **LinkedIn**: [linkedin.com/in/iamypranay](https://linkedin.com/in/iamypranay)
- **GitHub**: [github.com/pranaykumar2](https://github.com/pranaykumar2)

---

**Built with ❤️ and passion for cybersecurity**
