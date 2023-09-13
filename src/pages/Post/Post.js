import React from 'react'
import styles from './Post.module.css'
import moment from 'moment';
import { useParams } from 'react-router-dom'

import { useFetchDocument } from '../../hooks/useFetchDocument';

function Post() {
    const {id} = useParams();
    
    
    const {document:post,loading} = useFetchDocument("posts",id)
    let dataFormatada ="";
    if(post){
      const segundosCriacao = post.createdAt.seconds;
      const dataCriacao = moment.unix(segundosCriacao);
      dataFormatada = dataCriacao.format('DD/MM/YYYY');
    }
    
  return (
    
    <div className={styles.post_container}>
        {loading && <p>Carregando vagas...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <p><b>Data:</b> {dataFormatada}</p>
                <img src={post.image} alt={post.title} />
                

                <p>{post.body}</p>

                <p><b>Local e Modalidade:</b></p>
                <p>{post.local}</p>

                <p><b>Requisitos:</b>  </p>
                <p>{post.requisitos}</p>

                <p><b>Link</b> </p>
                <p><a href={post.link}>{post.link}</a></p>

                <h3>hashtags:</h3>
               <div className={styles.tags}>
               {post.tagsArray.map((tag)=>(
                  <p key={tag}><span>#</span>{tag}</p>
                ))}
               </div>

            </>
        )}
    </div>
  )
}

export default Post