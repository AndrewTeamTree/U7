import { NavLink } from 'react-router-dom';



const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="/Sk8er" activeclassname="active">Sk8er</NavLink>
        </li>
        <li>
          <NavLink to="/maids" activeclassname="active">Maids</NavLink>
        </li>
        <li>
          <NavLink to="/Handymen" activeclassname="active">Handymen</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
