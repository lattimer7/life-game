import React, { useState, useCallback } from 'react';
import { Dice6 } from 'lucide-react';

const GameData = {
  continents: {
    1: "North America",
    2: "South America",
    3: "Europe",
    4: "Africa",
    5: "Asia",
    6: "Oceania"
  },
  regions: {
    "North America": {1: "West Coast", 2: "East Coast", 3: "Midwest", 4: "South", 5: "Canada", 6: "Mexico"},
    "South America": {1: "Brazil", 2: "Argentina", 3: "Chile", 4: "Peru", 5: "Colombia", 6: "Venezuela"},
    "Europe": {1: "Western Europe", 2: "Eastern Europe", 3: "Northern Europe", 4: "Southern Europe", 5: "Central Europe", 6: "British Isles"},
    "Africa": {1: "North Africa", 2: "West Africa", 3: "East Africa", 4: "Central Africa", 5: "Southern Africa", 6: "Madagascar"},
    "Asia": {1: "East Asia", 2: "South Asia", 3: "Southeast Asia", 4: "Central Asia", 5: "Middle East", 6: "Russia"},
    "Oceania": {1: "Australia", 2: "New Zealand", 3: "Papua New Guinea", 4: "Pacific Islands", 5: "Indonesia", 6: "Philippines"}
  },
  categories: {
    "Cars": {1: "1 car", 2: "2 cars", 3: "3 cars", 4: "4 cars + boat", 5: "5 cars + boat", 6: "6 cars + boat"},
    "Kids": {1: "1 kid", 2: "2 kids", 3: "3 kids", 4: "4 kids", 5: "5 kids", 6: "6 kids"},
    "Money": {1: "$50k", 2: "$100k", 3: "$250k", 4: "$750k", 5: "$1.5M", 6: "$10M"},
    "House": {1: "Outhouse", 2: "Shack", 3: "Apartment", 4: "House", 5: "McMansion", 6: "Castle"},
    "Travel": {1: "1 trip", 2: "2 trips", 3: "3 trips", 4: "4 trips", 5: "5 trips", 6: "6 trips"},
    "Health": {1: "Chubernaut", 2: "Basic Exercise", 3: "Regular Gym", 4: "Amateur Athlete", 5: "Semi-Pro", 6: "Professional"},
    "Pets": {1: "Fish", 2: "Cat", 3: "Dog", 4: "Exotic Pet", 5: "Small Farm", 6: "Animal Sanctuary"},
    "Work": {1: "Part-time", 2: "Standard 40hr", 3: "Flexible", 4: "Long Hours", 5: "Seasonal", 6: "Own Schedule"}
  }
};

export default function LifeGame() {
  const [currentRoll, setCurrentRoll] = useState(null);
  const [gamePhase, setGamePhase] = useState('continent'); // continent, region, research, categories
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [assignedCategories, setAssignedCategories] = useState({});
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setCurrentRoll(roll);
    return roll;
  };

  const handleContinentSelection = () => {
    const roll = rollDice();
    setSelectedContinent(GameData.continents[roll]);
    setGamePhase('region');
  };

  const handleRegionSelection = () => {
    const roll = rollDice();
    setSelectedRegion(GameData.regions[selectedContinent][roll]);
    setGamePhase('research');
  };

  const startTimer = () => {
    setTimerActive(true);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          setGamePhase('categories');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const assignCategory = (category) => {
    if (currentRoll && !assignedCategories[category]) {
      setAssignedCategories(prev => ({
        ...prev,
        [category]: GameData.categories[category][currentRoll]
      }));
      setCurrentRoll(null);
    }
  };

  const resetGame = () => {
    setCurrentRoll(null);
    setGamePhase('continent');
    setSelectedContinent(null);
    setSelectedRegion(null);
    setAssignedCategories({});
    setTimer(30);
    setTimerActive(false);
  };

  const renderDiceSection = () => (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="text-2xl">Roll Result: {currentRoll || '-'}</div>
        <button
          onClick={gamePhase === 'continent' ? handleContinentSelection :
                  gamePhase === 'region' ? handleRegionSelection :
                  gamePhase === 'categories' ? rollDice : null}
          disabled={gamePhase === 'research' || (gamePhase === 'categories' && currentRoll)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-600"
        >
          <Dice6 className="w-6 h-6" /> Roll Dice!
        </button>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl mb-4">Location Selection</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-bold">Continents:</h3>
          {Object.entries(GameData.continents).map(([num, name]) => (
            <div key={num} className="text-gray-300">{num}: {name}</div>
          ))}
        </div>
        {selectedContinent && (
          <div className="space-y-2">
            <h3 className="font-bold">Regions:</h3>
            {Object.entries(GameData.regions[selectedContinent]).map(([num, name]) => (
              <div key={num} className="text-gray-300">{num}: {name}</div>
            ))}
          </div>
        )}
      </div>
      {selectedContinent && selectedRegion && gamePhase === 'research' && (
        <button
          onClick={startTimer}
          disabled={timerActive}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-600"
        >
          Start 30s Timer
        </button>
      )}
    </div>
  );

  const renderCategories = () => (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl mb-4">Life Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(GameData.categories).map(([category, values]) => {
          const isAssigned = category in assignedCategories;
          return (
            <div
              key={category}
              className={`p-4 rounded-lg ${
                isAssigned ? 'bg-gray-900 text-gray-500' : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}
              onClick={() => !isAssigned && currentRoll && assignCategory(category)}
            >
              <h3 className="font-bold mb-2">
                {category}
                {isAssigned && `: ${assignedCategories[category]}`}
              </h3>
              {!isAssigned && (
                <div className="space-y-1">
                  {Object.entries(values).map(([num, value]) => (
                    <div key={num} className="text-sm">{num}: {value}</div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="mb-6 p-4 bg-gray-800 rounded-lg">
      <h2 className="text-xl mb-4">Your Life So Far</h2>
      <div className="space-y-2">
        {selectedContinent && (
          <div>Location: {selectedContinent}{selectedRegion && `, ${selectedRegion}`}</div>
        )}
        {Object.entries(assignedCategories).map(([category, value]) => (
          <div key={category}>{category}: {value}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl mb-6">Life Game</h1>
        
        {renderDiceSection()}
        
        {gamePhase !== 'categories' && renderLocation()}
        
        {gamePhase === 'research' && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg">
            <div className="text-xl">
              Research Timer: {timer}s
            </div>
          </div>
        )}
        
        {gamePhase === 'categories' && renderCategories()}
        
        {renderProgress()}
        
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}