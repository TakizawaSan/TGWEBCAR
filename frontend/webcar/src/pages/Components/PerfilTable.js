import React from 'react';
import { Table, Input, Button, Space, Popconfirm, Descriptions} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RestOutlined,EditTwoTone } from '@ant-design/icons';

const data = [];
for (let i = 10; i < 50; i++) {
  data.push({
    key: i,
    nome: `John Brown ${i}`,
    telefone:'(16) 98171-7322',
    endereco: `Rua Ipiranga das ${i}`,
    numero: `${i}`,
    complemento: 'Itapuã Fundo',
    veiculos:  [{ id:`${i}` ,descricao: 'ASTRA PRETO', placa: `ADS1${i}`, ano:'2020'},
                { id:`${i+1}` ,descricao: 'ASTRA PRETO', placa: `ADS1${i}`, ano:'2020'}]
  },);
}

class App extends React.Component {
  state = {
    searchText: '',
    searchedColumn: '',
  };

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
  renderRows = propss => {
    const veiculos = propss || []
    return veiculos.map( veiculo => (
        <React.Fragment key={veiculo.id} >
          <Descriptions.Item className='conf-desciI' label="Descrição do Veiculo">{veiculo.descricao}</Descriptions.Item>
          <Descriptions.Item className='conf-desciI' label="Placa">{veiculo.placa}</Descriptions.Item>
          <Descriptions.Item className='conf-desciI' label="Ano">{veiculo.ano}</Descriptions.Item>
        </React.Fragment>
      ))
  }
  render() {
    const columns = [
      {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome',
        width: '20%',
        fixed: 'left',
        ...this.getColumnSearchProps('titulo'),
      },
      {
        title: 'Telefone',
        dataIndex: 'telefone',
        key: 'telefone',
        ...this.getColumnSearchProps('telefone'),
      },
      {
        title: 'Endereço',
        dataIndex: 'endereco',
        key: 'endereco',
        ...this.getColumnSearchProps('endereco'),
      },
      {
        title: 'Numero',
        dataIndex: 'numero',
        key: 'numero',
      },
      {
        title: 'Complemento',
        dataIndex: 'complemento',
        key: 'complemento',
        ...this.getColumnSearchProps('complemento'),
      },
      {
        title: '',
        dataIndex: 'operation',
        width: '8%',
        render: () =>
          (
            <>
            <a><EditTwoTone style={{ fontSize: '20px', marginRight:'1rem'}} /></a>
            <Popconfirm title="Deseja excluir essa manutenção?" onConfirm={() => this.handleDelete()}>
              <RestOutlined style={{ fontSize: '20px', color: '#08c' }}/>
            </Popconfirm>
            
            </>
          )
      }
    ];
    return <Table bordered columns={columns}  dataSource={data} scroll={{ x: 400 }} 
            expandable={{
                expandedRowRender: record => 
                <Descriptions title="Veiculos Relacionados">
                    {this.renderRows(record.veiculos)}
                </Descriptions>
                
                }}
    />;
  }
}

export default App