import { showMessage } from "../scripts/showMessage.js";

const form = document.querySelector('.login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('.email').value.trim();
  const password = document.querySelector('.password').value.trim();

  // 🔴 validation
  if (!email || !password) {
    showMessage('Please fill all fields');
    return;
  }

  try {
    showMessage('Logging in...', 'info');

    const res = await fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showMessage(data.message || 'Login failed', 'error');
      return;
    }

    // ✅ SUCCESS
    localStorage.setItem('isAdmin', 'true');

    showMessage('Login successful 🎉', 'success');

    // redirect after short delay
    setTimeout(() => {
      window.location.href = "../admin.html";
    }, 1000);

  } catch (error) {
    console.error(error);
    showMessage('Server error. Try again.', 'error');
  }
});