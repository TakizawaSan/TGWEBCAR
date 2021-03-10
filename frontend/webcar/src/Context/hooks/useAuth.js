import { useState, useEffect } from 'react'

import api from '../../app/api'
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
            // api.defaults.headers.Authorization = token
            setAthenticated(true)
            setId(idSafe)
            setPermission(permissionSafe)
        }
        
        setLoading(false) 
    }, [])

    async function handleLogin(props){
        try {
            console.log(props)
            const { data: { token, id, permission }} = await api.post('/signin',props)
            
            localStorage.setItem('token', token)
            localStorage.setItem('idSafe', id)
            localStorage.setItem('permissionSafe', permission)
            api.defaults.headers.Authorization = token
            setAthenticated(true)
            setId(id)
            setPermission(permission)
            
            history.push(`/${permission}`)

        } catch (msg) {
            console.log(msg)
            alert("Email/Senha inválidos")
        }
        
        
    
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