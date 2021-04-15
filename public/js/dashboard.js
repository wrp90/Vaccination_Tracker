const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
// Get the modal
const modal = document.getElementById('vaccineModal');
// Get the button that opens the modal
const btn = document.getElementById('myBtn');
// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block';
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};



async function getChartData() {
  await fetch('/api/patients/chart', {
    method: 'GET',
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }).then(function(response){
    const doseTotal = [parseInt(response[0].firstDose[0]), parseInt(response[0].secondDose[0])];
    return doseTotal;
  }).then(function(endResponse){
    const config = {
      type: 'bar',
      data: {
        labels: ['First Dose', 'Fully Vaccinated'],
        datasets: [{
          label: 'Vaccination Data',
          data: endResponse,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
    new Chart(ctx, config);
  });
}

getChartData();
