import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: '',
  });
  const [consultar, setConsultar] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '7a849519d63d303d5930b6413d710f03';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResponse(resultado);
        setConsultar(false);

        //detecta si ubo resultados en la consulta
        if (resultado.cod === "404") {
          setError(true);
        }else{
          setError(false);
        }
      }

    }
    consultarApi();
    //eslint-disable-next-line
  }, [consultar])

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />
  }else{
    componente = <Clima response={response} />
  }

  return (
    <Fragment>
      <Header
        titulo="Aplicación Clima React"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
