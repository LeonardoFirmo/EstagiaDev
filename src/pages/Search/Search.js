import React from "react";
import styles from "./Search.module.css";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail";
import { Link } from "react-router-dom";

import SearchInput from "../../components/SearchInput";

function Search() {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);
  

  return (
    <div className={styles.search_container}>
      
      <h2>Vagas Encontradas</h2>
      <SearchInput/>
      <div>
  

        {posts === null && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts a partir da sua busca.</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}

        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default Search;
