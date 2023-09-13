import React from 'react'
import styles from "./Home.module.css"
import {Link} from "react-router-dom"
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import PostDetail from '../../components/PostDetail'
import SearchInput from '../../components/SearchInput';


function Home() {
  const {documents:posts, loading} = useFetchDocuments("posts")


  return (
    <div className={styles.home}>
      <h1>Veja as nossas vagas mais recentes</h1>
      <SearchInput/>

      <div className={styles.postsflx} >
        {loading && <p>Carregando...</p>}
        
        {posts && posts.map(post => (
          <PostDetail key={post.id} post={post} className={styles.postfx}/>

        ))}
    
        {posts && posts.length === 0 && (
          <div className={styles.noposts}> 
            <p>Você ainda não postou vagas..</p>
            <Link to="/posts/create" className='btn'>Criar primeira vaga</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home