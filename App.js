import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

const App = () => {
  const [valor, setValor] = useState('');
  const [notas, setNotas] = useState([]);

  const calcularRetirada = () => {
    const valorSaque = parseInt(valor);


    if (isNaN(valorSaque) || valorSaque <= 0 || valorSaque % 10 !== 0) {
      Alert.alert("Erro", "Por favor, insira um valor válido (múltiplo de 10).");
      return;
    }


    const cedulasDisponiveis = [50, 20, 10];
    const quantidadeCedulas = [];

    let valorRestante = valorSaque;


    cedulasDisponiveis.forEach((cedula) => {
      const quantidade = Math.floor(valorRestante / cedula);
      if (quantidade > 0) {
        quantidadeCedulas.push({ valor: cedula, quantidade });
        valorRestante -= quantidade * cedula;
      }
    });


    setNotas(quantidadeCedulas);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite o valor a ser retirado (múltiplo de 10):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 150"
      />
      <Button title="Calcular Retirada" onPress={calcularRetirada} />


      <FlatList
        data={notas}
        keyExtractor={(item) => item.valor.toString()}
        renderItem={({ item }) => (
          <Text style={styles.resultText}>
            R${item.valor}: {item.quantidade} nota(s)
          </Text>
        )}
        style={styles.resultList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#999',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  resultList: {
    marginTop: 20,
    width: '100%',
  },
});

export default App;
