// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});

function smoothScroll(e) {
  e.preventDefault();
  
  const targetId = e.target.getAttribute('href');
  const targetPosition = document.querySelector(targetId).offsetTop;

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

// Form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  // Perform form validation and submit logic here

  // Clear form fields
  contactForm.reset();
}

// Add active class to the navigation link corresponding to the current section
window.addEventListener('scroll', highlightNavLink);

function highlightNavLink() {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);

      navLinks.forEach(link => {
        link.classList.remove('active');
      });

      navLink.classList.add('active');
    }
  });
}
