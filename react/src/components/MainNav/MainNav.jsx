import axios from 'axios';
import styles from './MainNav.module.css';
import DeckEditForm from '../DeckEditForm/DeckEditForm';
import App from '../../App';
import logo from '../../assets/BrainFlash.png';
import { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHouse, faRightFromBracket, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function MainNav() {
  const { user } = useContext(UserContext);
  const [query, setQuery] = useState('');
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  const mainNav = [
    { id: 1, name: 'About The Creators', path: '/about' },
    { id: 2, name: 'Profile', path: `${App.UserProfile}` },
    { id: 5, name: 'Decks', path: `/decks/` }
  ];

  useEffect(() => {
    axios.get('/deck')
    .then((response) => {
      setDecks(response.data);
    })
    .catch((error) => {
      console.error("Error fetching decks: ", error);
    });
  }, []
  )

  const getFilteredItems = (query, navItems, decks) => {
    if (!query) {
      return [];
    }

  const lowerCaseQuery = query.toLowerCase();

  const navResults = navItems.filter(item =>
    item.name.toLowerCase().includes(lowerCaseQuery)
  );

  const deckResults = decks.filter(deck => 
    deck.title.toLowerCase().includes(lowerCaseQuery)).map(deck => (
      {
        id: `deck-${deck.deckId}`,
        name: deck.title,
        path: `/decks/${deck.deckId}`
      }
    ))
  return [...navResults, ...deckResults]
}


  function handleLogout(e) {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you would like to logout?");

    if (confirmed) {
      navigate("/logout");
    }
  }

  const filteredItems = getFilteredItems(query, mainNav, decks);

  return (
    <div id='main-nav' className={styles.wrapper}>
      <div className={styles.content}>
        <nav className="nav-list">
          <a href="http://localhost:5173/" className={styles.logoLink}>
            <img src={logo} className={styles.logo} alt="Logo" />
          </a>

          <div className="nav-link">
            <div className="search-wrapper">
              <input
                id="search-input"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="  Search..."
                className="search-input"
              />
              {query && (
                <div className="main-nav-search-results">
                  {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                      <div key={item.id}>
                        <Link to={item.path} onClick={() => setQuery('')}>{item.name}</Link>
                      </div>
                    ))
                  ) : (
                    <div className="no-results" alt="You thought this was a button, but it was me, Dio!">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="nav-link">
            <NavLink to="/"><FontAwesomeIcon icon={faHouse} /> Home</NavLink>
          </div>
          {user ? (
            <>
              <div className="nav-link">
                <NavLink to="/userProfile">
                  <FontAwesomeIcon icon={faUser} /> Profile
                </NavLink>
              </div>

              <div className="nav-link">
                <NavLink to="/decks">
                  <FontAwesomeIcon icon={faEye} /> View Decks
                </NavLink>
              </div>

              <div className="nav-link">
                <Link onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </Link>
              </div>
            </>
          ) : (
            <div className="nav-link">
              <NavLink to="/login">
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}