import './PageNotFoundView.css'

import logoError from "../../assets/BrainFlashError.png";
import { Link } from "react-router-dom";

export default function PageNotFoundView() {
    return (
        <>
            <img className="logoError" src={logoError} />
            <h2 className="errorMessage">
                Unfortunately, you studied so hard you lost track of where you were...
            </h2>
            <h3 className="errorMessage">
                You wandered out of bounds!
            </h3>
            <p className="errorMessage">
                If you didn't expect to see this, let <Link to="/about" className= "errorMessageLink">our developers</Link> know about it!
            </p>
        </>
    )
}