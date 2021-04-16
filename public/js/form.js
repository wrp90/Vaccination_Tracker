const formHandler = async (event) => {
  event.preventDefault();
  // login form
  // Collect values from the form
  //const name = document.querySelector('#name-signup').value.trim();
  const patientNum = document.querySelector('#patientNum-signup').value.trim();
  const vaccineName = document.querySelector('#vaccineName-signup').value.trim();
  const vaccineOne = document.querySelector('#vaccineOne-signup');
  const vaccineTwo = document.querySelector('#vaccineTwo-signup');
  const locationName = document.querySelector('#locationName-signup').value.trim();

  if (patientNum && vaccineName) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/patients/form', {
      method: 'POST',
      body: JSON.stringify({
        patient_number: patientNum,
        first_dose: vaccineOne.value,
        second_dose: vaccineTwo.value,
        vaccine_name: vaccineName,
        location_name: locationName
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};
document.querySelector('.form').addEventListener('submit', formHandler);
