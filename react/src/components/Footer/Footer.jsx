import "./footer.css"
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id='app-footer'>
      <p>
        <Link to="/about">About the Creators</Link>
      </p>
    </footer>
  );
}