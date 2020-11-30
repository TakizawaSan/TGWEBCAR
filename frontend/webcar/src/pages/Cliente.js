import React, { useState, useEffect, useContext } from 'react';

import api from '../api';

import { Context } from '../Context/AuthContext'

import Padrao from './VisualPadrao';


export default function Users() {
  const { idCamelao } = useContext(Context)
  const [cliente, setCliente] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/cliente/${idCamelao}`)
      setCliente(data);
    })();
  }, []);
  console.log(cliente)
  return (
    <>
      <Padrao ></Padrao>
    </>
  );
}