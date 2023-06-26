import { useParams } from 'react-router-dom';

const CharacterDetail = ({ characters }) => {
  const { id } = useParams();
  const character = characters.find(item => item.id === parseInt(id));

  if (!character) {
    return <div>Personaje no encontrado</div>;
  }

  return (
    <div>
      <h3>{character.name}</h3>
      <img src={character.image} alt={character.name} />
      <p>Especie: {character.species}</p>
    </div>
  );
};

export default CharacterDetail;
