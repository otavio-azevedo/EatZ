import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ConfirmPickUpModal = ({
  isVisible,
  onClose,
  onSubmit,
  selectedOrder,
}) => {
  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType='slide'>
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Icon name='id-card' size={24} color='#2E8494' />
          <Text style={styles.title}>
            Confirma a retirada do pedido Nº {selectedOrder?.id}?
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={onClose}
            title={'Não'}
            buttonStyle={styles.skipButton}
            textStyle={styles.skipButtonText}
          />
          <CustomButton
            onPress={handleSubmit}
            title={'Sim'}
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

export default ConfirmPickUpModal;
