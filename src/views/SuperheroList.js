import React, { useEffect, useState } from 'react';
import { Labels, Messages, Headings } from '../constants/strings';

const SuperheroListView = ({superheroes, onHeroSelect}) => {
    //enable this if the data changes often and we want to load it fresh every time the tab is clicked
    /*
    //const [superheroes, setSuperheroes] = useState([]);

    // Fetch the JSON superhero data
    
    useEffect(() => {
        fetch('https://tppublic.blob.core.windows.net/test-data/super-heroes.json')
        //fetch('/data/super-heroes.json')
            .then(response => response.json())
            .then(data => setSuperheroes(data))
            .catch(error => console.error('Error fetching superhero data:', error));
    }, []);
    */

    const [expandedHeroId, setExpandedHeroId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleExpandClick = (heroId) => {
      setExpandedHeroId(expandedHeroId === heroId ? null : heroId);
      onHeroSelect();
    };
  
    const filteredHeroes = superheroes.filter((hero) => {
      return (
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        hero.biography["full-name"].toLowerCase().includes(searchTerm.toLowerCase()) || 
        hero.id.includes(searchTerm)
      );
    });
  
    return (
      <div className="flex flex-col h-screen">
        {/* Search Bar Row */}
        <div className="flex-none bg-white z-10 shadow mb-5 border-b border-gray-300">
          <input
            type="text"
            placeholder={Messages.SEARCH_PLACEHOLDER}
            className="p-2 border border-gray-300 rounded w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        {/* Scrollable Content Row */}
        <div className="flex-grow overflow-y-auto border-t">
          <ul className="space-y-3 p-5">
            {filteredHeroes.length > 0 ? (
              filteredHeroes.map((hero) => (
                <li
                  key={hero.id}
                  className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                  onClick={() => handleExpandClick(hero.id)}
                >
                  {hero.id} | <strong>{hero.name}</strong>{' '}
                  <span className="text-gray-600">
                    ({Labels.REAL_NAME} {hero.biography['full-name'] || Messages.UKNOWN})
                  </span>
  
                  {/* Conditionally render extra information if the hero is expanded */}
                  {expandedHeroId === hero.id && (
                    <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                      {/* Top row with image, place of birth, alignment, etc. */}
                      <div className="flex mb-3">
                        <div className="mr-3">
                          <img
                            className="w-16 h-16 rounded-md"
                            src={hero.image.url}
                            alt={hero.name}
                          />
                        </div>
                        <div>
                        <p><strong>{Labels.PLACE_OF_BIRTH}</strong> {hero.biography['place-of-birth'] || Messages.UKNOWN}</p>
                        <p><strong>{Labels.ALIGNMENT}</strong> {hero.biography.alignment || Messages.UKNOWN}</p>
                        <p><strong>{Labels.FIRST_APPEARANCE}</strong> {hero.biography['first-appearance'] || Messages.UKNOWN}</p>
                        <p><strong>{Labels.PUBLISHER}</strong> {hero.biography.publisher || Messages.UKNOWN}</p>
                        </div>
                      </div>
  
                      {/* 2nd row with 2 columns */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Left column: Appearance & Work */}
                        <div>
                          <p><strong>{Headings.APPEARANCE}</strong></p>
                          <ul className="list-disc list-inside">
                            <li><strong>{Labels.GENDER}</strong> {hero.appearance.gender || Messages.UKNOWN}</li>
                            <li><strong>{Labels.RACE}</strong> {hero.appearance.race !== 'null' ? hero.appearance.race : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.HEIGHT}</strong> {hero.appearance.height ? hero.appearance.height.join(', ') : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.WEIGHT}</strong> {hero.appearance.weight ? hero.appearance.weight.join(', ') : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.EYE_COLOR}</strong> {hero.appearance['eye-color'] || Messages.UKNOWN}</li>
                            <li><strong>{Labels.HAIR_COLOR}</strong> {hero.appearance['hair-color'] || Messages.UKNOWN}</li>
                          </ul>
  
                          <p className="mt-3"><strong>{Headings.WORK}</strong></p>
                          <ul className="list-disc list-inside">
                          <li><strong>{Labels.OCCUPATION}</strong> {hero.work.occupation || Messages.UKNOWN}</li>
                          <li><strong>{Labels.BASE}</strong> {hero.work.base || Messages.UKNOWN}</li>
                          </ul>
                        </div>
  
                        {/* Right column: Power Stats & Connections */}
                        <div>
                          <p><strong>{Headings.POWER_STATS}</strong></p>
                          <ul className="list-disc list-inside">
                            <li><strong>{Labels.INTELLIGENCE}</strong> {hero.powerstats.intelligence !== 'null' ? hero.powerstats.intelligence : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.STRENGTH}</strong> {hero.powerstats.strength !== 'null' ? hero.powerstats.strength : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.SPEED}</strong> {hero.powerstats.speed !== 'null' ? hero.powerstats.speed : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.DURABILITY}</strong> {hero.powerstats.durability !== 'null' ? hero.powerstats.durability : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.POWER}</strong> {hero.powerstats.power !== 'null' ? hero.powerstats.power : Messages.INFO_NOT_AVAILABLE}</li>
                            <li><strong>{Labels.COMBAT}</strong> {hero.powerstats.combat !== 'null' ? hero.powerstats.combat : Messages.INFO_NOT_AVAILABLE}</li>
                          </ul>
  
                          <p className="mt-3"><strong>{Headings.CONNECTIONS}</strong></p>
                          <ul className="list-disc list-inside">
                            <li><strong>{Labels.GROUP_AFFILIATONS}</strong> {hero.connections['group-affiliation'] || Messages.UKNOWN}</li>
                            <li><strong>{Labels.RELATIVES}</strong> {hero.connections.relatives || Messages.UKNOWN}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="text-gray-500">{Messages.NO_HEROES_FOUND}</li>
            )}
          </ul>
        </div>
      </div>
    );
};

export default SuperheroListView;
