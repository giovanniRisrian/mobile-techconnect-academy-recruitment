import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ActivityIndicator} from 'react-native';
import {
  Avatar,
  Box,
  Center,
  HStack,
  Button,
  FormControl,
  Input,
  Radio,
  VStack,
  Stack,
  IconButton,
  ScrollView,
  Text,
} from 'native-base';
import * as Yup from 'yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';
import {useSelector} from 'react-redux';
import UpploadResumeButtonComponent from '../../../../component/uploadButton/UploadResumeButtonComponent';
import UploadResumeButton from '../../../../component/uploadButton/UploadResumeButton';
import UploadResumeService from '../../../../service/UploadFileService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const validationSchema = Yup.object().shape({
  Education: Yup.array().of(
    Yup.object().shape({
      Title: Yup.string().required('This field is required'),
      Institution: Yup.string().required('This field is required'),
      Major: Yup.string().required('This field is required'),
      YearIn: Yup.string()
        .required('This field is required')
        .min(4, 'Year in must be 4 character')
        .max(4, 'Year in must be 4 character'),
      YearOut: Yup.string()
        .required('This field is required')
        .min(4, 'Year out must be 4 character')
        .max(4, 'Year in must be 4 character'),
      GPA: Yup.string().required('This field is required'),
    }),
  ),
});

