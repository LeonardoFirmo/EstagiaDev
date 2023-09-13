import {useState,useEffect} from 'react'
import styles from './Register.module.css'
import { useAuthentication } from '../../hooks/useAuthentication';

function Register() {

  const [displayName,setDisplayName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState("")

  const {createUser, error:authError, loading } = useAuthentication();
  
  async function handleSumit (e){
    e.preventDefault()

    setError("");
    const user = {
      displayName,
      email,
      password
    }
  
    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return
    }
    
    await createUser(user)
   
  }


  useEffect(()=>{
  
    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div className={styles.register}>
      <h2>Cadastre-se para postar</h2>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSumit}>
        <label>
          <span>Nome:</span>
          <input 
          type="text" 
          name='displayName' 
          required 
          placeholder='Nome do usuário '
          onChange={(e)=> setDisplayName(e.target.value)}
          value={displayName}
          />
        </label>
        <label>
          <span>Email:</span>
          <input 
          type="email" 
          name='email' 
          required 
          placeholder='E-mail do usuário ' 
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
          type="password" 
          name='password' 
          required 
          placeholder='Insira sua senha ' 
          onChange={(e)=> setPassword(e.target.value)}
          value={password}
          />
        </label>
        <label>
          <span>Confirmação de Senha:</span>
          <input 
          type="password" 
          name='confirmPassword' 
          required 
          placeholder='Confirme a sua senha ' 
          onChange={(e)=> setConfirmPassword(e.target.value)}
          value={confirmPassword}
          />
        </label>

        {!loading &&  <button className='btn'>Cadastrar</button>}
        {loading &&  <button className='btn' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
        
      </form>
    </div>
  )
}

export default Register