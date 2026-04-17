
export function showSpinner() {
    const spinner = document.getElementById("spinner");

  spinner.classList.remove("hidden");
}

export function hideSpinner() {
    const spinner = document.getElementById("spinner");

  spinner.classList.add("hidden");
}