const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const date_of_birth = document.querySelector('#dob-signup').value.trim();

  if (name && email && password && date_of_birth) {
    const response = await fetch('/api/patients/', {
      method: 'POST',
      body: JSON.stringify({ name, email, date_of_birth, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/form');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);