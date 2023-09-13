import styles from "./EditPost.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
// import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";


function EditPost() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [local, setLocal] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthValue();
 

  useEffect(() => {
    if (post) {
      
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setLink(post.link)
      setLocal(post.local)
      setRequisitos(post.requisitos)

      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    let isFormValid = true;

    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.");
      isFormValid = false;
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    if (isFormValid) {
      const data = {
        title,
        image,
        body,
        link,
        local,
        requisitos,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
      }
      updateDocument(id,data);
      navigate("/dashboard");
    }
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando vaga</h2>
          <p>alterando a vaga:</p>

          <form onSubmit={handleSubmit}>
            <label>
              <span>Título da vaga:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Digite seu título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem sobre o seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
            <label>
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                rows="5"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>

            <label>
          <span>Link:</span>
          <input
            type="text"
            name="link"
            required
            placeholder="Insira o Link da vaga"
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />
        </label>

        <label>
          <span>Local da vaga:</span>
          <input
            type="text"
            name="local"
            required
            placeholder="Insira o Local e a Modalidade da vaga"
            onChange={(e) => setLocal(e.target.value)}
            value={local}
          />
        </label>

        <label>
          <span>Requisitos:</span>
          <input
            type="text"
            name="requisitos"
            required
            placeholder="Insira os Requisitos da vaga"
            onChange={(e) => setRequisitos(e.target.value)}
            value={requisitos}
          />
        </label>

            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira as tags(separadas por vírgula e sem #)"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
}

export default EditPost;
