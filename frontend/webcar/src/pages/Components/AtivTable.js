import React from 'react';
import { Table, Input, Button, Space, Popconfirm, Descriptions} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RestOutlined,EditTwoTone } from '@ant-design/icons';

class App extends React.Component {

  constructor(props){
    super(props)
    console.log(props)
    props.buscarAtividade()
    this.state = {
      searchText: '',
      searchedColumn: '',
    };
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
    const dado = this.props.atividades
    //console.log(dado)
    //const dados = this.multipicaDados(dado)
    const dados = dado.map( dad => (
      { key:dad.id + '1',
        id:dad.id,
        tempoEstimado:dad.tempoEstimado > 1 ? `${parseInt(dad.tempoEstimado)} Horas`:'Indeterminado',
        titulo:dad.titulo,
        descricao:dad.descricao 
      }))
    //const dados = this.organizaDados([dado])

    const columns = [
      {
        title: 'Titulo',
        dataIndex: 'titulo',
        key: 'titulo',
        width: '50%',
        fixed: 'left',
        ...this.getColumnSearchProps('titulo'),
      },
      {
        title: 'Tempo Estimado',
        dataIndex: 'tempoEstimado',
        key: 'tempoEstimado'
      },
      {
        title: 'id',
        dataIndex: 'id',
        width: '8%',
        render: id =>
          (
            <>
            <Popconfirm title=" Editar a manutenção?" onConfirm={() => this.props.handleEdit(id)}>
              <EditTwoTone style={{ fontSize: '20px', marginRight:'1rem'}} />
            </Popconfirm>
            <Popconfirm title="Deseja excluir essa manutenção?" onConfirm={() => this.props.handleDelete(id)}>
              <RestOutlined style={{ fontSize: '20px', color: '#08c' }}/>
            </Popconfirm>
            
            </>
          )
      }
    ];
    return <Table bordered columns={columns}  dataSource={dados} scroll={{ x: 400 }} 
            expandable={{ expandedRowRender: record => 
              <Descriptions title="Descrição">
                    <Descriptions.Item className='conf-desciI' label="">{record.descricao}</Descriptions.Item>
              </Descriptions>}}
    />;
  }
}

export default App