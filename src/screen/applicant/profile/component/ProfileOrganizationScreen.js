/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, TextInput} from 'react-native';
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

const ProfileOrganizationScreen = ({bloc}) => {
  const {addProfile, getDataByID} = bloc();
  const [file, setFile] = useState(false);
  const userInfo = useSelector(
    state => state.TechconnectAcademyReducer.isLogin,
  );
  const [disabled, changeDisable] = useState(true);
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
    // resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: OrganizationField,
    append: OrganizationAppend,
    remove: OrganizationRemove,
  } = useFieldArray({control, name: 'Organization'});

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
              source={require('../../../../assets/images/avatar.png')}
            />

            {/* End of Avatar */}
            {/* Start of Edit & Upload Button */}

            <HStack space={2} alignItems="center" marginTop={2}>
              {disabled ? (
                <Button
                  mt={3}
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
                        <FormControl.Label alignSelf="center" mb={0}>
                          Organization Name
                        </FormControl.Label>
                        <Controller
                          name={`Organization[${idx}].Organization`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Organization"
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
                          Scope
                        </FormControl.Label>
                        <Controller
                          name={`Organization[${idx}].Scope`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Scope"
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
                          Duration in Year
                        </FormControl.Label>
                        <Controller
                          name={`Organization[${idx}].Duration`}
                          control={control}
                          render={({field: {onChange, onBlur, value}}) => (
                            <Input
                              placeholder="Duration"
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
                          Position
                        </FormControl.Label>
                        <Controller
                          name={`Organization[${idx}].Position`}
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
                    disabled={OrganizationField.length >= 3}>
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

const styles = StyleSheet.create({
  buttonInsertLinkedIn: {
    alignItems: 'flex-start',
    height: 30,
    width: 30,
    margin: 2,
    padding: 2,
    borderRadius: 2,
  },
});

export default ProfileOrganizationScreen;
