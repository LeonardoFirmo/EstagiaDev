import React from "react";
import styles from "./Login.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  async function handleSumit(e) {
    e.preventDefault();
    setError("");
    const user = {
      email,
      password,
    };

    await login(user);
  }

  
  useEffect(() => {
    
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  

  return (
    <div className={styles.login}>
      <h2>Entrar</h2>
      <p>Faça o Login para poder utilizar o sistema</p>
      <form onSubmit={handleSumit}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
