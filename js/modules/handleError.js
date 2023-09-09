import { endLoadingState } from "./setLoadingState.js";

export const handleError = async (error, event) => {
  const alert = document.querySelector('.modal__alert');
  const alertBtn = alert.querySelector('button');
  const alertMessage = alert.querySelector(".modal__alert-descr");

  function closeAlert() {
    const searchBar = document.querySelector('.weather__search-input');
    searchBar.value = "";
    searchBar.focus();

    alert.classList.remove('show');
  }

  alertMessage.innerHTML = error;
  alert.classList.add('show');

  endLoadingState();

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeAlert();
    }
  })

  if (event === "Refresh Page") {
    alertButton.addEventListener("click", () => {
      location.reload();
    });
  } else {
    alertBtn.addEventListener('click', closeAlert);
  }
}