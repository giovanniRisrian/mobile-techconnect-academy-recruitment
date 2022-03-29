import React from 'react';
import {useState} from 'react';
import {Modal, View, Text, TextInput, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {showLoading} from '../../stores/techconnectAcademy/TechconnectAcademyAction';

const LinkedInButton = ({bloc}) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const {putProfileLinkedin, linkedIn, setLinkedIn} = bloc();
  const isLogin = useSelector(state => state.TechconnectAcademyReducer.isLogin);
  const isLoading = useSelector(
    state => state.TechconnectAcademyReducer.isLoading,
  );
  const getDataWithLinkedIn = async () => {
    dispatch(showLoading(true));
    await putProfileLinkedin();
    dispatch(showLoading(false));
  };
  /*const onSubmitButton = () => {

  }*/

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Please wait</Text>
        <ActivityIndicator />
      </View>
    );
  } else {
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
          <View
            style={{
              backgroundColor: '#000000aa',
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: '#ffffff',
                marginTop: 300,
                marginLeft: 40,
                marginRight: 50,
                padding: 40,
                borderRadius: 25,
                height: 170,
                width: 325,
              }}>
              <View
                style={{
                  marginTop: -25,
                }}>
                <Text>
                  Fill this bar with your linkedin link to auto fill data with
                  your linkedin information
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 10,
                  borderStyle: 'solid',
                  marginTop: 5,
                }}>
                <TextInput
                  onChangeText={url => setLinkedIn(url)}
                  value={linkedIn}
                  size="xs"
                  placeholder="Fill your LinkedIn link here "
                />
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
                <Button
                  onPress={() => getDataWithLinkedIn()}
                  variant="subtle"
                  colorScheme="blue"
                  size="xs">
                  Submit
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

export default LinkedInButton;
