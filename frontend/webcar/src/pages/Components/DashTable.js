import React from 'react';
import { Table, Input, Button, Space, Popconfirm, Typography } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RestOutlined,EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
const { Title } =  Typography;

class App extends React.Component {
  constructor(props){
    super(props)
    console.log(props)
    props.buscaManutencao()
    this.state = {
      searchText: '',
      searchedColumn: '',
    };
  }
  
  multipicaDados = dados =>{
    const data = [];
    for (let i = 10; i < 50; i++) {
      data.push({
        key: i,
        titulo: `${dados.titulo} ${i}`,
        descricao: dados.descricao,
        dataInicio: dados.dataInicio,
        dataTermino: dados.dataTermino
      },);
    }
    return data
  }
  organizaDados = dados =>{
    dados.map(dado => (
      {
        key: dado.id + '1',
        titulo: dado.titulo,
        descricao: dado.descricao,
        dataInicio: dado.dataInicio,
        dataTermino: dado.dataTermino
      }
    ))
    return dados
  }
  
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Resetar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Fechar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };
  render() {
    const dado = this.props.manutencao
    //const dados = this.multipicaDados(dado)
    const dados = dado.map( dad => ({key:dad.id + '1', ...dad}))
    //const dados = this.organizaDados([dado])
    const columns = [
      {
        title: 'Titulo',
        dataIndex: 'titulo',
        key: 'titulo',
        width: '15%',
        fixed: 'left',
        ...this.getColumnSearchProps('titulo'),
      },
      {
        title: 'Data de Inicio',
        dataIndex: 'dataInicio',
        key: 'dataInicio',
        sorter: (a, b) => moment(a.dataInicio, 'DD/MM/YYYY HH:mm') - moment(b.dataInicio, 'DD/MM/YYYY HH:mm'),
        sortDirections: ['descend', 'ascend'],
        width: '35%',
      },
      {
        title: 'Data de Termino',
        dataIndex: 'dataTermino',
        sorter: (a, b) => moment(a.dataTermino, 'DD/MM/YYYY HH:mm') - moment(b.dataTermino, 'DD/MM/YYYY HH:mm'),
        key: 'dataTermino',
        width: '35%',
      },
      {
        title: '',
        dataIndex: 'id',
        width: '8%',
        render: id =>
          (
            <>
            <Popconfirm title=" Editar a manutenção?" onConfirm={() => this.props.handleEdit(id)}>
              <EditTwoTone style={{ fontSize: '20px', marginRight:'1rem'}} />
            </Popconfirm>
            
            <Popconfirm title="Quer realmente excluir essa manutenção?" onConfirm={() => this.props.handleDelete(id)}>
              <RestOutlined style={{ fontSize: '20px', color: '#08c' }}/>
            </Popconfirm>
            
            </>
          )
      }
    ];
    return <Table bordered columns={columns}  dataSource={dados} scroll={{ x: 400 }}
      expandable={{ expandedRowRender: record => <> <Title level={5}>Descrição</Title> 
                                                    <p style={{ margin: 0 }}> {record.descricao}</p> </> }}
    />;
  }
}

export default App