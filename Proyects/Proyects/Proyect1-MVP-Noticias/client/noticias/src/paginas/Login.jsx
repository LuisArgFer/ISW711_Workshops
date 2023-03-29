import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import "./CSS/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post("/usuarios/session", {
        email,
        password,
      });
      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/dashboard");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className="card-3d-wrap mx-auto">
        <div className="card-3d-wrapper">
          <div className="card-front">
            <div className="center-wrap">
              <div className="section text-center">
                <h5 className="mb-4 pb-3">Noticias</h5>
                {msg && <Alerta alerta={alerta} />}
                <h4 className="mb-4 pb-3">Log In</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="logemail"
                      className="form-style"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <i className="input-icon uil uil-at"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="logpass"
                      className="form-style"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <input type="submit" value="Iniciar Sesión" className="btn mt-4">
                    
                  </input>
                  <p className="mb-0 mt-4 text-center">
                    <a href="#0" className="link">
                      Olvidaste tu contraseña?
                    </a>
                  </p>
                 
                  <Link to="/registrarse" className="link">
                    No te has registrado?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
