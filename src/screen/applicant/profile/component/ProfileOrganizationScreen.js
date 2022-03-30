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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
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
  Organization: Yup.array().of(
    Yup.object().shape({
      Organization: Yup.string().required('This field is required'),
      Scope: Yup.string().required('This field is required'),
      Duration: Yup.string().required('This field is required'),
      Description: Yup.string().required('This field is required'),
      Position: Yup.string().required('This field is required'),
    }),
  ),
});

const ProfileOrganizationScreen = ({bloc}) => {
  const {addProfile, getDataByID, checkOrganization, setCheckOrganization} =
    bloc();
  //console.log('ini check organization', checkOrganization);
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
  const isLoading = useSelector(state => state.ProfileReducer.isLoading);
  const [initialValues, changeInitial] = useState({
    Organization: [
      {
        Organization: '',
        Scope: '',
        Duration: '',
        Description: '',
        Position: '',
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
    fields: OrganizationField,
    append: OrganizationAppend,
    remove: OrganizationRemove,
  } = useFieldArray({control, name: 'Organization'});

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

  if (isLoading || checkOrganization === null) {
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

              <HStack space={4} alignItems="center" marginTop={2}>
                {disabled ? (
                  <Button
                    onPress={() => {
                      setCheckOrganization(' ');
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
                  <Text></Text>
                  // <UpploadResumeButtonComponent
                  //   uploadResume={() => UploadResumeButton(UploadResumeService)}
                  // />
                )}

                {/* <IconButton icon={<Icon as name="" />}></IconButton> */}
              </HStack>

              {/* End of Edit & Upload Button */}
              {/* Start of Form */}
              {checkOrganization === '' ? (
                <View>
                  <Box marginY={'3/5'}>
                    <Text>No data</Text>
                  </Box>
                </View>
              ) : (
                <View>
                  {OrganizationField.map((values, idx) => {
                    const handleDelete = () => {
                      OrganizationRemove(idx);
                    };
                    return (
                      <Box key={idx}>
                        <FormControl mt="4">
                          <FormControl.Label alignSelf="center" mb={3}>
                            {`Organization #${idx + 1}`}
                          </FormControl.Label>
                          <HStack justifyContent="space-evenly">
                            <Box w="48%">
                              <Text
                                mb={0}
                                marginLeft={2}
                                fontWeight={'light'}
                                fontSize={'xs'}>
                                Organization Name
                              </Text>
                              <Controller
                                name={`Organization[${idx}].Organization`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Organization"
                                    variant="filled"
                                    value={value}
                                    onChangeText={onChange}
                                    backgroundColor={'#f2eef3'}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Organization?.[idx]?.Organization
                                  ? errors?.Organization?.[idx]?.Organization
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
                                Scope
                              </Text>
                              <Controller
                                name={`Organization[${idx}].Scope`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Scope"
                                    variant="filled"
                                    value={value}
                                    onChangeText={onChange}
                                    backgroundColor={'#f2eef3'}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />

                              <FormControl.HelperText>
                                {errors?.Organization?.[idx]?.Scope
                                  ? errors?.Organization?.[idx]?.Scope.message
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
                                Duration in Year
                              </Text>
                              <Controller
                                name={`Organization[${idx}].Duration`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Duration"
                                    variant="filled"
                                    value={value}
                                    onChangeText={onChange}
                                    backgroundColor={'#f2eef3'}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.Organization?.[idx]?.Duration
                                  ? errors?.Organization?.[idx]?.Duration
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
                                name={`Organization[${idx}].Position`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    placeholder="Position"
                                    variant="filled"
                                    value={value}
                                    onChangeText={onChange}
                                    backgroundColor={'#f2eef3'}
                                    onBlur={onBlur}
                                    isReadOnly={disabled}
                                    fontSize={'sm'}
                                  />
                                )}
                              />
                              <FormControl.HelperText>
                                {errors?.Organization?.[idx]?.Position
                                  ? errors?.Organization?.[idx]?.Position
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
                                name={`Organization[${idx}].Description`}
                                control={control}
                                render={({
                                  field: {onChange, onBlur, value},
                                }) => (
                                  <Input
                                    multiline
                                    numberOfLines={3}
                                    placeholder="Description"
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
                                {errors?.Organization?.[idx]?.Description
                                  ? errors?.Organization?.[idx]?.Description
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
                              OrganizationAppend({
                                Organization: '',
                                Scope: '',
                                Duration: '',
                                Description: '',
                                Position: '',
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
                            disabled={OrganizationField.length >= 3}>
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

              {/* Submit Cancel Button */}

              {/* Submit Cancel Button */}
            </Center>
          </Box>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ProfileOrganizationScreen;
