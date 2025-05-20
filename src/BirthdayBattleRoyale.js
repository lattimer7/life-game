import React, { useState } from 'react';
import { Dice6, Trophy, Heart, Gift } from 'lucide-react';

// Game data structure based on the storyboard
const gameData = {
  rounds: [
    {
      id: 1,
      title: "Tokyo Spice Showdown",
      description: "Tokyo. Ronald McDonald eyes you suspiciously.\n'Your boyfriend paid me $5 to say you can't handle spice. Prove him wrong?'",
      background: "bg-gradient-to-r from-red-600 to-yellow-500",
      choices: [
        {
          id: "spice",
          text: "🌶️ Bring on the spice, clown.",
          outcomes: [
            { text: "Destroyed the spice. Ronald bows in defeat.", points: 3 },
            { text: "You choked a little, but held your dignity.", points: 1 },
            { text: "Crying tears of spice regret. Ronald is filming.", points: -1 }
          ]
        },
        {
          id: "nuggets",
          text: "🥵 Spice? Nah, I'll stick with nuggets.",
          outcomes: [
            { text: "Smart choice. Extra sauce packet for you.", points: 2 },
            { text: "Safe choice, but Ronald looks disappointed.", points: 1 },
            { text: "Ronald whispers: 'I knew you couldn't handle it.'", points: 0 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "French Champagne Trap",
      description: "France. A smug sommelier smirks:\n'One glass is bubbly, one is pure vinegar. Choose wisely, mademoiselle.'",
      background: "bg-gradient-to-r from-blue-500 to-indigo-600",
      choices: [
        {
          id: "left",
          text: "🍾 Glass on the left (it's always left).",
          outcomes: [
            { text: "Sweet champagne bliss! Sommelier is shocked.", points: 3 },
            { text: "Decent bubbles. Sommelier nods approval.", points: 2 },
            { text: "You chose vinegar. French guy laughs openly.", points: -1 }
          ]
        },
        {
          id: "right",
          text: "🥂 Glass on the right (trust issues activated).",
          outcomes: [
            { text: "Premium bubbles! Sommelier offers you a job.", points: 3 },
            { text: "Semi-decent champagne. Could be better.", points: 1 },
            { text: "It's vinegar. Your face says it all.", points: -1 }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Roast Session",
      description: "Quick roast-off! Who can dish it better?",
      background: "bg-gradient-to-r from-orange-500 to-pink-500",
      choices: [
        {
          id: "roast1",
          text: "Dating you is like spicy food: exciting at first, regret after.",
          outcomes: [
            { text: "Audience (imaginary) laughs harder at yours.", points: 2 },
            { text: "Your joke landed well! High five.", points: 1 },
            { text: "Your joke bombed, hers landed.", points: -1 }
          ]
        },
        {
          id: "roast2",
          text: "You're like champagne—expensive taste and constant headaches.",
          outcomes: [
            { text: "Perfect delivery! She's laughing hard.", points: 3 },
            { text: "Decent comeback. She's amused.", points: 1 },
            { text: "She out-roasted you with a better comeback.", points: -1 }
          ]
        },
        {
          id: "roast3",
          text: "I'd roast you harder, but you're already Australian.",
          outcomes: [
            { text: "Australian joke for the win! She can't stop laughing.", points: 3 },
            { text: "Got a good chuckle. Well played.", points: 1 },
            { text: "She threw back a New York joke that was better.", points: -1 }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Amsterdam's Edgy Flower Market",
      description: "Amsterdam. Flower guy winks:\n'One bouquet hides cash, another hides a rude note. Pick carefully.'",
      background: "bg-gradient-to-r from-green-500 to-teal-600",
      choices: [
        {
          id: "sunflowers",
          text: "🌻 Sunflowers—safe and sunny.",
          outcomes: [
            { text: "You got cash! Flowers were worth it.", points: 3 },
            { text: "Found a sweet note and a chocolate bar.", points: 2 },
            { text: "Just flowers, but they're gorgeous.", points: 1 }
          ]
        },
        {
          id: "roses",
          text: "🌹 Roses—risky and red.",
          outcomes: [
            { text: "Jackpot! Cash AND a love note.", points: 3 },
            { text: "Beautiful roses with a cute message.", points: 1 },
            { text: "Note says 'Better luck next boyfriend.' Ouch.", points: -1 }
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Aussie Outback Challenge",
      description: "Australia. Park ranger teases:\n'Ready to hike or afraid you'll break a nail?'",
      background: "bg-gradient-to-r from-yellow-600 to-red-500",
      choices: [
        {
          id: "easy",
          text: "🚶‍♀️ Easy trail—'I prefer my wildlife safely distant.'",
          outcomes: [
            { text: "Nice easy walk with great views.", points: 1 },
            { text: "Nice easy walk with great views.", points: 1 },
            { text: "Nice easy walk with great views.", points: 1 }
          ]
        },
        {
          id: "rough",
          text: "🦘 Rough trail—'Spiders and snakes don't scare me... much.'",
          outcomes: [
            { text: "Easy walk. You're tougher than your boyfriend says.", points: 3 },
            { text: "Found a secret waterfall! Worth the hike.", points: 2 },
            { text: "You slipped. Even koalas judge silently.", points: -1 }
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Bali Bar Race",
      description: "Bali. Beach bartender challenges:\n'First to order champagne in Indonesian wins.'",
      background: "bg-gradient-to-r from-blue-400 to-cyan-500",
      choices: [
        {
          id: "perfect",
          text: "'Saya suka champagne!' (Perfect Indonesian)",
          outcomes: [
            { text: "Perfect order—bartender impressed", points: 3 },
            { text: "Pronunciation was off, but bartender smiles", points: 2 },
            { text: "Bartender gives you a sympathy glass", points: 1 }
          ]
        },
        {
          id: "joke",
          text: "'Pacar saya idiot!' (My boyfriend's an idiot)",
          outcomes: [
            { text: "Bartender laughs, free drink anyway", points: 2 },
            { text: "Bartender high-fives you and serves bubbles", points: 2 },
            { text: "Bartender agrees in English and gives a free round", points: 1 }
          ]
        }
      ]
    }
  ],
  punishments: [
    "Come up with next date idea.",
    "Immediately send winner McDonald's via delivery app.",
    "Book winner a champagne date ASAP."
  ]
};

export default function BirthdayBattleRoyale() {
  const [playerName, setPlayerName] = useState("Arte");
  const [opponentName, setOpponentName] = useState("Barrett");
  const [gamePhase, setGamePhase] = useState("intro"); // intro, playing, results
  const [currentRound, setCurrentRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [roundResults, setRoundResults] = useState([]);
  const [showOutcome, setShowOutcome] = useState(false);
  const [currentOutcome, setCurrentOutcome] = useState(null);
  const [selectedPunishment, setSelectedPunishment] = useState(null);

  // Handle player name input
  const handleNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  // Start the game
  const startGame = () => {
    setGamePhase("playing");
  };

  // Choose outcome randomly from the provided outcomes array
  const chooseRandomOutcome = (outcomes) => {
    return outcomes[Math.floor(Math.random() * outcomes.length)];
  };

  // Handle player choice
  const handleChoice = (choice) => {
    const outcome = chooseRandomOutcome(choice.outcomes);
    
    // Update player score
    setPlayerScore(prevScore => prevScore + outcome.points);
    
    // Generate a random opponent score change (-1 to 3)
    const opponentChange = Math.floor(Math.random() * 5) - 1;
    setOpponentScore(prevScore => prevScore + opponentChange);
    
    // Save the outcome and round results
    setCurrentOutcome({
      outcome: outcome,
      opponentChange: opponentChange
    });
    
    setRoundResults(prev => [
      ...prev, 
      {
        round: currentRound + 1,
        playerChoice: choice.text,
        outcome: outcome.text,
        points: outcome.points,
        opponentPoints: opponentChange
      }
    ]);
    
    setShowOutcome(true);
  };

  // Continue to next round
  const nextRound = () => {
    setShowOutcome(false);
    setCurrentOutcome(null);
    
    if (currentRound < gameData.rounds.length - 1) {
      setCurrentRound(prevRound => prevRound + 1);
    } else {
      setGamePhase("results");
    }
  };

  // Restart the game
  const restartGame = () => {
    setGamePhase("intro");
    setCurrentRound(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setRoundResults([]);
    setShowOutcome(false);
    setCurrentOutcome(null);
    setSelectedPunishment(null);
  };

  // Select punishment for the loser
  const selectPunishment = (punishment) => {
    setSelectedPunishment(punishment);
  };

  // Render intro screen
  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center space-y-6 p-6 text-center">
      <h1 className="text-4xl font-bold">Birthday Battle Royale</h1>
      <div className="flex items-center justify-center">
        <Gift className="w-10 h-10 text-pink-500 mr-2" />
        <h2 className="text-2xl">Happy Birthday, Arte!</h2>
      </div>
      
      <p className="text-xl">
        Time to settle the score: who's the real champion here?<br />
        Winner gets bragging rights and eternal glory.<br />
        Loser buys champagne. 🍾
      </p>
      
      <div className="w-full max-w-md bg-gray-800 p-4 rounded-lg text-left">
        <p className="mb-2">Players:</p>
        <div className="flex justify-between">
          <div>You: Arte</div>
          <div>Opponent: Barrett</div>
        </div>
      </div>
      
      <button
        onClick={startGame}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg text-lg font-bold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
      >
        Let the Battle Begin!
      </button>
    </div>
  );

  // Render round
  const renderRound = () => {
    const round = gameData.rounds[currentRound];
    
    return (
      <div className={`p-6 rounded-lg ${round.background} transition-all duration-500`}>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{round.title}</h2>
            <div className="text-sm">
              Round {currentRound + 1}/{gameData.rounds.length}
            </div>
          </div>
          
          <div className="flex justify-between my-2 text-lg font-bold">
            <div>Arte: {playerScore}</div>
            <div>Barrett: {opponentScore}</div>
          </div>
        </div>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
          <p className="whitespace-pre-line">{round.description}</p>
        </div>
        
        {!showOutcome ? (
          <div className="space-y-4">
            {round.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className="w-full p-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-left transition-all border border-white border-opacity-20"
              >
                {choice.text}
              </button>
            ))}
          </div>
        ) : (
          <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6 animate-fadeIn">
            <h3 className="text-xl font-bold mb-2">Outcome:</h3>
            <p className="mb-4">{currentOutcome.outcome.text}</p>
            
            <div className="flex justify-between">
              <div>
                <span className="font-bold">Arte:</span> 
                <span className={currentOutcome.outcome.points > 0 ? "text-green-400" : currentOutcome.outcome.points < 0 ? "text-red-400" : ""}>
                  {currentOutcome.outcome.points > 0 ? `+${currentOutcome.outcome.points}` : currentOutcome.outcome.points}
                </span>
              </div>
              <div>
                <span className="font-bold">Barrett:</span> 
                <span className={currentOutcome.opponentChange > 0 ? "text-green-400" : currentOutcome.opponentChange < 0 ? "text-red-400" : ""}>
                  {currentOutcome.opponentChange > 0 ? `+${currentOutcome.opponentChange}` : currentOutcome.opponentChange}
                </span>
              </div>
            </div>
            
            <button
              onClick={nextRound}
              className="w-full mt-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all"
            >
              {currentRound < gameData.rounds.length - 1 ? "Next Round" : "See Results"}
            </button>
          </div>
        )}
      </div>
    );
  };

  // Render results
  const renderResults = () => {
    const winner = playerScore > opponentScore ? "Arte" : "Barrett";
    const loser = playerScore <= opponentScore ? "Arte" : "Barrett";
    
    return (
      <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">The Battle Ends!</h2>
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-2xl font-bold">Arte</div>
              <div className="text-4xl">{playerScore}</div>
            </div>
            <div>VS</div>
            <div className="text-right">
              <div className="text-2xl font-bold">Barrett</div>
              <div className="text-4xl">{opponentScore}</div>
            </div>
          </div>
          
          <div className="text-center my-4">
            <div className="inline-flex items-center">
              <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-xl font-bold">Winner: {winner}</span>
            </div>
          </div>
        </div>
        
        {winner === "Arte" && !selectedPunishment && (
          <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-2">Select Loser Punishment:</h3>
            <div className="space-y-2">
              {gameData.punishments.map((punishment, index) => (
                <button
                  key={index}
                  onClick={() => selectPunishment(punishment)}
                  className="w-full p-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg text-left transition-all"
                >
                  {punishment}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {selectedPunishment && (
          <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-2">Punishment for {loser}:</h3>
            <p>{selectedPunishment}</p>
          </div>
        )}
        
        <div className="bg-black bg-opacity-30 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-bold mb-2 flex items-center">
            <Heart className="w-5 h-5 text-red-400 mr-2" />
            Birthday Message:
          </h3>
          <div className="italic">
            <p>Happy Birthday, Arte!</p>
            <p>Win or lose, you're still stuck with me.</p>
            <p>Thanks for being my favorite person to challenge, roast, and love from afar.</p>
            <p>Here's to endless spicy meals, sandy beaches, overpriced champagne, and terrible jokes together.</p>
            <p>Love you, Legs ❤️</p>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={restartGame}
            className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-lg font-bold transition-all"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  };

  // Render game history/rounds summary
  const renderRoundsHistory = () => {
    if (roundResults.length === 0) return null;
    
    return (
      <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">Battle History:</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {roundResults.map((result, index) => (
            <div key={index} className="border-b border-gray-700 pb-2">
              <div className="flex justify-between text-sm">
                <span>Round {result.round}: {gameData.rounds[result.round - 1].title}</span>
                <span className="flex">
                  <span className={result.points > 0 ? "text-green-400" : result.points < 0 ? "text-red-400" : ""}>
                    {result.points > 0 ? `+${result.points}` : result.points}
                  </span>
                  <span className="mx-1">/</span>
                  <span className={result.opponentPoints > 0 ? "text-green-400" : result.opponentPoints < 0 ? "text-red-400" : ""}>
                    {result.opponentPoints > 0 ? `+${result.opponentPoints}` : result.opponentPoints}
                  </span>
                </span>
              </div>
              <div className="text-xs text-gray-400">{result.outcome}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto p-4">
        {gamePhase === "intro" && renderIntro()}
        {gamePhase === "playing" && renderRound()}
        {gamePhase === "results" && renderResults()}
        
        {(gamePhase === "playing" || gamePhase === "results") && renderRoundsHistory()}
      </div>
      
      {/* Add credits at the bottom */}
      <div className="text-center text-gray-500 text-xs p-4">
        ❤️ Birthday Battle Royale | Barrett & Arte | Made with love across 11,500 miles
      </div>
    </div>
  );
}