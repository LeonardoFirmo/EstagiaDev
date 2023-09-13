import styles from "./CreatePost.module.css";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

function Createpost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [local, setLocal] = useState("");
  const [requisitos, setRequisitos] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")
    let isFormValid = true;

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
      isFormValid = false;
    
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

    if(!title || !image || !tags || !body){
      setFormError("Por favor, preencha todos os campos!")
    }
    
    if (isFormValid) {
      insertDocument({
        title,
        image,
        body,
        link,
        local,
        requisitos,
        tagsArray,
        uid:user.uid,
        createdBy:user.displayName
      })
      navigate("/")
    }
    
  };

  return (
    <div className={styles.create_post}>
      <h2>Cadastrar vaga</h2>
      <p>Escreva sobre os detalhes da vaga que quer compartilhar!</p>

      <form onSubmit={handleSubmit} className={styles.create_post_form}>
        <label>
          <span>Título da vaga:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Digite o título da vaga"
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
            placeholder="Insira uma imagem sobre sua vaga"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>

        <label>
          <span>Conteúdo</span>
          <textarea
            name="body"
            required
            placeholder="Insira o conteúdo da vaga"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            rows="5"
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
            placeholder="Insira as Linguagens (separadas por vírgula e sem #)"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>

        
        {!response.loading &&  <button className='btn'>Cadastrar</button>}
        {response.loading &&  <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}


      </form>
    </div>
  );
}

export default Createpost;
