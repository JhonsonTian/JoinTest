import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    width: '100%',
    height: 60,
  },
  button: {
    width: '100%',
    height: 55,
  },
  activityIndicator: { height: 50 },
  virtualList: { flex: 1 },
  inputContainer: {
    width: '90%',
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 15,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderBottomWidth: 0,
  },
});
