import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar'; 
import Characters from './componentes/Characters'; 
import CharacterDetail from "./componentes/CharacterDetail";

function App() {
  const [characters, setCharacters] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const initialUrl = 'https://rickandmortyapi.com/api/character';

  const fetchCharacters = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results);
        }
      })
      .catch((error) => console.log(error));
  };
  

  useEffect(() => {
    let apiUrl = initialUrl;

    if (filterStatus) {
      apiUrl += `?status=${filterStatus}`;
    }
    if (filterGender) {
      apiUrl += `&gender=${filterGender}`;
    }

    fetchCharacters(apiUrl);
  }, [filterStatus, filterGender]);

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleFilterGender = (e) => {
    setFilterGender(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCharacters = characters.filter((character) => {
    const nameMatch = character.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = filterStatus ? character.status === filterStatus : true;
    const genderMatch = filterGender ? character.gender === filterGender : true;

    return nameMatch && statusMatch && genderMatch;
  });

  return (
    <>
      <Router>
      <Navbar brand={'Rick and Morty App'} />
      <div className="container mt-5">
        <h3>Listado de los personajes de la serie Rick y Morty con sus Datos😒✌️😂</h3> <br/>

        <div className="filters">
          <label htmlFor="statusFilter">Filtrar por estado:</label>
          <select id="statusFilter" value={filterStatus} onChange={handleFilterStatus}>
            <option value="">Todos</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>

          <label htmlFor="genderFilter">Filtrar por género:</label>
          <select id="genderFilter" value={filterGender} onChange={handleFilterGender}>
            <option value="">Todos</option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>

          <hr/>
          <br/>

          <label htmlFor="searchInput">Buscar por nombre:</label>
          <input id="searchInput" type="text" value={searchTerm} onChange={handleSearch} />
        </div>
        <br/>

        <Characters characters={filteredCharacters} />
      </div>

      <Routes>
        <Route path="/" element={<Characters characters={filteredCharacters} />} />
        <Route path="/characters/:id" element={<CharacterDetail characters={characters} />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;