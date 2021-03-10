import React, {  useEffect, useContext } from 'react';

import api from '../app/api';

import { Context } from '../Context/AuthContext'

export default function Users() {
  const { handleLogout } = useContext(Context)
  //const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const id = localStorage.getItem('id')
      const { data } = await api.get(`/cliente/${id}`)
      console.log(data)
      
      //setUsers(data);
    })();
  }, []);
  return (
    <>
      {/* <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nome} ({user.id})</li>
        ))}
      </ul> */}

      <button type="button" onClick={handleLogout}>Sair</button>
    </>
  );
}