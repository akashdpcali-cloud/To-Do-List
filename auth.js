const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');



togglePassword.addEventListener('click', () => {
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    togglePassword.textContent = '👓';
  } else {
    passwordInput.type = 'password';
    togglePassword.textContent = '🕶️';
  }
});

const signupForm = document.getElementById('signup-form')

signupForm?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = document.getElementById('username').value
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    const response = await axios.post('http://localhost:5000/auth/register', {
      username,
      email,
      password
    })

    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      window.location.href = './Todolist.html'
    }

  } catch (error) {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'block'
    errorDiv.textContent = error.response?.data?.message || 'Account already exists'
  }

})

const loginForm = document.getElementById('login-form')

loginForm?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    const response = await axios.post('http://localhost:5000/auth/login', {
      email,
      password
    })

    if (response.data.success) {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      window.location.href = './Todolist.html'
    }

  } catch (error) {
    const errorDiv = document.querySelector('.error')
    errorDiv.style.display = 'block'
    errorDiv.textContent = error.response?.data?.message || 'Invalid email or password'
  }

})