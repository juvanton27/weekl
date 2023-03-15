import { useEffect, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { BehaviorSubject } from "rxjs";


const confirmationModal = new BehaviorSubject({
  visible: false,
  title: '',
  message: '',
  response: undefined
});
export const currentConfirmationModal = {
  set: confirmation => confirmationModal.next(confirmation),
  onConfirmationModalVisible: () => confirmationModal.asObservable()
}

const ConfirmationModal = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  useEffect(() => {
    currentConfirmationModal.onConfirmationModalVisible().subscribe(confirmation => {
      setVisible(confirmation.visible);
      setTitle(confirmation.title);
      setMessage(confirmation.message);
    });
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View style={{ minHeight: 100, minWidth: 200, backgroundColor: 'rgba(255,255,255,0.9)', padding: 20, borderRadius: 30, justifyContent: 'space-between' }}>
          <Text style={{fontSize: 30, marginBottom: 20}}>{title}</Text>
          <Text style={{marginBottom: 20}}>{message}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Button title="Non" color='black' onPress={() => {
              confirmationModal.getValue().response.next(false);
              currentConfirmationModal.set({visible: false});
            }} />
            <Button title="Oui" color='red' onPress={() => {
              confirmationModal.getValue().response.next(true);
              currentConfirmationModal.set({visible: false});
            }} />
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ConfirmationModal;