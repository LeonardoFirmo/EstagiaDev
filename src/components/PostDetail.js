import styles from './PostDetail.module.css'
import { Link } from 'react-router-dom'

const PostDetail = ({post}) =>{
    return (
        <div className={styles.post_detail}>
            <img className={styles.post_img} src={post.image} alt={post.title} />
            <h2>{post.title.slice(0, 35)}</h2>
            <p className={styles.createdby}>Vaga postada por: {post.createdBy}</p>
            <div className={styles.tags}>
                
                {post.tagsArray.map((tag,i) =>(
                    <p key={i}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link to={`/posts/${post.id}`} className={styles.btnotline}>Ler Mais..</Link>

        </div>
    )
}

export default PostDetail