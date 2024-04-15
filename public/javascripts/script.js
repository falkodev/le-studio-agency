window.addEventListener('scroll', () => {
  document.body.style.setProperty('--scroll', window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
}, false);

window.addEventListener('submit', async (evt) => {
  try {
    evt.preventDefault();

    const form = evt.target;

    fetch(form.action, {
      method: form.method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: form.elements.email.value,
        message: form.elements.message.value
      })
    }).then((data) => {
      data.json().then((response) => {
        if (response.success) {
          document.querySelector('form').reset();
          document.querySelector('.u-form-send-success').style.display = 'block';
          setTimeout(() => {
            document.querySelector('.u-form-send-success').style.display = 'none';
          }, 5000);
        }
      })
    })
  } catch (error) {
    console.error(error)
    document.querySelector('.u-form-send-error').style.display = 'block';
    setTimeout(() => {
      document.querySelector('.u-form-send-error').style.display = 'none';
    }, 5000);
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
