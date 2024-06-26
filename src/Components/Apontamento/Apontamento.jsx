import React, {useState,useEffect} from "react";
import './Apontamento.css'
import Select from 'react-select'

import { Link } from 'react-router-dom';

import tipo from './MOCK_DATA_SIM.json';
import motivo from './MOTIVO.json';
import axios from "axios";

function Apontamento() {

  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [selectedCodColaborador, setSelectedCodColaborador] = useState('');
  const [selectedProjeto, setSelectedProjeto] = useState(null)
  const [selectedCodProjeto, setSelectedCodProjeto] = useState('')
  const [selectedEtapa, setSelectedEtapa] = useState(null)
  const [selectedFinalizado, setSelectedFinalizado] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [selectedMotivo, setSelectedMotivo] = useState(null);
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [selectedCodAtividade, setSelectedCodAtividade] = useState('');
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedObservacao, setSelectedObservacao] = useState('');


  const [results, setResults] = useState([]);
  const [ funcionarios, setFuncionarios] = useState([])

  const getAtividadesData = async () => {
    const result = await axios.get("https://script.google.com/macros/s/AKfycbzGxZ_WFIdz47Q9kuggiTNHGmO0IzfBmwTMvKDzi9ZV3QhqzwhZZanT9MQwYwzVNCw/exec?type=atividades")
    
    console.log(result)
    const jsonData = result.data;
    console.log(jsonData); // Agora você tem os dados em formato JSON que pode ser facilmente manipulado
    
    setResults(jsonData)
    
  }

  const getFuncionariosdata = async () => {
    const response = await axios.get("https://script.google.com/macros/s/AKfycbxQTUaFfnx2NsB8BWLlnR9WqPTEboYa8aYaPo8mRS2DPZy-2WjlBIP7-jPXxHIa06dW/exec")

    console.log(response)
    const jsonDataFuncionario = (response.data);
    console.log(jsonDataFuncionario); // Agora você tem os dados em formato JSON que pode ser facilmente manipulado
    
    setFuncionarios(jsonDataFuncionario)

  }
  

  useEffect(() => {
    const fetchData = async () => {
        await getFuncionariosdata();
        await getAtividadesData();
        
    };

    fetchData();
}, []);



  const handleChangeColaborador = (selectedColaborador) => {
    setSelectedColaborador(selectedColaborador);
    if (selectedColaborador !== null) {
      funcionarios.find(item => 
        {
          if (item.CONCATENAR === selectedColaborador.value) {
            setSelectedCodColaborador(item.CodFunc)
          }
        }
      );
    }
  };

  const handleChangeProjeto = (selectedProjeto) => {
    setSelectedProjeto(selectedProjeto)
    if (selectedProjeto !== null) {
      results.find(item => 
        {
          if (item.PROJETOS === selectedProjeto.value) {
            setSelectedCodProjeto(item.COD_PROJETO)
          }
        }
      );
    }
  }
  const handleChangeEtapa = (selectedEtapa) => {
    setSelectedEtapa(selectedEtapa)
  }

  const handleChangeFinalizado = (selectedFinalizado) => {
    setSelectedFinalizado(selectedFinalizado);
  };

  const handleChangeDateTime = (selectedDateTime) => {

    const getCurrentSeconds = () => {
      const currentTime = new Date();
      return currentTime.getSeconds().toString().padStart(2, '0');
    }

    const currentSeconds = getCurrentSeconds();
    const formatToHHMMSS = (value) => {
      const parts = value.split(':');
      const hours = parts[0] ? parts[0].padStart(2, '0') : '00';
      const minutes = parts[1] ? parts[1].padStart(2, '0') : '00';
      const seconds = parts[2] ? parts[2].padStart(2, '0') : currentSeconds;
      return `${hours}:${minutes}:${seconds}`;
    };

    
    const inputValue = selectedDateTime.target.value;
    const formattedTime = formatToHHMMSS(inputValue);
    setSelectedDateTime(formattedTime);
  };

  const handleChangeMotivo = (selectedMotivo) => {
    setSelectedMotivo(selectedMotivo);
  };

  const handleChangeAtividade = (selectedAtividade) => {
    setSelectedAtividade(selectedAtividade);
    if (selectedAtividade !== null) {
      results.find(item =>
        
        {
          if (item.ATIVIDADES === selectedAtividade.value) {
            setSelectedCodAtividade(item.COD_ATV)
          }
        }
      );
    }
  };
  const handleChangeTipo = (selectedTipo) => {
    setSelectedTipo(selectedTipo);
  };
  
  const handleChangeObservacao = (selectedObservacao) => {
    setSelectedObservacao(selectedObservacao.target.value);
  };


  function Submit() {
    const form = new FormData(); // Criar um novo objeto FormData
    // Encontrar o objeto correspondente com base nos valores selecionados

    /*
    const selectedData = results.find(item => 
      {
        if (
        item.PROJETO === selectedProjeto.value &&
        item.COD_Finalizado === selectedFinalizado &&
        item.COD_ATV === selectedCodAtividade
        ) {
          form.append('id', item.ID)
        }

      }
    );
    */
    const currentTime = new Date().toLocaleTimeString();

    const currentDate = new Date().toLocaleDateString();
    form.append('access', currentDate + " " + currentTime);
    form.append('dia', currentDate);

    if (
      selectedDateTime === ''
      ) {
        const currentdateTime = currentDate + " " + currentTime
        form.append('data', currentdateTime);
      } else {
        const currentdateTime = currentDate + " " + selectedDateTime
        form.append('data', currentdateTime);
      }
    
    
    form.append('projeto', selectedCodProjeto);
    form.append('finalizado', selectedFinalizado.value);
    form.append('motivo', selectedMotivo.value);
    form.append('atividade', selectedCodAtividade);
    form.append('etapa', selectedEtapa.value);
    form.append('colaborador', selectedCodColaborador);
    form.append('tipo', selectedTipo.value);
    form.append('observacao', selectedObservacao);

    // Adicionar a data e a hora atuais ao FormData
    


    
   
    

    fetch('https://script.google.com/macros/s/AKfycbyuxZDM5p0o1pX_r2YPBOhysSbE9bZmT7XHKrryqh1uqpIHMnT3hspHVIljYELR4W_TUw/exec?type=apontamento', {
      method: 'POST',
      body: form
    })
    
    // Limpar os estados
    setSelectedProjeto('');
    setSelectedCodProjeto('');
    setSelectedEtapa('');
    setSelectedFinalizado('');
    setSelectedDateTime('');
    setSelectedMotivo('');
    setSelectedAtividade('');
    setSelectedCodAtividade('');
    setSelectedColaborador('');
    setSelectedCodColaborador('');
    setSelectedTipo('');
    setSelectedObservacao('');
  }

  const customStyles = {
    menuPortal: base => ({
      ...base,
      zIndex: 9999,
      width: '400px', // Ajuste a largura conforme necessário
      left: 'calc(20%)'
    }),
  };
  
  const customStylesSmall = {
    menuPortal: base => ({
      ...base,
      zIndex: 9999,
      width: '300px', // Ajuste a largura conforme necessário
      left: 'calc(20%)'
    }),
  };
  const customStylesSmallRight = {
    menuPortal: base => ({
      ...base,
      zIndex: 9999,
      width: '300px', // Ajuste a largura conforme necessário
      left: 'calc(50%)'
    }),
  };

  const optionsFinalizado = [
    { value: 'SIM', label: 'SIM' },
    { value: 'NÂO', label: 'NÂO' },
    
  ];


  return (
    <div className="container">
      <div className="navbar">
        <Link to="/" className="botao-inicio">
              Painel
        </Link>
      </div>
      <div>Apontamento de Produção</div>
      <div className="header">
        <div className="text">Início de Atividades</div>
        <div className="underline"></div>
      </div>
      <div className="container-data">
        <div className="inputs">
            <span className="titulo">Colaborador:</span>
            <Select 
              options={funcionarios.map(item => ({
                label: item.CONCATENAR,
                value: item.CONCATENAR
            }))}
              value={selectedColaborador}
              onChange={handleChangeColaborador}
              className="select-projeto"
            />
        </div>
        <div className="inputs">
          <div className="input">
            <span className="titulo">Projeto:</span>
            <Select 
              options={results
                .filter((item, index, self) => self.findIndex(t => t.PROJETOS === item.PROJETOS) === index)
                .map(item => ({
                label: item.PROJETOS,
                value: item.PROJETOS
              }))}
              value={selectedProjeto}
              onChange={handleChangeProjeto}
              styles={customStyles}
              menuPortalTarget={document.body}
              className="select-projeto"
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <span className="titulo">Etapa:</span>
            
            <Select 
              options={selectedProjeto ? results
                .filter(item => item.PROJETOS === selectedProjeto.value)
                .filter((item, index, self) => self.findIndex(t => t.ETAPA === item.ETAPA) === index)
                .map(item => ({
                label: item.ETAPA,
                value: item.ETAPA
              })):[]}
              value={selectedEtapa}
              onChange={handleChangeEtapa}
              styles={customStyles}
              menuPortalTarget={document.body}
              className="select-projeto"
            />
          </div>
        </div>
        
        <div className="inputs">
          <div className="input">
            <span className="titulo">Atividade:</span>
            <Select 
              options={selectedEtapa ? results
                .filter(item => item.PROJETOS === selectedProjeto.value && item.ETAPA === selectedEtapa.value)
                .filter((item, index, self) => self.findIndex(t => t.ATIVIDADES === item.ATIVIDADES) === index)
                .map(item => ({
                label: item.ATIVIDADES,
                value: item.ATIVIDADES
              })):[]}
              value={selectedAtividade}
              onChange={handleChangeAtividade}
              styles={customStyles}
              menuPortalTarget={document.body}
              className="select-projeto"
            />
          </div>
        </div>
        <div className="small">
          <div className="inputs">
            <div className="input">
              <span className="titulo-small">Tipo</span>
              <Select 
                options={tipo.map(item => ({
                  label: item.tipos,
                  value: item.tipos
                }))}
                value={selectedTipo}
                onChange={handleChangeTipo}
                styles={customStylesSmall}
                menuPortalTarget={document.body}
                className="select-projeto-small"
              />
            </div>
          </div>

          <div className="inputs">
            <div className="input">
              <span className="titulo-small">Finalizado</span>
              <Select 
                options={optionsFinalizado}
                value={selectedFinalizado}
                onChange={handleChangeFinalizado}
                styles={customStylesSmallRight}
                menuPortalTarget={document.body}
                className="select-projeto-small"
              />
            </div>
          </div>
        </div>



        <div className="small">
          <div className="inputs">
            <div className="input">
              <span className="titulo-small">Data e Hora</span>
              <input
                value={selectedDateTime}
                onChange={handleChangeDateTime}
                type="time"
                className="select-projeto-small-time"
              />
            </div>
          </div>

          <div className="inputs">
            <div className="input">
              <span className="titulo-small">Motivo</span>
              <Select 
                options={motivo.map(item => ({
                  label: item.MOTIVO,
                  value: item.MOTIVO
                }))}
                value={selectedMotivo}
                onChange={handleChangeMotivo}
                styles={customStylesSmallRight}
                menuPortalTarget={document.body}
                className="select-projeto-small"
              />
            </div>
          </div>
        </div>



        <div className="observacao">
            <div className="label">Observações</div>
            <input
                value={selectedObservacao}
                onChange={handleChangeObservacao}
                className='input-text-large' type="text" 
                
            />
        </div>
      </div>

      
      
      <div className="submit-container">
        <div className="submit" onClick={Submit}>Enviar</div>
      </div>
    </div>
  )
}

export default Apontamento
