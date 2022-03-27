/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
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
import LinkedInButton from '../../../../component/linkedInButton/linkedInComponent';

// const validationSchema = Yup.object().shape({
//   Education: Yup.array().of(
//     Yup.object().shape({
//       Title: Yup.string().required("This field is required"),
//       Institution: Yup.string().required("This field is required"),
//       Major: Yup.string().required("This field is required"),
//       YearIn: Yup.string()
//         .required("This field is required")
//         .min(4, "Year in must be 4 character")
//         .max(4, "Year in must be 4 character"),
//       YearOut: Yup.string()
//         .required("This field is required")
//         .min(4, "Year out must be 4 character")
//         .max(4, "Year in must be 4 character"),
//       GPA: Yup.string().required("This field is required"),
//     })
//   ),
// });

const ProfileWorkExperienceScreen = ({bloc}) => {
  const {addProfile, getDataByID} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
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
    // resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: WorkExperienceField,
    append: WorkExperienceAppend,
    remove: WorkExperienceRemove,
  } = useFieldArray({control, name: 'WorkExperience'});

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
                <View>
                  <LinkedInButton />
                  {/*<UpploadResumeButtonComponent
                    uploadResume={() => UploadResumeButton(UploadResumeService)}
              />*/}
                </View>
              )}
              {/* <IconButton icon={<Icon as name="" />}></IconButton> */}
            </HStack>

            {/* End of Edit & Upload Button */}
            {/* Start of Form */}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Company Name
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].CompanyName`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Company Name"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />

                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Title
                          ? errors?.Education?.[idx]?.Title.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Position
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].Position`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Position"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />

                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Institution
                          ? errors?.Education?.[idx]?.Institution.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                    </HStack>

                    <HStack justifyContent="space-evenly" mt={3}>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Level
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].Level`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Level"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />
                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Major
                          ? errors?.Education?.[idx]?.Major.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Industry
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].Industry`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Industry"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />
                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.GPA
                          ? errors?.Education?.[idx]?.GPA.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                    </HStack>

                    <HStack justifyContent="space-evenly" mt={3}>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Start Date
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].YearIn`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Start Date"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />
                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Major
                          ? errors?.Education?.[idx]?.Major.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                      <Box w="48%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          End Date
                        </FormControl.Label>
                        <Controller
                          name={`WorkExperience[${idx}].YearOut`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="End Date"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />
                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.GPA
                          ? errors?.Education?.[idx]?.GPA.message
                          : ""}
                      </FormControl.HelperText> */}
                      </Box>
                    </HStack>

                    <HStack justifyContent="space-evenly" mt={3}>
                      <Box w="96%">
                        <FormControl.Label alignSelf="center" mb={0}>
                          Description
                        </FormControl.Label>
                        <Controller
                          name={`Organization[${idx}].Description`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              multiline
                              numberOfLines={3}
                              placeholder="Description"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              isReadOnly={disabled}
                            />
                          )}
                        />
                        {/* <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Major
                          ? errors?.Education?.[idx]?.Major.message
                          : ""}
                      </FormControl.HelperText> */}
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

export default ProfileWorkExperienceScreen;
