import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Resultado from './components/Resultado'
import ImgCripto from './img/imagen-criptos.png'


const Contenedor = styled.div`
max-width:900px;
margin:0 auto;
with:90%;
@media(min-width: 992px){
  display: grid;
  grid-template-columns:repeat(2, 1fr);
  column-gap: 2rem;
}
`

const Imagen = styled.img`
max-width:400px;
width:80%;
margin: 100px auto 0 auto;
display:block;

`


const Heading = styled.h1`
font-faily: 'Lato', sans-serif;
color: #FFF;
text-align: center;
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;

&::after{
  content: '';
  width:100px;
  height: 6px;
  background-color: #66A2fe;
  display: block;
  margin: 10px auto 0 auto;
}
`;

function App() {
  const [monedas, setmonedas] = useState({})
  const [resultado, setresultado] = useState({})
  const [cargando, setcargando] = useState(false)


  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      setcargando(true);
      setresultado({})
      const { moneda, criptomoneda } = monedas;

      const cotizarCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json()

        setresultado(resultado.DISPLAY[criptomoneda][moneda]);
        setcargando(false);
      }
      cotizarCripto();
    }
  }, [monedas])

  return (

    <Contenedor>

      <Imagen
        src={ImgCripto}
        alt="imagenes cripto"
      />
      <div>
        <Heading> Cotiza Criptomonedas al Instante</Heading>
        <Formulario
          setmonedas={setmonedas}
        />


        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado} />}
      </div>

    </Contenedor >
  )
}

export default App
