import React, {useState,useEffect} from "react";
import './Apontamento.css'
import Select from 'react-select'


import tipo from './MOCK_DATA.json';
import axios from "axios";

function Apontamento() {

  const [selectedColaborador, setSelectedColaborador] = useState(null);
  const [selectedProjeto, setSelectedProjeto] = useState(null)
  const [selectedServico, setSelectedServico] = useState(null);
  const [selectedAtividade, setSelectedAtividade] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedObservacao, setSelectedObservacao] = useState('');


  const [results, setResults] = useState([]);
  const [ funcionarios, setFuncionarios] = useState([])

  const getProjetosData = async () => {
    const result = await axios.get("https://script.google.com/macros/s/AKfycbw20pQYFai5uFOREubFAqv9pBTyHnWDWtupRUbxldo83f0TbQWSOfDIz8aeY5KXg17JPQ/exec")
    
    console.log(result)
    const jsonData = parseData(result.data);
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

  

  const parseData = (data) => {
    const lines = data.split('\n'); // Dividir a string em linhas
    
    const jsonData = []; // Array para armazenar os objetos JSON
    
    for (let i = 1; i < lines.length; i += 11) { // Começar em 1 para ignorar a linha de cabeçalho, e pular de 11 em 11 para cada novo conjunto de dados
      const obj = {}; // Objeto para armazenar os dados de cada linha
      
      for (let j = 0; j < 10; j++) { // Cada conjunto de dados tem 10 linhas
        const line = lines[i + j];
        if (line) { // Verificar se a linha não está vazia
          const [key, value] = line.split(': '); // Dividir cada linha em chave e valor
          obj[key] = value.trim(); // Adicionar o par chave-valor ao objeto, removendo espaços em branco desnecessários
        }
      }
      
      if (Object.keys(obj).length > 0) { // Verificar se o objeto não está vazio
        jsonData.push(obj); // Adicionar o objeto ao array de dados JSON
      }
    }
    
    return jsonData; // Retornar o array de objetos JSON
  };
  

  useEffect(() => {
    const fetchData = async () => {
        await getProjetosData();
        await getFuncionariosdata();
        // Agora ambas as funções foram concluídas, você pode prosseguir com operações adicionais se necessário
    };

    fetchData();
}, []);



  const handleChangeColaborador = (selectedColaborador) => {
    setSelectedColaborador(selectedColaborador);
    //setSelectedProjeto(null); // Reiniciar seleções
    //setSelectedServico(null);
    //setSelectedAtividade(null);
  };

  const handleChangeProjeto = (selectedProjeto) => {
    setSelectedProjeto(selectedProjeto)
  }

  const handleChangeServico = (selectedServico) => {
    setSelectedServico(selectedServico);
  };

  const handleChangeAtividade = (selectedAtividade) => {
    setSelectedAtividade(selectedAtividade);
  };
  const handleChangeTipo = (selectedTipo) => {
    setSelectedTipo(selectedTipo);
  };
  
  const handleChangeObservacao = (selectedObservacao) => {
    setSelectedObservacao(selectedObservacao.target.value);
  };


  function Submit() {
    const form = new FormData(); // Criar um novo objeto FormData
    /*
    // Encontrar o objeto correspondente com base nos valores selecionados
    const selectedData = results.find(item => 
      item.PROJETO === selectedProjeto.value &&
      item.COD_SERVIÇO === selectedServico.value &&
      item.COD_ATV === selectedAtividade.value
    );

    console.log(selectedData.id)

    // Verificar se foi encontrado um objeto correspondente
    if (selectedData) {
      // Se encontrado, obter o ID desse objeto
      const ID = selectedData.ID;

      // Adicionar o ID ao FormData
      form.append('id', ID);
    } else {
      // Adicionar o ID ao FormData
      form.append('id', '');
    }

    */
    // Adicionar os valores dos estados ao objeto FormData
    
    
    form.append('projeto', selectedProjeto.value);
    form.append('servico', selectedServico.value);
    form.append('atividade', selectedAtividade.value);
    form.append('colaborador', selectedColaborador.value);
    form.append('tipo', selectedTipo.value);
    console.log(selectedObservacao)
    form.append('observacao', selectedObservacao);

    // Adicionar a data e a hora atuais ao FormData
    
    const currentTime = new Date().toLocaleTimeString();

    const currentDate = new Date().toLocaleDateString();

    const currentdateTime = currentDate + " " + currentTime
    form.append('data', currentdateTime);

    for (const [key, value] of form) {
      console.log(`${key}: ${value}`);
    }
    

    fetch('https://script.google.com/macros/s/AKfycbyuxZDM5p0o1pX_r2YPBOhysSbE9bZmT7XHKrryqh1uqpIHMnT3hspHVIljYELR4W_TUw/exec', {
      method: 'POST',
      body: form
    })
    
    // Limpar os estados
    setSelectedProjeto('');
    setSelectedServico('');
    setSelectedAtividade('');
    setSelectedColaborador('');
    setSelectedTipo('');
    setSelectedObservacao('');
  }

  return (
    <div className="container">
      <div>Fortrak Containers</div>
      <div className="header">
        <div className="text">Apontamento de Produção</div>
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
                .filter((item, index, self) => self.findIndex(t => t.PROJETO === item.PROJETO) === index)
                .map(item => ({
                label: item.PROJETO,
                value: item.PROJETO
            }))}
              value={selectedProjeto}
              onChange={handleChangeProjeto}
              className="select-projeto"
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <span className="titulo">Serviço:</span>
            <Select 
              options={selectedProjeto ? results
                .filter(item => item.PROJETO === selectedProjeto.value)
                .filter((item, index, self) => self.findIndex(t => t.DESCRIÇÃO_SERVIÇO === item.DESCRIÇÃO_SERVIÇO) === index)
                .map(item => ({
                label: item.DESCRIÇÃO_SERVIÇO,
                value: item.DESCRIÇÃO_SERVIÇO
            })):[]}
              value={selectedServico}
              onChange={handleChangeServico}
              className="select-projeto"
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <span className="titulo">Atividade:</span>
            <Select 
              options={selectedServico ? results
                .filter(item => item.DESCRIÇÃO_SERVIÇO === selectedServico.value)
                .filter((item, index, self) => self.findIndex(t => t.DESCRIÇÃO_ATV === item.DESCRIÇÃO_ATV) === index)
                .map(item => ({
                label: item.DESCRIÇÃO_ATV,
                value: item.DESCRIÇÃO_ATV
            })):[]}
              value={selectedAtividade}
              onChange={handleChangeAtividade}
              className="select-projeto"
            />
          </div>
        </div>

        <div className="inputs">
          <div className="input">
            <img src="" alt="" />
            <span className="titulo">Tipo:</span>
            <Select 
              options={tipo.map(item => ({
                label: item.tipos,
                value: item.tipos
            }))}
              value={selectedTipo}
              onChange={handleChangeTipo}
              className="select-projeto"
            />
          </div>
        </div>

        <div className="observacao">
            <div className="label">Observações</div>
            <input
                value={selectedObservacao}
                onChange={handleChangeObservacao}
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