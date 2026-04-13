export function showMessage(message, type = 'info') {
    const showErrorMessage = document.querySelector('.div-container-error')
    const displayMessage = document.querySelector('.div-container-display')

    displayMessage.innerHTML = message

    // remove old bg classes first
    showErrorMessage.classList.remove(
        'bg-green-300/40',
        'bg-red-300/40',
        'bg-blue-300/40',
        'left-[100%]'
    )

if (type === 'success') {
    showErrorMessage.classList.add('bg-green-300/40',)
} 
else if (type === 'error') {
    showErrorMessage.classList.add('bg-red-300/40')
} 
else {
    showErrorMessage.classList.add('bg-blue-300/40')
}

    showErrorMessage.classList.remove('hidden')

    setTimeout(() => {
        showErrorMessage.classList.add('hidden')
    }, 3000)
}