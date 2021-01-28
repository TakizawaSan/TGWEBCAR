import { useState, useEffect } from 'react'

export default function useAuth(){
    const [ Teste, setTeste ] = useState([]);
    setTeste('OIIIIII')
    return { Teste }
}