const ProfileEducationScreen = ({bloc}) => {
  const {addProfile, getDataByID, checkEducation, setCheckEducation} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
  const isLoading = useSelector(state => state.ProfileReducer.isLoading);
  const [initialValues, changeInitial] = useState({
    Education: [
      {
        Title: '',
        Institution: '',
        Major: '',
        YearIn: '',
        YearOut: '',
        GPA: '',
      },
    ],
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: EducationField,
    append: EducationAppend,
    remove: EducationRemove,
  } = useFieldArray({control, name: 'Education'});

  const onCancel = () => {
    // goToScreenWithParams(PROFILE_PATH, {route: 1, key: 'personal'}, false);
    getDataByID(userInfo.id, userInfo, changeInitial);
    changeDisable(!disabled);
  };

  const onSubmit = values => {
    // function to submit
    addProfile(values, file, userInfo);
    changeDisable(!disabled);
  };

  useEffect(() => {
    getDataByID(userInfo.id, userInfo, changeInitial);
  }, []);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues]);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Please wait</Text>
        <ActivityIndicator />
      </View>
    );
  } else {
    return (
      <SafeAreaView backgroundColor="#ECE1EE" style={{flex: 1}}>
        <ScrollView>
          <Box marginTop={5}>
            {/* Start of Avatar */}
            <Center>
              {/* End of Avatar */}
              {/* Start of Edit & Upload Button */}

              <Box space={4} alignItems="center">
                {disabled ? (
                  <Button
                    onPress={() => {
                      setCheckEducation(' ');
                      changeDisable(!disabled);
                    }}
                    variant="subtle"
                    colorScheme="primary"
                    leftIcon={
                      <Icon name="account-edit" size={15} color={'#06b6d4'} />
                    }
                    size="xs">
                    Edit Profile
                  </Button>
                ) : (
                  <></>
                )}
              </Box>

              {/* End of Edit & Upload Button */}
              {/* Start of Form */}
              {checkEducation === '' ? (
                <View>
                  <Box marginY={'3/5'}>
                    <Text>No data</Text>
                  </Box>
                </View>
              ) : (
                <View>
                  {EducationField.map((values, idx) => {
                    const handleDelete = () => {
                      EducationRemove(idx);
                    };
                    return (
                      <Box key={idx}>
                        <FormControl mt="4">
                          <FormControl.Label alignSelf="center" mb={3}>
                            {`Education #${idx + 1}`}
                          </FormControl.Label>
                          <HStack justifyContent="space-evenly">
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Title
                              </Text>
                              <Controller
                                name={`Education[${idx}].Title`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Title"
                                    variant="filled"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    backgroundColor={'#f2eef3'}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.Title
                                  ? errors?.Education?.[idx]?.Title.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Institution
                              </Text>
                              <Controller
                                name={`Education[${idx}].Institution`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Institution"
                                    variant="filled"
                                    value={value}
                                    backgroundColor={'#f2eef3'}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.Institution
                                  ? errors?.Education?.[idx]?.Institution
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>
                          <HStack justifyContent="space-evenly" mt={3}>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Year In
                              </Text>
                              <Controller
                                name={`Education[${idx}].YearIn`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Year In"
                                    variant="filled"
                                    value={value}
                                    backgroundColor={'#f2eef3'}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.YearIn
                                  ? errors?.Education?.[idx]?.YearIn.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Year Out
                              </Text>
                              <Controller
                                name={`Education[${idx}].YearOut`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Year Out"
                                    variant="filled"
                                    value={value}
                                    backgroundColor={'#f2eef3'}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.YearOut
                                  ? errors?.Education?.[idx]?.YearOut.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>
                          <HStack justifyContent="space-evenly" mt={3}>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Major
                              </Text>
                              <Controller
                                name={`Education[${idx}].Major`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Major"
                                    variant="filled"
                                    value={value}
                                    backgroundColor={'#f2eef3'}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.Major
                                  ? errors?.Education?.[idx]?.Major.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={1}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                GPA
                              </Text>
                              <Controller
                                name={`Education[${idx}].GPA`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="GPA"
                                    variant="filled"
                                    value={value}
                                    backgroundColor={'#f2eef3'}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Education?.[idx]?.GPA
                                  ? errors?.Education?.[idx]?.GPA.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>

                          {/* Start of Edit & Upload Button */}
                          {idx === 0 ? (
                            <Box />
                          ) : (
                            <Box>
                              {disabled ? (
                                <Box />
                              ) : (
                                <Button
                                  onPress={() => handleDelete()}
                                  variant="subtle"
                                  colorScheme="primary"
                                  size="xs">
                                  X
                                </Button>
                              )}
                            </Box>
                          )}
                        </FormControl>
                        {/* End of Form */}
                      </Box>
                    );
                  })}

                  {disabled ? (
                    <Box />
                  ) : (
                    <Box>
                      <HStack
                        space={4}
                        alignItems="center"
                        justifyContent="center"
                        marginTop={1}>
                        <Box width={'50%'}>
                          <Button
                            onPress={() =>
                              EducationAppend({
                                Title: '',
                                Institution: '',
                                Major: '',
                                YearIn: '',
                                YearOut: '',
                                GPA: '',
                              })
                            }
                            variant="subtle"
                            colorScheme="primary"
                            size="xs"
                            leftIcon={
                              <Icon
                                name="plus-circle"
                                size={15}
                                color={'#06b6d4'}
                              />
                            }
                            disabled={EducationField.length >= 3}>
                            Add
                          </Button>
                        </Box>
                      </HStack>
                      <HStack justifyContent="center" mb={1} mt={5}>
                        <Box width={'50%'}>
                          <Button
                            onPress={onCancel}
                            variant="subtle"
                            size="xs"
                            leftIcon={
                              <Icon
                                name="account-cancel"
                                size={15}
                                color={'#ef4444'}
                              />
                            }
                            colorScheme="red">
                            Cancel
                          </Button>
                        </Box>
                        <Box width={'50%'}>
                          <Button
                            onPress={handleSubmit(onSubmit)}
                            variant="subtle"
                            size="xs"
                            leftIcon={
                              <Icon
                                name="account-check"
                                size={15}
                                color={'#3b82f6'}
                              />
                            }
                            colorScheme="blue">
                            Submit
                          </Button>
                        </Box>
                      </HStack>
                    </Box>
                  )}
                </View>
              )}
            </Center>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfileEducationScreen;
