import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import "./CSS/Login.css";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({
        msg: "Los password no son iguales",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });
      return;
    }

    setAlerta({});

    // Crear el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, {
        nombre,
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setNombre("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
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
          <div className="card-back">
            <div className="center-wrap">
              <div className="section text-center">
                <h4 className="mb-4 pb-3">Noticias</h4>
                { msg && <Alerta alerta={alerta} /> }
                <h4 className="mb-4 pb-3">Sign Up</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="logname"
                      className="form-style"
                      placeholder="Tu Nombre"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <i className="input-icon uil uil-user"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="email"
                      name="logemail"
                      className="form-style"
                      placeholder="Tu Email"
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
                      placeholder="Contraseña"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="logpass"
                      className="form-style"
                      placeholder="Repetir Contraseña"
                      id="password2"
                      value={repetirPassword}
                      onChange={(e) => setRepetirPassword(e.target.value)}
                    />
                    <i className="input-icon uil uil-lock-alt"></i>
                  </div>
                  <input
                    type="submit"
                    value="Crear Cuenta"
                    className="btn mt-4"
                  ></input>
                  <p className="mb-0 mt-4 text-center">
                  <Link to="/login" className="link">
                      Ya tienes cuenta?
                    </Link>
                  </p>
                   
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registrar;
