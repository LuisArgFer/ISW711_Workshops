import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../paginas/CSS/Noticias.css";

const Header = () => {
  const { cerrarSesionAuth, auth } = useAuth();

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    localStorage.removeItem("token");
  };

  return (
    <>
      <header className="page-header">
        <nav>
          <p>Noticias</p>

          <ul className="admin-menu">
            <li className="menu-heading">
              <h3>{auth.nombre}</h3>
            </li>
            <li>
              <Link to="/dashboard">
                <svg>
                  <use xlinkHref="#pages"></use>
                </svg>
                <span>News</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/newsourse">
                <svg>
                  <use xlinkHref="#users"></use>
                </svg>
                <span>New Sourse</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/perfil">
                <svg>
                  <use xlinkHref="#trends"></use>
                </svg>
                <span>Perfil</span>
              </Link>
            </li>
          </ul>
          <ul className="admin-menu">
            <li className="menu-heading">
              <h3>Categorias</h3>
            </li>
            <li>
              <Link href="/dashboard/categorias/:id">
                <svg>
                  <use xlinkHref="#pages"></use>
                </svg>
                <span>News</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

    </>
  );
};

export default Header;
