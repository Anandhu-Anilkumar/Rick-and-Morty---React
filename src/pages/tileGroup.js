import { useState, useEffect } from 'react';
import "./../../src/App.scss";

function TileGroup() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [charOrigin, setCharOrigin] = useState(null);
  const [charLocation, setCharLocation] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch character data
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
        setIsLoading(true);
      })
      .catch(error => console.log(error));
  }, []);

  // if user clicks on tile, flip the tile
  const flipTile = () => {
    setShowContent(!showContent);
  }

  function handleTileClick(originDimension, currentDimension) {
    // Fetch location data for the character's origin URL
    fetch(originDimension)
      .then(response => response.json())
      .then(data => setCharOrigin(data))
      .catch(error => console.log(error));

    // Fetch location data for the character's current location URL
    fetch(currentDimension)
      .then(response => response.json())
      .then(data => setCharLocation(data))
      .catch(error => console.log(error));

    flipTile();
  }

  // open modal when user clicks on any tile
  const modalOpen = () => {
    setShowModal(true);
  };

  // close modal when user clicks on close button
  const modalClose = () => {
    setShowModal(false);
  };


  return (

    isLoading ? (

      <div className="rm-characters">
        <div className="rm-content-wrapper">
          <div className="rm-characters__wrapper">
            {/* Open modal when user clicks on any tile */}
            {characters.map((character, index) => (
              <div key={character.id} className="rm-characters__item" onClick={modalOpen}>
                {/* flip tile when user clicks on it */}
                <div className="rm-characters__flip" onClick={() => handleTileClick(character.origin.url, character.location.url)}>
                  {/* if boolean flag is set true, show image; else show content */}
                  {showContent ?
                    <img className="rm-characters__image" src={character.image} alt={character.name} /> :
                    <div className="rm-characters__details">
                      <div className="rm-characters__location">
                        <span className="rm-characters__place">
                          <a className="rm-characters__url" href={character.origin.url}>Origin Location</a>
                        </span>
                        <ul className="rm-characters__list">
                          <li className="rm-characters__list-item">{character.origin.name}</li>
                          <li className="rm-characters__list-item">Dimension: {charOrigin[index].dimension}</li>
                          <li className="rm-characters__list-item">Amount of residents: {charOrigin[index].residents.length}</li>
                        </ul>
                      </div>
                      <div className="rm-characters__location">
                        <span className="rm-characters__place">
                          <a className="rm-characters__url" href={character.location.url}>Current Location</a>
                        </span>
                        <ul className="rm-characters__list">
                          <li className="rm-characters__list-item">{character.location.name}</li>
                          <li className="rm-characters__list-item">Dimension: {charLocation[index].dimension}</li>
                          <li className="rm-characters__list-item">Amount of residents: {charLocation[index].residents.length}</li>
                        </ul>
                      </div>
                    </div>
                  }
                </div>
                <div className="rm-characters__content">
                  <h3 className="rm-characters__name">{character.name}</h3>
                  <p className="rm-characters__highlights rm-characters__highlights--gender">{character.gender}</p>
                  <p className="rm-characters__highlights rm-characters__highlights--species">{character.species}</p>
                  <p className="rm-characters__highlights rm-characters__highlights--status">{character.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <div className="rm-characters__modal">
            <h4 className="rm-characters__heading">Chapters the character is featured in</h4>
            <span className="rm-characters__close" onClick={modalClose} />
            <div className="rm-characters__episodes">
              <a className="rm-characters__episode" href="sc.com">Test Episode</a>
            </div>
          </div>
        )}
      </div>
    )
      :
      (
        <div className="rm-content-wrapper">
          <div className="progress">
            <div className="progress__bar" />
            <p className="progress__label">Don't blink or you might miss it.......!!</p>
          </div>
        </div>
      )
  );
}

export default TileGroup;
