import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '80%',
  },
  customMarker: {
    backgroundColor: '#2E8494',
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  customMarkerText: {
    padding: 5,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: '4%',
    marginHorizontal: '20%',
  },
  button: {
    backgroundColor: '#2E8494',
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 15,
  },
  textButton: {
    textAlign: 'center',
    color: '#ffff',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: 'bold',
  },
});
