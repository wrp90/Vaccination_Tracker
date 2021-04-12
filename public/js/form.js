const formHandler = (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = document.querySelector('#name-signup').value.trim();
  const patientNum = document.querySelector('#patientNum-signup').value.trim();
  const vaccineName = document.querySelector('#vaccineName-signup').value.trim();
  const vaccineOne = document.querySelector('#vaccineOne-signup');
  const vaccineTwo = document.querySelector('#vacccineTwo-signup');
  const locationName = document.querySelector('#locationName-signup').value.trim();
  if (name && patientNum && vaccineName) {
    // Send a POST request to the API endpoint
    try {
      const response = /*await*/ fetch('/form', {
        method: 'POST',
        //TODO: Replace 'name' with logged username name
        body: JSON.stringify({
          name: 'Shawn',
          patient_number: patientNum,
          vaccine_name: vaccineName,
          vaccine_one: vaccineOne,
          vaccine_two: vaccineTwo,
          location_name: locationName
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (e) {
      console.log(e);
//     const response = fetch('/form', {
//       method: 'POST',
//       body: JSON.stringify({ name, patientNum, vaccineName, vaccineOne, vaccineTwo }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     console.log(response);
//     if (response.ok) {
//       // If successful, redirect the browser to the profile page
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
    }
    // if (response.ok) {
    //   // If successful, redirect the browser to the profile page
    //   document.location.replace('/');
    // } else {
    //   alert(response.statusText);
    // }
  }
};

document.querySelector('.form').addEventListener('submit', formHandler);

