import React from 'react';
import '../styles/Program.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const App = () => {
  const games = [
    {
      id: 1,
      name: "Football",
      description: "A competitive game involving two teams aiming to score goals by kicking a ball into the opponent's goal.",
      level: 1,
      image_url: "68a64b1a-e14c-4e5d-867e-ca459fd1a3f7.jpeg"
    },
    {
      id: 2,
      name: "Rugby",
      description: "A physically demanding sport where two teams of 15 players aim to carry an oval-shaped ball over the opponent's try line.",
      level: 1,
      image_url: "https://www.springboks.rugby/media/cv4bsyko/210729-rugby-ball-generic-1.jpg?anchor=center&mode=crop&width=945&height=472&rnd=132723694774300000"
    },
    {
      id: 3,
      name: "Basketball",
      description: "A fast-paced game played by two teams of five players each, aiming to shoot a ball through the opponent's hoop.",
      level: 2,
      image_url: "https://rrspin.com/images/sports/basketball/how-to-shoot-a-basketball.jpg"
    },
    {
      id: 4,
      name: "Baseball",
      description: "A bat-and-ball game played between two teams of nine players each, taking turns batting and fielding.",
      level: 2,
      image_url: "https://media.istockphoto.com/id/1471217278/photo/baseball-ball-in-a-grass-of-baseball-arena-stadium.webp?b=1&s=170667a&w=0&k=20&c=YT7iFHra8pUKjT6f_2W11sLrWULVM37dBMuBDbWtS-E="
    },
    {
      id: 5,
      name: "Tennis",
      description: "A racket sport played individually or in pairs, where players use a stringed racket to hit a ball over a net into the opponent's court.",
      level: 3,
      image_url: "https://as1.ftcdn.net/v2/jpg/00/70/05/80/1000_F_70058017_1kSAVhc690JLMEU7nL4PoHuIWTzws2pk.jpg"
    },
    {
      id: 6,
      name: "Golf",
      description: "A precision club-and-ball sport, where players use various clubs to hit balls into a series of holes on a course in as few strokes as possible.",
      level: 3,
      image_url: "https://images.pexels.com/photos/2828723/pexels-photo-2828723.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 7,
      name: "Swimming",
      description: "A water sport involving various strokes, where competitors race against each other using different techniques such as freestyle, breaststroke, backstroke, and butterfly.",
      level: 4,
      image_url: "https://img.freepik.com/premium-photo/professional-swimmer-swimming-race-indoor-pool_798657-4705.jpg"
    },
    {
      id: 8,
      name: "Cricket",
      description: "A bat-and-ball game played between two teams of eleven players on a field, where the batting team tries to score runs by hitting the ball while the fielding team tries to dismiss the batsmen and restrict the runs scored.",
      level: 4,
      image_url: "https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcC0zNDktZmVsaXhydXNzZWxsNTUwNC14Mi5qcGc.jpg"
    },
    {
      id: 9,
      name: "Track and Field",
      description: "A sport that includes various athletic contests, such as running, jumping, throwing, and walking, performed on a track or field.",
      level: 5,
      image_url: "https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg/f_auto/primary/hiuf5ahd3cbhr11q6m5m"
    },
    {
      id: 10,
      name: "Volleyball",
      description: "A team sport played by two teams of six players each, where the aim is to score points by grounding a ball on the opponent's court.",
      level: 5,
      image_url: "100+ Free Volley Ball & Volleyball Images.jpeg"
    }
  ];

  return (
    <div className="App">
      <Navbar></Navbar>
      <header>
        <h2 className='t-header'>Select a Sport and Enroll Now</h2>
      </header>
      <div className="card-container">
        {games.map(game => (
          <div key={game.id} className="card">
            <img src={game.image_url} alt={game.name} />
            <div className="card-content">
              <h3>{game.name}</h3>
                <p>{game.description}</p>     
                <h4>Game ID number: {game.id}</h4>
              <Link to="/add-youth" className="btn btn-green">Enroll Now!</Link>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <p>© 2024 Youth Sports. All rights reserved.</p>
        <ul>
          <li><a href="/https://github.com/KiplagaTeddy/Final-Project-PH4">Privacy Policy</a></li>
          <li><a href="/https://github.com/KiplagaTeddy/Final-Project-PH4">Terms of Service</a></li>
          <li><a href="https://github.com/KiplagaTeddy/Final-Project-PH4">Contact Us</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default App;
