/* eslint-disable react-hooks/exhaustive-deps */
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
  Select,
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
import UploadPictureButton from '../../../../component/uploadPicture/UploadPictureButton';
import UpploadPictureButtonComponent from '../../../../component/uploadPicture/UploadPictureComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinkedInButton from '../../../../component/linkedInButton/linkedInComponent';
import LinkedIn from '../../../../component/linkedInButton/linkedIn';
import ProfileService from '../../../../service/ProfileService';

const validationSchema = Yup.object().shape({
  Personal: Yup.object().shape({
    Name: Yup.string().required('This field is required'),
    Gender: Yup.string().required('This field is required'),
    BirthDate: Yup.date().required('This field is required'),
    Domicile: Yup.string().required('This field is required'),
    Email: Yup.string()
      .required('This field is required')
      .email('Invalid format email'),
    TelephoneNo: Yup.string().required('This field is required'),
  }),
  SkillSet: Yup.array().of(
    Yup.object().shape({
      Skill: Yup.string().required('This field is required'),
    }),
  ),
});

const ProfilePersonalScreen = ({bloc}) => {
  const {addProfile, getDataByID, setChangePhoto, changePhoto} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthdate, setBirthdate] = useState('');
  const isLoading = useSelector(state => state.ProfileReducer.isLoading);
  const [initialValues, changeInitial] = useState({
    Personal: {
      Name: '',
      Gender: '',
      BirthDate: '',
      Domicile: '',
      Email: '',
      TelephoneNo: '',
      TotalWorkingExperience: '',
      SalaryExpectation: '',
    },
    SkillSet: [
      {
        Skill: '',
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
    fields: SkillSetField,
    append: SkillSetAppend,
    remove: SkillSetRemove,
  } = useFieldArray({control, name: 'SkillSet'});

  const onConfirm = date => {
    // You should close the modal in here
    setShowDatePicker(false);
    setBirthdate(date.dateString);
  };

  const onCancel = () => {
    // goToScreenWithParams(PROFILE_PATH, {route: 1, key: 'personal'}, false);
    getDataByID(userInfo.id, userInfo, changeInitial);
    changeDisable(!disabled);
  };

  const onSubmit = values => {
    // function to submit
    values.Personal.BirthDate = dayjs(birthdate).format('YYYY-MM-DD');
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
              {initialValues.Personal.PhotoFile ? (
                <Avatar
                  bg="grey.900"
                  alignSelf="center"
                  size="2xl"
                  source={{
                    uri: `data:image/jpeg/png/jpg;base64,${initialValues.Personal.PhotoFile}`,
                  }}></Avatar>
              ) : (
                <View>
                  <Avatar
                    bg="grey.900"
                    alignSelf="center"
                    size="2xl"
                    source={require('../../../../assets/images/avatar.png')}></Avatar>

                  {/*<UpploadResumeButtonComponent
                    uploadResume={() => UploadResumeButton(UploadResumeService)}
              />*/}
                </View>
              )}

              <HStack space={4} alignItems="center" marginTop={2}>
                {disabled ? (
                  <UpploadPictureButtonComponent
                    uploadPicture={() =>
                      UploadPictureButton(UploadResumeService)
                    }
                  />
                ) : (
                  <View></View>
                )}

                {disabled ? (
                  <Button
                    onPress={() => changeDisable(!disabled)}
                    variant="subtle"
                    colorScheme="primary"
                    size="xs"
                    leftIcon={
                      <Icon name="account-edit" size={15} color={'#06b6d4'} />
                    }>
                    Edit Profile
                  </Button>
                ) : (
                  <HStack space={2}>
                    <LinkedInButton bloc={() => LinkedIn(ProfileService)} />
                    <UpploadResumeButtonComponent
                      uploadResume={() =>
                        UploadResumeButton(UploadResumeService)
                      }
                    />
                  </HStack>
                )}
              </HStack>

              {/* End of Edit & Upload Button */}
              {/* Start of Form */}

              <FormControl mt="5">
                <HStack justifyContent="space-evenly">
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Name
                    </Text>
                    <Controller
                      name="Personal.Name"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          placeholder="Name"
                          variant="filled"
                          backgroundColor={'#f2eef3'}
                          error={Boolean(errors.Personal?.Name)}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}
                    />
                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.Name
                          ? errors.Personal?.Name.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Email
                    </Text>
                    <Controller
                      name="Personal.Email"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Email"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          backgroundColor={'#f2eef3'}
                          error={Boolean(errors.Personal?.Email)}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}
                    />
                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.Email
                          ? errors.Personal?.Email.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                </HStack>
                <HStack justifyContent="space-evenly" mt={2}>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Phone Number
                    </Text>
                    <Controller
                      name="Personal.TelephoneNo"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Phone Number"
                          variant="filled"
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          backgroundColor={'#f2eef3'}
                          error={Boolean(errors.Personal?.TelephoneNo)}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}
                    />

                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.TelephoneNo
                          ? errors.Personal?.TelephoneNo.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Gender
                    </Text>
                    <Controller
                      name="Personal.Gender"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Select
                          selectedValue={value}
                          error={Boolean(errors.Personal?.TelephoneNo)}
                          isDisabled={disabled}
                          variant="filled"
                          accessibilityLabel="Gender"
                          placeholder="Gender"
                          fontSize={'sm'}
                          backgroundColor={'#f2eef3'}
                          onValueChange={onChange}>
                          <Select.Item label="Male" value="male" />
                          <Select.Item label="Female" value="female" />
                        </Select>
                      )}
                    />
                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.Gender
                          ? errors.Personal?.Gender.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                </HStack>
                <HStack justifyContent="space-evenly" mt={2}>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Birth Date
                    </Text>
                    <Controller
                      name="Personal.BirthDate"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Birth Date"
                          variant="filled"
                          value={birthdate ? birthdate : value}
                          onChange={onChange}
                          onBlur={onBlur}
                          backgroundColor={'#f2eef3'}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                          onPressIn={() => setShowDatePicker(true)}
                        />
                      )}
                    />
                    <DatePicker
                      isVisible={showDatePicker}
                      mode={'single'}
                      onCancel={() => setShowDatePicker(false)}
                      onConfirm={onConfirm}
                    />

                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.BirthDate
                          ? errors.Personal?.BirthDate.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Domicile
                    </Text>
                    <Controller
                      name="Personal.Domicile"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Domicile"
                          variant="filled"
                          value={value}
                          onChangeText={onChange}
                          backgroundColor={'#f2eef3'}
                          onBlur={onBlur}
                          error={Boolean(errors.Personal?.Domicile)}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}
                    />
                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.Domicile
                          ? errors.Personal?.Domicile.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                </HStack>
                <HStack justifyContent="space-evenly" mt={2}>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Working Experience
                    </Text>
                    <Controller
                      name="Personal.TotalWorkingExperience"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Working Experience"
                          variant="filled"
                          value={value}
                          onChangeText={onChange}
                          backgroundColor={'#f2eef3'}
                          onBlur={onBlur}
                          error={Boolean(
                            errors.Personal?.TotalWorkingExperience,
                          )}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}
                    />
                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.TotalWorkingExperience
                          ? errors.Personal?.TotalWorkingExperience.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                  <Box w="48%">
                    <Text
                      mb={0}
                      marginLeft={2}
                      fontWeight={'light'}
                      fontSize={'xs'}>
                      Salary Expectation
                    </Text>
                    <Controller
                      name="Personal.SalaryExpectation"
                      control={control}
                      render={({field: {onChange, onBlur, value}}) => (
                        <Input
                          placeholder="Salary Expectation"
                          variant="filled"
                          value={value}
                          onChangeText={onChange}
                          backgroundColor={'#f2eef3'}
                          onBlur={onBlur}
                          error={Boolean(errors.Personal?.SalaryExpectation)}
                          isReadOnly={disabled}
                          fontSize={'sm'}
                        />
                      )}></Controller>

                    <FormControl.HelperText mt={0}>
                      <Text fontSize={'2xs'}>
                        {errors.Personal?.SalaryExpectation
                          ? errors.Personal?.SalaryExpectation.message
                          : ''}
                      </Text>
                    </FormControl.HelperText>
                  </Box>
                </HStack>
                <Box w="100%">
                  <Text
                    mb={0}
                    marginLeft={2}
                    fontWeight={'light'}
                    fontSize={'xs'}>
                    Skill Set
                  </Text>
                  <HStack
                    justifyContent="flex-start"
                    mt={2}
                    marginLeft={1}
                    space="2"
                    flexWrap="wrap">
                    {SkillSetField.map((SkillSet, index) => {
                      const handleDelete = () => {
                        // func logic delete confrimation
                        SkillSetRemove(index);
                      };
                      return (
                        <Box key={index} minWidth="47%" mt={1}>
                          <Controller
                            name={`SkillSet[${index}].Skill`}
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                              <Input
                                placeholder="Skill"
                                variant="filled"
                                value={value}
                                onChangeText={onChange}
                                backgroundColor={'#f2eef3'}
                                onBlur={onBlur}
                                error={Boolean(errors.Personal?.SkillSet)}
                                isReadOnly={disabled}
                                fontSize={'sm'}
                              />
                            )}
                          />
                          {index === 0 ? (
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
                        </Box>
                      );
                    })}
                  </HStack>

                  <FormControl.HelperText mt={0}>
                    <Text fontSize={'2xs'}>
                      {errors.SkillSet?.Name
                        ? errors.Personal?.SkillSet.message
                        : ''}
                    </Text>
                  </FormControl.HelperText>
                  {disabled ? (
                    <Box />
                  ) : (
                    <HStack
                      space={4}
                      alignItems="center"
                      justifyContent="center"
                      marginTop={1}>
                      <Box width={'50%'}>
                        <Button
                          onPress={() => SkillSetAppend({Skill: ''})}
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
                          disabled={SkillSetField.length >= 10}>
                          Add Skill
                        </Button>
                      </Box>
                    </HStack>
                  )}
                </Box>

                {/* Start Button */}
                {disabled ? (
                  <Box />
                ) : (
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
                )}

                {/* End Button */}
              </FormControl>
              {/* End of Form */}
            </Center>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfilePersonalScreen;
