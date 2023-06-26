import React from 'react';

const Characters = ({ characters = [] }) => {
  return (
    <div className="row">
      {characters.map((item, index) => (
        <div key={index} className="col mb-4">
          <div className="card" style={{ minWidth: '200px' }}>
            <img src={item.image} alt="" />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <hr />
              <p>Estado: {item.status}</p>
              <p>Especie: {item.species}</p>
              <p>Género: {item.gender}</p>
              <p>Origen: {item.origin.name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;