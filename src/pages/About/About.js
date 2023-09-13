import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Estagia<span>Dev</span>
      </h2>
      <p>
        Este projeto é um sistema de cadastro de vagas de estágio desenvolvido
        utilizando a tecnologia React no front-end e Firebase no back-end.
      </p>
      <p>
        Sua principal missão é fornecer uma plataforma que visa não apenas
        auxiliar novos profissionais em busca de oportunidades de estágio na
        área, mas também criar uma comunidade colaborativa.
      </p>
      <p>
        Neste ambiente, pessoas em busca de estágios têm a chance de
        compartilhar vagas entre si, mesmo que uma vaga específica não seja
        adequada para elas, possibilitando que a busca por oportunidades seja
        uma experiência mais inclusiva e colaborativa.
      </p>

      <Link to="/" className="btn">
        Ver vagas
      </Link>
    </div>
  );
}

export default About;
