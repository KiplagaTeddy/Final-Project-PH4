import React, { useEffect, useState } from 'react';
import '../styles/PatronGames.css';
import Navbar from './Navbar';
import Footer from './Footer';

function PatronGames() {
  const [patronGames, setPatronGames] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetch('http://localhost:5555/patron_game_details')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const groupedPatronGames = data.reduce((acc, game) => {
          const { patron_id, patron_name, game_name } = game;
          if (!acc[patron_id]) {
            acc[patron_id] = {
              patron_name,
              games: [],
            };
          }
          acc[patron_id].games.push(game_name);
          return acc;
        }, {});
        setPatronGames(Object.values(groupedPatronGames));
      })
      .catch(error => console.error('Error fetching patron games:', error));
  }, []);

  const handleSort = () => {
    const sortedPatronGames = [...patronGames].sort((a, b) => {
      const nameA = a.patron_name.toUpperCase();
      const nameB = b.patron_name.toUpperCase();
      if (sortOrder === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
    setPatronGames(sortedPatronGames);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <div className="patron-games-page">
        <Navbar />
        <h1>Patron Games</h1>
        <button onClick={handleSort} className="sort">
          {sortOrder === 'asc' ? 'Sort by Name Ascending' : 'Sort by Name Descending'}
        </button>
        <div className="patron-games-list">
          {patronGames.length > 0 ? (
            patronGames.map(patron => (
              <div key={patron.patron_name} className="patron-card">
                <h2>{patron.patron_name}</h2>
                <ol>
                  {patron.games.length > 0 ? (
                    patron.games.map((game, index) => (
                      <li key={index}>{game}</li>
                    ))
                  ) : (
                    <li>No games found</li>
                  )}
                </ol>
              </div>
            ))
          ) : (
            <p>Loading patron games...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatronGames;
