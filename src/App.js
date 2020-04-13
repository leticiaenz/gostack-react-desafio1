import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo Repositório ${Date.now()}`,
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {}

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li>
      </ul>

      {repositories.map((repository) => (
        <li key={repository.id}>{repository.title}</li>
      ))}
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
