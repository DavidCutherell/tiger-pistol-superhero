import React, { useState } from 'react';
import { Labels, Messages, Headings, Actions } from '../constants/strings';


const SuperheroGridView = ({ superheroes, onHeroSelect }) => {
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

    const [openHero, setOpenHero] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredHeroes = superheroes.filter((hero) => {
        return (
        hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.biography['full-name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        hero.id.includes(searchTerm)
        );
    });

    const handleHeroClick = (hero) => {
        setOpenHero(hero);
        onHeroSelect();
    };

    const closeModal = () => {
        setOpenHero(null);
    };

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
            {filteredHeroes.length > 0 ? (
                filteredHeroes.map((hero) => (
                <div
                    key={hero.id}
                    className="bg-white rounded-lg shadow-lg p-5 cursor-pointer"
                    onClick={() => handleHeroClick(hero)}
                >
                    <img
                    className="w-full h-auto rounded-md mb-3"
                    src={hero.image.url}
                    alt={hero.name}
                    />
                    <p className="text-lg font-semibold">{hero.name}</p>
                </div>
                ))
            ) : (
                <p className="text-gray-500">{Messages.NO_HEROES_FOUND}</p>
            )}
            </div>
        </div>

        {/* Modal */}
        {openHero && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="relative bg-white p-8 rounded-lg max-w-2xl w-full overflow-hidden">
                {/* Background Image with Opacity */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
                    style={{ backgroundImage: `url(${openHero.image.url})` }}
                />
                {/* Overlay to separate background */}
                <div className="absolute inset-0 bg-black opacity-30" />

                {/* Content on top of background */}
                <div className="relative z-10 text-white">
                <h2 className="text-3xl font-bold mb-5">{openHero.name}</h2>
                <p><strong>{Labels.PLACE_OF_BIRTH}</strong> {openHero.biography["place-of-birth"] || Messages.UKNOWN}</p>
                <p><strong>{Labels.ALIGNMENT}</strong> {openHero.biography.alignment || Messages.UKNOWN}</p>
                <p><strong>{Labels.FIRST_APPEARANCE}</strong> {openHero.biography["first-appearance"] || Messages.UKNOWN}</p>
                <p><strong>{Labels.PUBLISHER}</strong> {openHero.biography.publisher || Messages.UKNOWN}</p>

                <div className="grid grid-cols-2 gap-6 mt-5">
                    {/* Left Column: Appearance & Work */}
                    <div>
                    <p><strong>{Headings.APPEARANCE}</strong></p>
                    <ul className="list-disc list-inside">
                        <li><strong>{Labels.GENDER}</strong> {openHero.appearance.gender || Messages.UKNOWN}</li>
                        <li><strong>{Labels.RACE}</strong> {openHero.appearance.race !== "null" ? openHero.appearance.race : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.HEIGHT}</strong> {openHero.appearance.height ? openHero.appearance.height.join(', ') : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.WEIGHT}</strong> {openHero.appearance.weight ? openHero.appearance.weight.join(', ') : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.EYE_COLOR}</strong> {openHero.appearance["eye-color"] || Messages.UKNOWN}</li>
                        <li><strong>{Labels.HAIR_COLOR}</strong> {openHero.appearance["hair-color"] || Messages.UKNOWN}</li>
                    </ul>

                    <p className="mt-3"><strong>{Headings.WORK}</strong></p>
                    <ul className="list-disc list-inside">
                        <li><strong>{Labels.OCCUPATION}</strong> {openHero.work.occupation || Messages.UKNOWN}</li>
                        <li><strong>{Labels.BASE}</strong> {openHero.work.base || Messages.UKNOWN}</li>
                    </ul>
                    </div>

                    {/* Right Column: Power Stats & Connections */}
                    <div>
                    <p><strong>{Headings.POWER_STATS}</strong></p>
                    <ul className="list-disc list-inside">
                        <li><strong>{Labels.INTELLIGENCE}</strong> {openHero.powerstats.intelligence !== "null" ? openHero.powerstats.intelligence : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.STRENGTH}</strong> {openHero.powerstats.strength !== "null" ? openHero.powerstats.strength : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.SPEED}</strong> {openHero.powerstats.speed !== "null" ? openHero.powerstats.speed : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.DURABILITY}</strong> {openHero.powerstats.durability !== "null" ? openHero.powerstats.durability : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.POWER}</strong> {openHero.powerstats.power !== "null" ? openHero.powerstats.power : Messages.INFO_NOT_AVAILABLE}</li>
                        <li><strong>{Labels.COMBAT}</strong> {openHero.powerstats.combat !== "null" ? openHero.powerstats.combat : Messages.INFO_NOT_AVAILABLE}</li>
                    </ul>

                    <p className="mt-3"><strong>{Headings.CONNECTIONS}</strong></p>
                    <ul className="list-disc list-inside">
                        <li><strong>{Labels.GROUP_AFFILIATONS}</strong> {openHero.connections["group-affiliation"] || Messages.UKNOWN}</li>
                        <li><strong>{Labels.RELATIVES}</strong> {openHero.connections.relatives || Messages.UKNOWN}</li>
                    </ul>
                    </div>
                </div>
                <button
                    className="mt-5 text-gray-300 hover:text-white"
                    onClick={closeModal}
                >
                    {Actions.CLOSE}
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};

export default SuperheroGridView;
