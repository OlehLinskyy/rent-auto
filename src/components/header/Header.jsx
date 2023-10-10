import { NavLink, Outlet } from 'react-router-dom';
import css from './Header.module.css';

function Header() {
  const handleActiveStyle = ({ isActive }) => {
    return { color: isActive ? '#3470ff' : 'black', marginRight: 20, cursor: isActive ? 'default' : 'pointer' };
  };
  return (
    <div >
      <header className={css.header}>
        <div className="container">
          <nav className={css.nav}>
            <NavLink style={handleActiveStyle} to="/" className={css.link}>
              Home
            </NavLink>
            <NavLink
              style={handleActiveStyle}
              to="/catalog"
              className={css.link}
            >
              Catalog
            </NavLink>
            <NavLink
              style={handleActiveStyle}
              to="/favorites"
              className={css.link}
            >
              Favorite
            </NavLink>
          </nav>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Header;
