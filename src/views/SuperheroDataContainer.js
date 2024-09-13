import React, { useState, useEffect } from 'react';
import SuperheroList from './SuperheroList';
import SuperheroGrid from './SuperheroGrid';
import PunchRandom from '../components/punchRandom';

const tabs = [
  { name: 'List View', current: true },
  { name: 'Grid View', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SuperheroDataContainer() {
  const [activeTab, setActiveTab] = useState('list');
  const [superheroes, setSuperheroes] = useState([]);
  const [triggerPopup, setTriggerPopup] = useState(false);


    // Fetch superhero data once when the component mounts
    useEffect(() => {
        fetch('https://tppublic.blob.core.windows.net/test-data/super-heroes.json')
        .then(response => response.json())
        .then(data => setSuperheroes(data))
        .catch(error => console.error('Error fetching superhero data:', error));
    }, []);

    const handleTabClick = (tabName) => {
        if (tabName === 'List View') {
        setActiveTab('list');
        } else if (tabName === 'Grid View') {
        setActiveTab('grid');
        }
    };

    const handleHeroSelect = () => {
        setTriggerPopup(true);
    
        // Reset the trigger after 1 second
        setTimeout(() => {
          setTriggerPopup(false);
        }, 1000);
    };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4 bg-gray-50 shadow-md rounded">
        <h1 className="text-2xl font-bold text-center mb-4">CHOOSE YOUR HERO</h1>

        {/* Tabs */}
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            defaultValue={tabs.find((tab) => tab.current).name}
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => handleTabClick(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="isolate flex divide-x divide-gray-200 rounded-lg shadow" aria-label="Tabs">
            {tabs.map((tab, tabIdx) => (
              <button
                key={tab.name}
                onClick={() => handleTabClick(tab.name)}
                className={classNames(
                  activeTab === (tab.name === 'List View' ? 'list' : 'grid')
                    ? 'text-gray-900 bg-gray-50'
                    : 'text-gray-500 hover:text-gray-700',
                  tabIdx === 0 ? 'rounded-l-lg' : '',
                  tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                  'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                )}
              >
                <span>{tab.name}</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    activeTab === (tab.name === 'List View' ? 'list' : 'grid')
                      ? 'bg-orange-400'
                      : 'bg-transparent',
                    'absolute inset-x-0 bottom-0 h-0.5'
                  )}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Content with border */}
        <div className="p-4 border border-gray-300 rounded-lg max-h-[calc(100vh-10rem)] overflow-y-auto">
            {activeTab === 'list' && <SuperheroList superheroes={superheroes} onHeroSelect={handleHeroSelect} />}
            {activeTab === 'grid' && <SuperheroGrid superheroes={superheroes} onHeroSelect={handleHeroSelect} />}
        </div>

        <PunchRandom trigger={triggerPopup} />
      </div>
    </div>
  );
}
