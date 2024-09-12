import React, { useState } from 'react';

const SuperheroGridView = ({ superheroes }) => {
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
  };

  const closeModal = () => {
    setOpenHero(null);
  };

  return (
    <div className="p-5 min-h-screen flex flex-col">
      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-10 bg-white p-5 mb-5 border-b border-gray-300">
        <input
          type="text"
          placeholder="Search superheroes..."
          className="p-2 border border-gray-300 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            <p className="text-gray-500">No superheroes found</p>
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
              <p><strong>Place of Birth:</strong> {openHero.biography["place-of-birth"] || "Unknown"}</p>
              <p><strong>Alignment:</strong> {openHero.biography.alignment || "Unknown"}</p>
              <p><strong>First Appearance:</strong> {openHero.biography["first-appearance"] || "Unknown"}</p>
              <p><strong>Publisher:</strong> {openHero.biography.publisher || "Unknown"}</p>

              <div className="grid grid-cols-2 gap-6 mt-5">
                {/* Left Column: Appearance & Work */}
                <div>
                  <p><strong>Appearance:</strong></p>
                  <ul className="list-disc list-inside">
                    <li><strong>Gender:</strong> {openHero.appearance.gender || "Unknown"}</li>
                    <li><strong>Race:</strong> {openHero.appearance.race !== "null" ? openHero.appearance.race : "Not Available"}</li>
                    <li><strong>Height:</strong> {openHero.appearance.height.join(', ')}</li>
                    <li><strong>Weight:</strong> {openHero.appearance.weight.join(', ')}</li>
                    <li><strong>Eye Color:</strong> {openHero.appearance["eye-color"] || "Unknown"}</li>
                    <li><strong>Hair Color:</strong> {openHero.appearance["hair-color"] || "Unknown"}</li>
                  </ul>

                  <p className="mt-3"><strong>Work:</strong></p>
                  <ul className="list-disc list-inside">
                    <li><strong>Occupation:</strong> {openHero.work.occupation || "Unknown"}</li>
                    <li><strong>Base:</strong> {openHero.work.base || "Unknown"}</li>
                  </ul>
                </div>

                {/* Right Column: Power Stats & Connections */}
                <div>
                  <p><strong>Power Stats:</strong></p>
                  <ul className="list-disc list-inside">
                    <li><strong>Intelligence:</strong> {openHero.powerstats.intelligence !== "null" ? openHero.powerstats.intelligence : "Not Available"}</li>
                    <li><strong>Strength:</strong> {openHero.powerstats.strength !== "null" ? openHero.powerstats.strength : "Not Available"}</li>
                    <li><strong>Speed:</strong> {openHero.powerstats.speed !== "null" ? openHero.powerstats.speed : "Not Available"}</li>
                    <li><strong>Durability:</strong> {openHero.powerstats.durability !== "null" ? openHero.powerstats.durability : "Not Available"}</li>
                    <li><strong>Power:</strong> {openHero.powerstats.power !== "null" ? openHero.powerstats.power : "Not Available"}</li>
                    <li><strong>Combat:</strong> {openHero.powerstats.combat !== "null" ? openHero.powerstats.combat : "Not Available"}</li>
                  </ul>

                  <p className="mt-3"><strong>Connections:</strong></p>
                  <ul className="list-disc list-inside">
                    <li><strong>Group Affiliation:</strong> {openHero.connections["group-affiliation"] || "Unknown"}</li>
                    <li><strong>Relatives:</strong> {openHero.connections.relatives || "Unknown"}</li>
                  </ul>
                </div>
              </div>
              <button
                className="mt-5 text-gray-300 hover:text-white"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperheroGridView;
