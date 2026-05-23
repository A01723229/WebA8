import { useState } from 'react'

export default function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.login) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        setUser(data.user)
      } else {
        setError('Usuario o contraseña incorrectos')
      }
    } catch {
      setError('No se pudo conectar al servidor')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  if (token) {
    return (
      <div>
        <h2>Bienvenido{user ? `, ${user.name || user.username}` : ''}</h2>
        <p>Token: <code>{token.slice(0, 20)}...</code></p>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
    )
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
