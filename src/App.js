import './App.scss';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [originDimensions, setOriginDimensions] = useState([]);
  const [originResidents, setOriginResidents] = useState([]);
  const [locationDimensions, setLocationDimensions] = useState([]);
  const [locationResidents, setLocationResidents] = useState([]);
  const [showContent, setShowContent] = useState(true);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {

    // get data from API
    async function fetchData() {
      const response = await fetch('https://rickandmortyapi.com/api/character');
      const data = await response.json();
      setData(data);

      const originUrls = data.results.slice(0, data.length).map(result => result.origin.url);
      const locationUrls = data.results.slice(0, data.length).map(result => result.location.url);
      const originData = [], locationData = [];

      // fetch data for each location URL and store in arrays
      for (const url of originUrls) {
        const originResponse = await fetch(url);
        const origin = await originResponse.json();
        originData.push(origin);
      }
      setOriginDimensions(originData.map(origin => origin.dimension));
      setOriginResidents(originData.map(origin => origin.residents.length));

      for (const url of locationUrls) {
        const locationResponse = await fetch(url);
        const location = await locationResponse.json();
        locationData.push(location);
      }
      setLocationDimensions(locationData.map(location => location.dimension));
      setLocationResidents(locationData.map(location => location.residents.length));
    }
    fetchData();
  }, []);


  // if user clicks on tile, flip the tile
  const flipTile = () => {
    setShowContent(!showContent);
  }

  // open modal when user clicks on any tile
  const modalOpen = () => {
    setShowModal(true);
  };

  // close modal when user clicks on close button
  const modalClose = () => {
    setShowModal(false);
  };

  // execute the JSX only if data is received from API
  if (data.length !== 0) {

    return (
      <div className="rm-characters">
        <div className="rm-content-wrapper">
          <div className="rm-characters__wrapper">
            {/* Open modal when user clicks on any tile */}
            <div className="rm-characters__item" onClick={modalOpen}>
              {/* flip tile when user clicks on it */}
              <div className="rm-characters__flip" onClick={flipTile}>
                {/* if boolean flag is set true, show image; else show content */}
                {showContent ?
                  <img className="rm-characters__image" src={data.results[0].image} alt={data.results[0].image} /> :
                  <div className="rm-characters__details">
                    <div className="rm-characters__location">
                      <span className="rm-characters__place">
                        <a className="rm-characters__url" href={data.results[0].origin.url}>Origin Location</a>
                      </span>
                      <ul className="rm-characters__list">
                        <li className="rm-characters__list-item">{data.results[0].origin.name}</li>
                        <li className="rm-characters__list-item">Dimension: {originDimensions.length ? originDimensions[0] : ''}</li>
                        <li className="rm-characters__list-item">Amount of residents: {originResidents.length ? originResidents[0] : ''}</li>
                      </ul>
                    </div>
                    <div className="rm-characters__location">
                      <span className="rm-characters__place">
                        <a className="rm-characters__url" href={data.results[0].location.url}>Current Location</a>
                      </span>
                      <ul className="rm-characters__list">
                        <li className="rm-characters__list-item">{data.results[0].location.name}</li>
                        <li className="rm-characters__list-item">Dimension: {locationDimensions.length ? locationDimensions[0] : ''}</li>
                        <li className="rm-characters__list-item">Amount of residents: {locationResidents.length ? locationResidents[0] : ''}</li>
                      </ul>
                    </div>
                  </div>
                }
              </div>
              <div className="rm-characters__content">
                <h3 className="rm-characters__name">{data.results[0].name}</h3>
                <p className="rm-characters__highlights rm-characters__highlights--gender">{data.results[0].gender}</p>
                <p className="rm-characters__highlights rm-characters__highlights--species">{data.results[0].species}</p>
                <p className="rm-characters__highlights rm-characters__highlights--status">{data.results[0].status}</p>
              </div>
            </div>
          </div>
        </div>
        {showModal && (
          <div className="rm-characters__modal">
            <h4 className="rm-characters__heading">Chapters the character is featured in</h4>
            <span className="rm-characters__close" onClick={modalClose} />
            <div className="rm-characters__episodes">
              <a className="rm-characters__episode" href={data.results[0].episode[0]}>Episode: 1</a>
              <a className="rm-characters__episode" href={data.results[0].episode[1]}>Episode: 2</a>
              <a className="rm-characters__episode" href={data.results[0].episode[2]}>Episode: 3</a>
              <a className="rm-characters__episode" href={data.results[0].episode[3]}>Episode: 4</a>
              <a className="rm-characters__episode" href={data.results[0].episode[4]}>Episode: 5</a>
            </div>
          </div>
        )}
      </div>
    );

  } else {
    <p>Loading........</p>
  }
}

export default App;