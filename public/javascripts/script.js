window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

window.addEventListener('submit', async (evt) => {
  try {
    evt.preventDefault();

    const submitButton = document.querySelector('input[type="submit"]');
    submitButton.disabled = true;

    const form = evt.target;
    const message = form.elements.message.value;
    if (!message || message.includes('<') || message.includes('http') || message.includes('href') || message.includes('src') || message.length < 20 || message.length > 500) {
      document.querySelector('.u-form-send-error').style.display = 'block';
      setTimeout(() => {
        document.querySelector('.u-form-send-error').style.display = 'none';
      }, 5000);
      return;
    }

    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.elements.email.value,
        message: form.elements.message.value,
        token: form.elements['cf-turnstile-response'].value,
      })
    }).then((data) => {
      data.json().then((response) => {
        if (response.success) {
          document.querySelector('form').reset();
          document.querySelector('.u-form-send-success').style.display = 'block';
          setTimeout(() => {
            document.querySelector('.u-form-send-success').style.display = 'none';
          }, 5000);
        } else {
          throw new Error('An error occurred');
        }
      })
    })
  } catch (error) {
    console.error(error)
    document.querySelector('.u-form-send-error').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.u-form-send-error').style.display = 'none';
    }, 5000);
  } finally {
    submitButton.disabled = false;
  }
}, false);

transition('.hidden-horizontally', 'show-horizontally')
transition('.u-section-3 .hidden-vertically', 'show-vertically')
transition('.u-section-8 .hidden-vertically', 'show-vertically')

function transition(selector, className) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        entry.target.classList.remove(className);
      }
    });
  });

  const elements = document.querySelectorAll(selector);
  elements.forEach((element, i) => {
    element.style.transitionDelay = i * 200 + "ms";
    observer.observe(element);
  });
}
