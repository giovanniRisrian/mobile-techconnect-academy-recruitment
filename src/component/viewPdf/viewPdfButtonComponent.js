import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ViewPdfButtonComponent = ({viewPdf, propsPdf}) => {
  const [showPdf, setShowPdf] = useState(false);
  const [sourcePdf, setSourcePdf] = useState(null);
  // const {selectFile, isLoading} = uploadPicture();
  const handlePress = () => {
    let PdfFile = propsPdf().split(':')[1];
    const source = {uri: 'data:application/pdf;base64,' + PdfFile};
    setSourcePdf(source);
    setShowPdf(true);
  };
  if (showPdf) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPdf}
        onRequestClose={() => {
          setShowPdf(!showPdf);
        }}>
        <Button

      style={{backgroundColor: '#5F4E98'}}
          onPress={() => {
            setShowPdf(!showPdf);
          }}>
          <Text style={{color: 'white'}}>Close</Text>
        </Button>
        <View style={styles.container}>
          <Pdf
            source={sourcePdf}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        </View>
      </Modal>
    );
  }
  return (
    <Button
      onPress={handlePress}
      variant="subtle"
      colorScheme="primary"
      size="xs"
      leftIcon={<Icon name="read" color={'#06b6d4'} />}>
      <Text style={{color: '#06b6d4'}}>Resume</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // marginTop: 3,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default ViewPdfButtonComponent;
