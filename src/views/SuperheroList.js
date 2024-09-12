import React, { useEffect, useState } from 'react';

const SuperheroListView = ({superheroes}) => {
    //enable this is the data changes often and you want to load it fresh every time the tab is clicked
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
    };

    const filteredHeroes = superheroes.filter((hero) => {
        return hero.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
               hero.biography["full-name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
               hero.id.includes(searchTerm);
    });

    return (
        <div className="p-5 min-h-screen flex flex-col">
            <input
                type="text"
                placeholder="Search superheroes..."
                className="mb-5 p-2 border border-gray-300 rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="space-y-3">
                {filteredHeroes.length > 0 ? (
                        filteredHeroes.map((hero) => (
                        <li 
                            key={hero.id} 
                            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                            onClick={() => handleExpandClick(hero.id)}
                        >
                            {hero.id} | <strong>{hero.name}</strong>{' '}
                            <span className="text-gray-600">(Real Name: {hero.biography["full-name"] || "Unknown"})</span>

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
                                            <p><strong>Place of Birth:</strong> {hero.biography["place-of-birth"] || "Unknown"}</p>
                                            <p><strong>Alignment:</strong> {hero.biography.alignment || "Unknown"}</p>
                                            <p><strong>First Appearance:</strong> {hero.biography["first-appearance"] || "Unknown"}</p>
                                            <p><strong>Publisher:</strong> {hero.biography.publisher || "Unknown"}</p>
                                        </div>
                                    </div>

                                    {/* 2nd row with 2 columns */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Left column: Appearance & Work */}
                                        <div>
                                            <p><strong>Appearance:</strong></p>
                                            <ul className="list-disc list-inside">
                                                <li><strong>Gender:</strong> {hero.appearance.gender || "Unknown"}</li>
                                                <li><strong>Race:</strong> {hero.appearance.race !== "null" ? hero.appearance.race : "Not Available"}</li>
                                                <li><strong>Height:</strong> {hero.appearance.height ? hero.appearance.height.join(', ') : "Not Available"}</li>
                                                <li><strong>Weight:</strong> {hero.appearance.weight ? hero.appearance.weight.join(', ') : "Not Available"}</li>
                                                <li><strong>Eye Color:</strong> {hero.appearance["eye-color"] || "Unknown"}</li>
                                                <li><strong>Hair Color:</strong> {hero.appearance["hair-color"] || "Unknown"}</li>
                                            </ul>

                                            <p className="mt-3"><strong>Work:</strong></p>
                                            <ul className="list-disc list-inside">
                                                <li><strong>Occupation:</strong> {hero.work.occupation || "Unknown"}</li>
                                                <li><strong>Base:</strong> {hero.work.base || "Unknown"}</li>
                                            </ul>
                                        </div>

                                        {/* Right column: Power Stats & Connections */}
                                        <div>
                                            <p><strong>Power Stats:</strong></p>
                                            <ul className="list-disc list-inside">
                                                <li><strong>Intelligence:</strong> {hero.powerstats.intelligence !== "null" ? hero.powerstats.intelligence : "Not Available"}</li>
                                                <li><strong>Strength:</strong> {hero.powerstats.strength !== "null" ? hero.powerstats.strength : "Not Available"}</li>
                                                <li><strong>Speed:</strong> {hero.powerstats.speed !== "null" ? hero.powerstats.speed : "Not Available"}</li>
                                                <li><strong>Durability:</strong> {hero.powerstats.durability !== "null" ? hero.powerstats.durability : "Not Available"}</li>
                                                <li><strong>Power:</strong> {hero.powerstats.power !== "null" ? hero.powerstats.power : "Not Available"}</li>
                                                <li><strong>Combat:</strong> {hero.powerstats.combat !== "null" ? hero.powerstats.combat : "Not Available"}</li>
                                            </ul>

                                            <p className="mt-3"><strong>Connections:</strong></p>
                                            <ul className="list-disc list-inside">
                                                <li><strong>Group Affiliation:</strong> {hero.connections["group-affiliation"] || "Unknown"}</li>
                                                <li><strong>Relatives:</strong> {hero.connections.relatives || "Unknown"}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No superheroes found</li>
                )}
            </ul>
        </div>
    );
};

export default SuperheroListView;
