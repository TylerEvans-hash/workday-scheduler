// Displays current date to top of application
var dateEl = document.getElementById('currentDay');
dateEl.textContent = moment().format("dddd, MMMM Do YYYY");
console.log(moment().format("dddd, MMMM Do YYYY"));

