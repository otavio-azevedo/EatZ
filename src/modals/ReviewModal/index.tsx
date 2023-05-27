import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReviewModal = ({ isVisible, onClose, onSubmit, selectedOrder }) => {
  const [reviewText, setReviewText] = useState('');
  const [reviewRate, setReviewRate] = useState(5);

  const handleSubmit = () => {
    onSubmit(reviewText, reviewRate);
    setReviewText('');
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Icon name='comment' size={24} color='#2E8494' />
          <Text style={styles.title}>
            Como estava o seu pedido Nº {selectedOrder?.id} em{' '}
            {selectedOrder?.storeName}?
          </Text>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Nota:</Text>
          <Picker
            selectedValue={reviewRate}
            style={styles.picker}
            onValueChange={setReviewRate}
          >
            <Picker.Item label='1' value={1} />
            <Picker.Item label='2' value={2} />
            <Picker.Item label='3' value={3} />
            <Picker.Item label='4' value={4} />
            <Picker.Item label='5' value={5} />
          </Picker>
        </View>

        <TextInput
          placeholder='Deixe aqui sua avaliação...'
          style={styles.input}
          value={reviewText}
          onChangeText={setReviewText}
          multiline
        />

        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={onClose}
            title={'Pular'}
            buttonStyle={styles.skipButton}
            textStyle={styles.skipButtonText}
          />
          <CustomButton
            onPress={handleSubmit}
            title={'Enviar'}
            buttonStyle={styles.submitButton}
            textStyle={styles.submitButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

const CustomButton = ({ onPress, title, buttonStyle, textStyle }) => {
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    width: 100,
    height: 40,
    marginBottom: 8,
  },
  selectedRating: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20%',
  },
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E8494',
  },
  input: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#2E8494',
    borderRadius: 5,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  skipButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#BEBEBE',
    fontSize: 16,
  },
});

export default ReviewModal;
