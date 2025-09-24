const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
const navItems = document.querySelectorAll('nav .nav-links li a');

navItems.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });
});
const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target); // optional: observe once
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  observer.observe(section);
});

       
