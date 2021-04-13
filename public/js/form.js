const formHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  //const name = document.querySelector('#name-signup').value.trim();
  const patientNum = document.querySelector('#patientNum-signup').value.trim();
  const vaccineName = document.querySelector('#vaccineName-signup').value.trim();
  const vaccineOne = document.querySelector('#vaccineOne-signup');
  const vaccineTwo = document.querySelector('#vacccineTwo-signup');
  const locationName = document.querySelector('#locationName-signup').value.trim();
  if (patientNum && vaccineName) {
    // Send a POST request to the API endpoint
    try {
      const response = await fetch('/form', {
        method: 'POST',
        //TODO: Replace 'name' with logged username name
        body: JSON.stringify({
          patient_number: patientNum,
          vaccine_name: vaccineName,
          first_dose: vaccineOne,
          second_dose: vaccineTwo,
          location_name: locationName
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.log(e);
      const response = fetch('/form', {
        method: 'POST',
        body: JSON.stringify({patientNum, vaccineName, vaccineOne, vaccineTwo, locaitonName }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response);
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
};
document.querySelector('.form').addEventListener('submit', formHandler);
