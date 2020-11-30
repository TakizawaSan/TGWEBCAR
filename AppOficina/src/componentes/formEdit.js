import React from "react";
import { Text, View, TextInput, Button, Alert,StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function App() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  return 
  
}


