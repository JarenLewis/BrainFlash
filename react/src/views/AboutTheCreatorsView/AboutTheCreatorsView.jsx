import './AboutTheCreatorsView.css';

import ankanImg from '../../assets/ankan.png';
import kenzieImg from '../../assets/kenzie.png';
import soniaImg from '../../assets/sonia.png';
import jarenImg from '../../assets/jaren.png';
import clayImg from '../../assets/clay.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMonster, faIceCream, faDiceD20, faBone, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function AboutCreators() {
  const creators = [
    {
      name: 'Ankan Bhattacharya',
      role: 'Full Stack Developer',
      bio: <FontAwesomeIcon icon={faIceCream} />,
      funFact: 'Ankan is actually a strawberry',
      image: ankanImg,
      github: 'https://github.com/tenthmascot'
    },
    {
      name: 'Kenz Crawford',
      role: 'Full Stack Developer',
      bio: <FontAwesomeIcon icon={faDiceD20} />,
      funFact: 'Kenz is a level 20 Barbarian',
      image: kenzieImg,
      github: 'https://github.com/kenzcrawford'
    },
    {
      name: 'Sonia Holter',
      role: 'Full Stack Developer',
      bio: <FontAwesomeIcon icon={faTruckMonster} />,
      funFact: 'Sonia owns all 62 original Goosebumps books',
      image: soniaImg,
      github: 'https://github.com/soniaholter'
    },
    {
      name: 'Jaren Lewis',
      role: 'Full Stack Developer',
      bio: <FontAwesomeIcon icon={faGamepad} />,
      funFact: 'Jaren increases the temp in any room by one degree',
      image: jarenImg,
      github: 'https://github.com/jarenlewis'
    },
    {
      name: 'Clay',
      role: 'Emotional Support and Mascot',
      bio: <FontAwesomeIcon icon={faBone} />,
      funFact: 'Clay is a dog',
      image: clayImg,
      github: 'https://youtu.be/dQw4w9WgXcQ?si=qMOHGIyYKervHp8F'
    }
  ];

  return (
    <div className="about-creators">
      <h1>About the Creators</h1><br />
      <p className="intro">
        BrainFlash was created by a small but mighty team dedicated to making studying smarter and more fun.<br />
      </p>

      <div className="creator-list">
        {creators.map((creator, index) => (
          <div key={index} className="creator-card">
            <img src={creator.image} alt={creator.name} className="creator-image" />
            <h2>{creator.name}</h2>
            <h3>{creator.role}</h3>
            <p>{creator.bio}</p><br />
            <p className="fun-fact">Fun Fact: {creator.funFact}</p>
            {creator.github && (
              <div className="github-section">
                <a 
                  href={creator.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <FontAwesomeIcon icon={faGithub} /> 
                  <span>GitHub</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}