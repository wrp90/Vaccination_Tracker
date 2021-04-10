const formHandler = (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = document.querySelector('#name-signup').value.trim();
  const patientNum = document.querySelector('#patientNum-signup').value.trim();
  const vaccineName = document.querySelector('#vaccineName-signup').value.trim();
  const vaccineOne = document.querySelector('#vaccineOne-signup');
  const vaccineTwo = document.querySelector('#vacccineTwo-signup');

  if (name && patientNum && vaccineName) {
    // Send a POST request to the API endpoint
    const response = fetch('/form', {
      method: 'POST',
      body: JSON.stringify({ name, patientNum, vaccineName, vaccineOne, vaccineTwo }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.form').addEventListener('submit', formHandler);