import { useState, useEffect } from 'react'

import api from '../../api'
import history from '../../history'

export default function useAuth(){
    const [ idCamelao, setId ] = useState([]);
    const [ permissionCamaleao, setPermission ] = useState([]);
    const [ authenticated, setAthenticated ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    useEffect(() =>{
        
        const token = localStorage.getItem('token')
        const idSafe = localStorage.getItem('idSafe')
        const permissionSafe =localStorage.getItem('permissionSafe')
        console.log(token)
        if(token){           
            api.defaults.headers.Authorization = token
            setAthenticated(true)
            setId(idSafe)
            setPermission(permissionSafe)
        }
        
        setLoading(false) 
    }, [])

    async function handleLogin(){
        const { data: { token, id, permission }} = await api.post('/signin',{ 
            "usuario":"Usuariobr", "senha":"123456"})
        
        localStorage.setItem('token', token)
        localStorage.setItem('idSafe', id)
        localStorage.setItem('permissionSafe', permission)
        api.defaults.headers.Authorization = token
        setAthenticated(true)
        setId(id)
        setPermission(permission)
        
        history.push(`/${permission}`)
        
    
    }
    async function handleLogout(){
        setAthenticated(false)
        setId('')
        setPermission('')
        localStorage.setItem('idSafe', '')
        localStorage.setItem('permissionSafe', '')
        api.defaults.headers.Authorization = undefined
        history.push('/login')
        
    }

    return { authenticated, loading, idCamelao, permissionCamaleao, handleLogin, handleLogout }
}