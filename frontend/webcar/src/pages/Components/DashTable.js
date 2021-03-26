import React from 'react';
import { Table, Input, Button, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, RestOutlined,EditTwoTone } from '@ant-design/icons';
import moment from 'moment';

const data = [];
for (let i = 10; i < 50; i++) {
  data.push({
    key: i,
    titulo: `John Brown ${i}`,
    descricao:'Uma descrição longo ou curta, tanto faz o importante que aprareca ao clicar no maiszinho',
    dataInicio: `20/03/20${i} 08:00`,
    dataTermino: `22/03/2021 20:${i}`,
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

  render() {
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
        sorter: (a, b) => moment(a.dataInicio, 'DD/MM/YYYY HH:mm') - moment(b.dataInicio, 'DD/MM/YYYY HH:mm'),
        key: 'dataTermino',
        width: '35%',
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
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.descricao}</p>
    }}
    />;
  }
}

export default App