const Login = ({ userName }) => {
  return (
    <main className="container">
      <h1>Inicia sesion y se tu mismo {userName}</h1>
    </main>
  )
}

Login.getInitialProps = () => {
  return fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
}

export default Login