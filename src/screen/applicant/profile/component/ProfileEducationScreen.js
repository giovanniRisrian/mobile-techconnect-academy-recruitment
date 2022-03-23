import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
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
} from 'native-base';
import * as Yup from 'yup';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import jwt_decode from 'jwt-decode';
import {useSelector} from 'react-redux';
import UpploadResumeButtonComponent from '../../../../component/uploadButton/UploadResumeButtonComponent';
import UploadResumeButton from '../../../../component/uploadButton/UploadResumeButton';
import UploadResumeService from '../../../../service/UploadFileService';

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
  const {addProfile, getDataByID} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
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

  return (
    <SafeAreaView>
      <ScrollView>
        <Box marginTop={5}>
          {/* Start of Avatar */}
          <Center>
            <Avatar
              bg="grey.900"
              alignSelf="center"
              size="2xl"
              source={require('../../../../assets/images/avatar.png')}></Avatar>

            {/* End of Avatar */}
            {/* Start of Edit & Upload Button */}

            <HStack space={4} alignItems="center" marginTop={2}>
              {disabled ? (
                <Button
                  onPress={() => changeDisable(!disabled)}
                  variant="subtle"
                  colorScheme="primary"
                  size="xs">
                  Edit Profile
                </Button>
              ) : (
                <UpploadResumeButtonComponent
                  uploadResume={() => UploadResumeButton(UploadResumeService)}
                />
              )}

              {/* <IconButton icon={<Icon as name="" />}></IconButton> */}
            </HStack>

            {/* End of Edit & Upload Button */}
            {/* Start of Form */}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Title
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].Title`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Title"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Institution
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].Institution`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Institution"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />

                        <FormControl.HelperText>
                          {errors?.Education?.[idx]?.Institution
                            ? errors?.Education?.[idx]?.Institution.message
                            : ''}
                        </FormControl.HelperText>
                      </Box>
                    </HStack>
                    <HStack justifyContent="space-evenly" mt={3}>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Year In
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].YearIn`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Year In"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Year Out
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].YearOut`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Year Out"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Major
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].Major`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Major"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          GPA
                        </FormControl.Label>
                        <Controller
                          name={`Education[${idx}].GPA`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="GPA"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
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
                    disabled={EducationField.length >= 3}>
                    Add
                  </Button>
                </Box>
              </HStack>
            )}
            {/* Submit Cancel Button */}
            {disabled ? (
              <Box />
            ) : (
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
            )}
            {/* Submit Cancel Button */}
          </Center>
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileEducationScreen;
