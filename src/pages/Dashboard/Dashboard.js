import React from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

// hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  // posts do usuário
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.dashboard}>
      <h2>Minhas vagas</h2>
      <p>Gerencie as suas vagas</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontradas vagas</p>
          <Link to="/posts/create" className="btn">
            Criar primeira vaga
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <>
            <div className={styles.post_header_spans}>
              <span>Título da vaga</span>
              <span>Ações</span>
            </div>

            {posts &&
              posts.map((post) => (
                <div key={post.id} className={styles.post_row}>
                  <p>
                    {" "}
                    {post.title.length > 18 ? post.title.slice(0, 20) + "..." : post.title  }
                    
                  </p>
                  <div className={styles.post_actions}>
                    <Link to={`/posts/${post.id}`} className="btn btn-outline">
                      Ver
                    </Link>
                    <Link
                      to={`/posts/edit/${post.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteDocument(post.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
          </>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
