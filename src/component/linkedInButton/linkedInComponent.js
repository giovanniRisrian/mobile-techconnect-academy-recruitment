import React from 'react';
import {useState} from 'react';
import {Modal, View, Text, TextInput} from 'react-native';
import {Button} from 'native-base';

const LinkedInButton = () => {
  const [show, setShow] = useState(false);
  return (
    <View>
      <Button
        variant="subtle"
        colorScheme="primary"
        size="xs"
        onPress={() => setShow(true)}>
        Fill Data With LinkedIn
      </Button>
      <Modal transparent={true} visible={show}>
        <View style={{backgroundColor: '#000000aa', flex: 1}}>
          <View
            style={{
              backgroundColor: '#ffffff',
              marginTop: 300,
              marginLeft: 50,
              marginRight: 50,
              padding: 40,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'black',
                borderRadius: 10,
                borderStyle: 'solid',
              }}>
              <TextInput size="xs" placeholder="LinkedIn Url" />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 5,
              }}>
              <Button
                variant="subtle"
                colorScheme="red"
                size="xs"
                onPress={() => setShow(false)}>
                Cancel
              </Button>
              <Button variant="subtle" colorScheme="blue" size="xs">
                Submit
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LinkedInButton;
