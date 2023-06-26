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


  var form = document.getElementById("contact-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)
  
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
