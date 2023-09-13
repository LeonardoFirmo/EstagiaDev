import React from 'react'
import styles from './SearchInput.module.css'
import {useNavigate} from "react-router-dom"
import { useState } from 'react'

function SearchInput() {
    const [query,setQuery] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
    
        if(query){
          return navigate(`/search?q=${query}`)
        }
      }

  return (
    <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
        type="text" 
        placeholder='Ou busque por tags'
        onChange={(e)=> setQuery(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar</button>
    </form>
  )
}

export default SearchInput