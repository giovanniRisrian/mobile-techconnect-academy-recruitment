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
  Icon,
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
import DatePicker from 'react-native-neat-date-picker';
import dayjs from 'dayjs';

const validationSchema = Yup.object().shape({
  WorkExperience: Yup.array().of(
    Yup.object().shape({
      CompanyName: Yup.string().required('This field is required'),
      Position: Yup.string().required('This field is required'),
      Level: Yup.string().required('This field is required'),
      Industry: Yup.string().required('This field is required'),
      // YearIn: Yup.string().required('This field is required'),
      // YearOut: Yup.string().required('This field is required'),
      Description: Yup.string().required('This field is required'),
    }),
  ),
});

const ProfileWorkExperienceScreen = ({bloc}) => {
  const {addProfile, getDataByID, checkWork, setCheckWork} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const isLoading = useSelector(state => state.ProfileReducer.isLoading);
  const [disabled, changeDisable] = useState(true);
  const [showDatePickerYearIn, setShowDatePickerYearIn] = useState(false);
  const [tempDatePickerYearIn, setTempDatePickerYearIn] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [tempDatePickerYearOut, setTempDatePickerYearOut] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  // const [showDatePickerYearIn1, setShowDatePickerYearIn1] = useState(false);
  // const [showDatePickerYearIn2, setShowDatePickerYearIn2] = useState(false);
  const [showDatePickerYearOut, setShowDatePickerYearOut] = useState(false);
  // const [showDatePickerYearOut1, setShowDatePickerYearOut1] = useState(false);
  // const [showDatePickerYearOut2, setShowDatePickerYearOut2] = useState(false);
  const [dateIn, setDateIn] = useState('');
  // const [dateIn1, setDateIn1] = useState('');
  // const [dateIn2, setDateIn2] = useState('');
  const [dateOut, setDateOut] = useState('');
  // const [dateOut1, setDateOut1] = useState('');
  // const [dateOut2, setDateOut2] = useState('');
  const [nowIndex, setNowIndex] = useState('');
  const [initialValues, changeInitial] = useState({
    WorkExperience: [
      {
        CompanyName: '',
        Position: '',
        Level: '',
        Industry: '',
        YearIn: '',
        YearOut: '',
        Description: '',
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
    fields: WorkExperienceField,
    append: WorkExperienceAppend,
    remove: WorkExperienceRemove,
  } = useFieldArray({control, name: 'WorkExperience'});

  // const valueReturnYearIn = (idx, value) => {
  //   if (idx === 0) {
  //     if (dateIn) {
  //       return dateIn;
  //     } else {
  //       return value;
  //     }
  //   }
  //   if (idx === 1) {
  //     if (dateIn1) {
  //       return dateIn1;
  //     } else {
  //       return value;
  //     }
  //   }
  //   if (idx === 2) {
  //     if (dateIn2) {
  //       return dateIn2;
  //     } else {
  //       return value;
  //     }
  //   }
  // };

  // Year In
  const datePickerYearIn = () => {
    setShowDatePickerYearIn(true);
  };

  // const datePickerYearIn1 = () => {
  //   setShowDatePickerYearIn1(true);
  // };

  // const datePickerYearIn2 = () => {
  //   setShowDatePickerYearIn2(true);
  // };

  const cancelDatePickerYearIn = () => {
    setShowDatePickerYearIn(false);
  };

  // const cancelDatePickerYearIn1 = () => {
  //   setShowDatePickerYearIn1(false);
  // };

  // const cancelDatePickerYearIn2 = () => {
  //   setShowDatePickerYearIn2(false);
  // };

  const onConfirmYearIn = (date, index) => {
    // console.log(date);
    console.log(index);
    console.log('INDEX SEKARANG ADALAH', nowIndex);
    index = nowIndex;
    let temp = tempDatePickerYearIn;
    temp[index] = date.dateString;
    setShowDatePickerYearIn(false);
    console.log(temp);
    // initialValues.WorkExperience[index].YearIn = dayjs(date.dateString).format(
    //   'YYYY-MM-DD',
    // );
    // setDateIn(null);
    setTempDatePickerYearIn(temp);
    console.log('TDP ADALAH', tempDatePickerYearIn);
    setDateIn(date.dateString);
    console.log('DATEIN adalah', dateIn);
  };

  // const onConfirmYearIn1 = date => {
  //   setShowDatePickerYearIn1(false);
  //   setDateIn1(date.dateString);
  // };

  // const onConfirmYearIn2 = date => {
  //   setShowDatePickerYearIn2(false);
  //   setDateIn2(date.dateString);
  // };

  // Year Out
  const datePickerYearOut = () => {
    setShowDatePickerYearOut(true);
  };

  // const datePickerYearOut1 = () => {
  //   setShowDatePickerYearOut1(true);
  // };

  // const datePickerYearOut2 = () => {
  //   setShowDatePickerYearOut2(true);
  // };

  const onConfirmYearOut = date => {
    let index = nowIndex;
    let temp = tempDatePickerYearOut;
    temp[index] = date.dateString;
    // initialValues.WorkExperience[index].YearOut = dayjs(date.dateString).format(
    //   'YYYY-MM-DD',
    // );
    // // setDateIn(null);
    setTempDatePickerYearOut(temp);
    setShowDatePickerYearOut(false);
    setDateOut(date.dateString);
  };

  // const onConfirmYearOut1 = date => {
  //   setShowDatePickerYearOut2(false);
  //   setDateOut2(date.dateString);
  // };

  // const onConfirmYearOut2 = date => {
  //   setShowDatePickerYearOut2(false);
  //   setDateOut2(date.dateString);
  // };

  const onChangeDate = (values, idx) => {};
  const onSubmit = values => {
    // function to submit
    // values.WorkExperience[0].YearIn = dayjs(dateIn).format('YYYY-MM-DD');
    // values.WorkExperience[0].YearOut = dayjs(dateOut).format('YYYY-MM-DD');
    // values.WorkExperience[1].YearIn = dayjs(dateIn1).format('YYYY-MM-DD');
    // values.WorkExperience[1].YearOut = dayjs(dateOut1).format('YYYY-MM-DD');
    for (let x = 0; x < values.WorkExperience.length; x++) {
      if (tempDatePickerYearIn[x] != null) {
        values.WorkExperience[x].YearIn = dayjs(tempDatePickerYearIn[x]).format(
          'YYYY-MM-DD',
        );
      }
      if (tempDatePickerYearOut[x] != null) {
        values.WorkExperience[x].YearOut = dayjs(
          tempDatePickerYearOut[x],
        ).format('YYYY-MM-DD');
      }
    }
    console.log('values to Input', values.WorkExperience);
    // values.WorkExperience[2].YearIn = dayjs(dateIn2).format('YYYY-MM-DD');
    // values.WorkExperience[2].YearOut = dayjs(dateOut2).format('YYYY-MM-DD');
    userInfo.WorkExperience = values.WorkExperience;
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
      <SafeAreaView>
        <ScrollView>
          <Box marginTop={5}>
            {/* Start of Avatar */}
            <Center>
              {/* End of Avatar */}
              {/* Start of Edit & Upload Button */}

              <HStack space={4} alignItems="center" marginTop={2}>
                {disabled ? (
                  <Button
                    onPress={() => {
                      setCheckWork(' ');
                      changeDisable(!disabled);
                    }}
                    variant="subtle"
                    colorScheme="primary"
                    size="xs">
                    Edit Profile
                  </Button>
                ) : (
                  <Text></Text>
                )}

                {/* <IconButton icon={<Icon as name="" />}></IconButton> */}
              </HStack>

              {/* End of Edit & Upload Button */}
              {/* Start of Form */}
              {checkWork === '' ? (
                <View>
                  <Box marginY={'1/3'}>
                    <Text>No data</Text>
                  </Box>
                </View>
              ) : (
                <View>
                  {WorkExperienceField.map((values, idx) => {
                    const handleDelete = () => {
                      WorkExperienceRemove(idx);
                    };
                    return (
                      <Box key={idx}>
                        <FormControl mt="4">
                          <FormControl.Label alignSelf="center" mb={3}>
                            {`Work Experience #${idx + 1}`}
                          </FormControl.Label>
                          <HStack justifyContent="space-evenly">
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Company Name
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].CompanyName`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Company Name"
                                    variant="underlined"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.CompanyName
                                  ? errors?.WorkExperience?.[idx]?.CompanyName
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Position
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].Position`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Position"
                                    variant="underlined"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.Position
                                  ? errors?.WorkExperience?.[idx]?.Position
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>

                          <HStack justifyContent="space-evenly" mt={3}>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Level
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].Level`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Level"
                                    variant="underlined"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.Level
                                  ? errors?.WorkExperience?.[idx]?.Level.message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Industry
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].Industry`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Industry"
                                    variant="underlined"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.Industry
                                  ? errors?.WorkExperience?.[idx]?.Industry
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>

                          <HStack justifyContent="space-evenly" mt={3}>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Start Date
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].YearIn`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Start Date"
                                    variant="underlined"
                                    value={
                                      tempDatePickerYearIn[idx]
                                        ? tempDatePickerYearIn[idx]
                                        : value
                                    }
                                    fontSize={'sm'}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    onPressIn={() => {
                                      setShowDatePickerYearIn(true);
                                      setNowIndex(idx);
                                    }}
                                  />
                                )}
                              />
                              <DatePicker
                                isVisible={showDatePickerYearIn}
                                mode={'single'}
                                onCancel={() => setShowDatePickerYearIn(false)}
                                // onConfirm={
                                //   idx === 0
                                //     ? onConfirmYearIn
                                //     : idx === 1
                                //     ? onConfirmYearIn1
                                //     : onConfirmYearIn2
                                // }
                                onConfirm={
                                  date => onConfirmYearIn(date, values)
                                  // () => {
                                  //   values = dateIn;
                                  // })
                                }
                              />

                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.YearIn
                                  ? errors?.WorkExperience?.[idx]?.YearIn
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                End Date
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].YearOut`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="End Date"
                                    variant="underlined"
                                    value={
                                      tempDatePickerYearOut[idx]
                                        ? tempDatePickerYearOut[idx]
                                        : value
                                    }
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                    // onPressIn={
                                    //   idx === 0
                                    //     ? datePickerYearOut
                                    //     : idx === 1
                                    //     ? datePickerYearOut1
                                    //     : datePickerYearOut2
                                    // }
                                    onPressIn={() => {
                                      setShowDatePickerYearOut(true);
                                      setNowIndex(idx);
                                    }}
                                  />
                                )}
                              />
                              <DatePicker
                                isVisible={showDatePickerYearOut}
                                mode={'single'}
                                onCancel={() => setShowDatePickerYearOut(false)}
                                onConfirm={onConfirmYearOut}
                              />
                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.YearOut
                                  ? errors?.WorkExperience?.[idx]?.YearOut
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>

                          <HStack justifyContent="space-evenly" mt={3}>
                            <Box w="96%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Description
                              </Text>
                              <Controller
                                name={`WorkExperience[${idx}].Description`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
                                    variant="underlined"
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.WorkExperience?.[idx]?.Description
                                  ? errors?.WorkExperience?.[idx]?.Description
                                      .message
                                  : ''}
                              </FormControl.HelperText>
                            </Box>
                          </HStack>

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
                              WorkExperienceAppend({
                                CompanyName: '',
                                Position: '',
                                Level: '',
                                Industry: '',
                                YearIn: '',
                                YearOut: '',
                                Description: '',
                              })
                            }
                            variant="subtle"
                            colorScheme="primary"
                            size="xs"
                            disabled={WorkExperienceField.length >= 3}>
                            Add
                          </Button>
                        </Box>
                      </HStack>
                      <HStack justifyContent="center" mb={1} mt={5}>
                        <Box width={'50%'}>
                          <Button
                            onPress={() => changeDisable(!disabled)}
                            variant="subtle"
                            size="xs"
                            colorScheme="red">
                            Cancel
                          </Button>
                        </Box>
                        <Box width={'50%'}>
                          <Button
                            onPress={handleSubmit(onSubmit)}
                            variant="subtle"
                            size="xs"
                            colorScheme="blue">
                            Submit
                          </Button>
                        </Box>
                      </HStack>
                    </Box>
                  )}
                </View>
              )}

              {/* Submit Cancel Button */}

              {/* Submit Cancel Button */}
            </Center>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfileWorkExperienceScreen;
