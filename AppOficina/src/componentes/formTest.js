import React, { useEffect } from 'react'
import { Alert, Text, TextInput, View, StyleSheet, Button} from 'react-native'
//import {Button} from 'react-native-paper'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const fieldValidationSchema = yup.object().shape({
  email: yup
    .string()
    .required('O email não pode ser vazio')
    .email('Digite um email válido'),
  password: yup
    .string()
    .required('A senha não pode ser vazia')
    .min(6, 'A senha deve conter pelo menos 6 dígitos')
})

const LoginScreen = () => {
  const { register, setValue, handleSubmit, errors } = useForm({ validationSchema: fieldValidationSchema })
	const onSubmit = data => Alert.alert(data.email, data.password)
  
	useEffect(() => {
    register('email')
    register('password')
  }, [register])

  return (
    <View style={styles.mainContainer}>
      <TextField
        label={'Email'}
        error={errors?.email}
        placeholder={'Digite seu email'}
        onChangeText={text => setValue('email', text)}
      />
      <TextField
        secureTextEntry
        label={'Senha'}
        error={errors?.password}
        placeholder={'Digite sua senha'}
        onChangeText={text => setValue('password', text)}
      />
      <Button title='Sign In' onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const TextField = ({ error, label, ...inputProps }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
			style={[styles.input, !!error && styles.borderError]}
			{...inputProps}
		/>
    {!!error && <Text style={styles.errorMessage}>{error.message}</Text>}
  </View>
)

export default LoginScreen
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  input: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderRadius: 8
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4
  },
  container: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 10
  },
  borderError: {
    borderWidth: 1,
    borderColor: 'rgba(200,0,50,1)'
  },
  errorMessage: {
    fontSize: 12,
    color: 'rgba(200,0,50,1)',
    textAlign: 'center',
    marginTop: 5
  }
})