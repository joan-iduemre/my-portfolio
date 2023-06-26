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




const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('my-form-status');
 

function showSuccessMessage(message) {
  formStatus.innerHTML = message;
  formStatus.className = 'alert-success';
  formStatus.style.display = 'block';
}

function showErrorMessage(message) {
  formStatus.innerHTML = message;
  formStatus.className = 'alert-error';
  formStatus.style.display = 'block';
}

function hideFormStatus() {
  formStatus.innerHTML = '';

  // Show the form status element
  formStatus.style.display = 'block';

  // Hide the form status element after 5 seconds
  setTimeout(function() {
    formStatus.style.display = 'none';
  }, 5000);
}

contactForm.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const formData = new FormData(event.target);
    const response = await fetch(event.target.action, {
      method: event.target.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // formStatus.innerHTML = 'Thanks for your submission!';

      showSuccessMessage( 'Thanks for your submission!');
      
      contactForm.reset();
    } else {
      const responseData = await response.json();
      const errorMessage = responseData.errors
        ? responseData.errors.map(error => error.message).join(', ')
        : 'Oops! There was a problem submitting your form';
      // formStatus.innerHTML = errorMessage;
      showErrorMessage(errorMessage)
    }
  } catch (error) {
    // formStatus.innerHTML = 'Oops! There was a problem submitting your form';
      showErrorMessage( 'Oops! There was a problem submitting your form' )

    
  }
  
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
