const backButton = document.getElementById("back-button");

backButton.addEventListener("click", goBack);

function goBack() {
  window.location.href = `index.html`;
}
