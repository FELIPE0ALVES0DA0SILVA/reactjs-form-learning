
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './Apontamento.css'



function Tabela() {

  const [Tabela, setTabela] = useState([]);

  const getTabelaData = async () => {
    const result = await axios.get("https://script.google.com/macros/s/AKfycbyuxZDM5p0o1pX_r2YPBOhysSbE9bZmT7XHKrryqh1uqpIHMnT3hspHVIljYELR4W_TUw/exec?type=tabela")
    
    const jsonData = result.data;
    
    setTabela(jsonData) 
  }

  useEffect(() => {
    const fetchData = async () => {
        await getTabelaData();
    };

    fetchData();
  }, []);

  console.log(Tabela)
  return (
    <>
      <div className="container">
        <div className="navbar">
          <Link to="/" className="botao-inicio">
                Painel
          </Link>

          <h2>Tabela de Apontamentos Do Dia</h2>
          <table>
            <thead>
              <tr>
                <th>COLABORADOR</th>
                <th>PROJETOS</th>
                <th>INÍCIO</th>
                <th>TÉRMINO</th>
              </tr>
            </thead>
            <tbody>
              {
                Tabela.map((val, i) => <tr key={i}>
                  <td>{val.COLABORADOR}</td>
                  <td>{val.PROJETOS}</td>
                  <td>{val.INÍCIO}</td>
                  <td>{val.TÉRMINO}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Tabela