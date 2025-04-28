// 1. Form Validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (event) {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
        if (!name.value.trim()) {
          alert('Name is required.');
          isValid = false;
        }
        if (!email.value.trim() || !emailPattern.test(email.value)) {
          alert('Valid email is required.');
          isValid = false;
        }
        if (!message.value.trim()) {
          alert('Message is required.');
          isValid = false;
        }
  
        if (!isValid) {
          event.preventDefault();
        }
      });
    }
  });
  
  // 2. Lightbox/Modal for Gallery
  document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.gallery img');
    
    if (images.length > 0) {
      const modal = document.createElement('div');
      modal.id = 'modal';
      modal.style.display = 'none';
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';
      modal.innerHTML = '<img id=\"modalImg\" style=\"max-width:90%; max-height:80%; border-radius:10px;\">';
      document.body.appendChild(modal);
  
      images.forEach(img => {
        img.addEventListener('click', function () {
          const modalImg = document.getElementById('modalImg');
          modalImg.src = this.src;
          modal.style.display = 'flex';
        });
      });
  
      modal.addEventListener('click', function () {
        modal.style.display = 'none';
      });
    }
  });
  
  // 3. AJAX Load Featured Project
  document.addEventListener('DOMContentLoaded', function () {
    const featuredSection = document.getElementById('featuredProject');
    if (featuredSection) {
      fetch('data/featured.json')
        .then(response => response.json())
        .then(data => {
          featuredSection.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <img src=\"${data.image}\" alt=\"${data.title}\" style=\"max-width: 100%; height: auto; margin-top: 10px;\">
          `;
        })
        .catch(error => {
          console.error('Error loading featured project:', error);
        });
    }
  });
  