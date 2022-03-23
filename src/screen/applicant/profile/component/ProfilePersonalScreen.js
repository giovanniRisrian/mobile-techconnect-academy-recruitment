import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
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
  Text,
  ScrollView,
} from "native-base";
import * as Yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  Personal: Yup.object().shape({
    Name: Yup.string().required("This field is required"),
    // Gender: Yup.string().required("This field is required"),
    // BirthDate: Yup.date().required("This field is required"),
    Domicile: Yup.string().required("This field is required"),
    Email: Yup.string()
      .required("This field is required")
      .email("Invalid format email"),
    TelephoneNo: Yup.string().required("This field is required"),
  }),
  SkillSet: Yup.array().of(
    Yup.object().shape({
      Skill: Yup.string().required("This field is required"),
    })
  ),
});

const ProfilePersonalScreen = ({ bloc }) => {
  const [disabled, changeDisable] = useState(true);
  const [initialValues, changeInitial] = useState({
    Personal: {
      Name: "",
      Gender: "",
      BirthDate: "",
      Domicile: "",
      Email: "",
      TelephoneNo: "",
      TotalWorkingExperience: "",
      SalaryExpectation: "",
    },
    SkillSet: [
      {
        Skill: "",
      },
    ],
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: SkillSetField,
    append: SkillSetAppend,
    remove: SkillSetRemove,
  } = useFieldArray({ control, name: "SkillSet" });

  const onSubmit = (data) => {
    // function to submit
    console.log("Ini muncul ga", data);
    changeDisable(!disabled);
  };

  useEffect(() => {
    // getDataByID(userInfo.id, data, changeInitial);
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
              source={require("../../../../assets/images/avatar.png")}
            ></Avatar>

            {/* End of Avatar */}
            {/* Start of Edit & Upload Button */}

            <HStack space={4} alignItems="center" marginTop={2}>
              {disabled ? (
                <Button
                  onPress={() => changeDisable(!disabled)}
                  variant="subtle"
                  colorScheme="primary"
                  size="xs"
                >
                  Edit Profile
                </Button>
              ) : null}

              <Button
                onPress={() => console.log("Upload CV")}
                variant="subtle"
                colorScheme="primary"
                size="xs"
              >
                Upload CV
              </Button>
              {/* <IconButton icon={<Icon as name="" />}></IconButton> */}
            </HStack>

            {/* End of Edit & Upload Button */}
            {/* Start of Form */}

            <FormControl mt="5">
              <HStack justifyContent="space-evenly">
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Name
                  </FormControl.Label>
                  <Controller
                    name="Personal.Name"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        placeholder="Name"
                        variant="underlined"
                        error={Boolean(errors.Personal?.Name)}
                        isReadOnly={disabled}
                      />
                    )}
                  />
                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.Name
                        ? errors.Personal?.Name.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Email
                  </FormControl.Label>
                  <Controller
                    name="Personal.Email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Email"
                        variant="underlined"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors.Personal?.Email)}
                        isReadOnly={disabled}
                      />
                    )}
                  />
                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.Email
                        ? errors.Personal?.Email.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
              </HStack>
              <HStack justifyContent="space-evenly" mt={2}>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Phone Number
                  </FormControl.Label>
                  <Controller
                    name="Personal.TelephoneNo"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Phone Number"
                        variant="underlined"
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        error={Boolean(errors.Personal?.TelephoneNo)}
                        isReadOnly={disabled}
                      />
                    )}
                  />

                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.TelephoneNo
                        ? errors.Personal?.TelephoneNo.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={1}>
                    Gender
                  </FormControl.Label>
                  <Controller
                    name="Personal.Gender"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Radio.Group
                        name="myRadioGroup"
                        accessibilityLabel="favorite number"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        isReadOnly={disabled}
                        //   error={Boolean(errors.Personal?.Gender)}
                      >
                        <Stack
                          direction={{
                            base: "row",
                            md: "row",
                          }}
                          alignItems="center"
                          justifyContent="center"
                          space={4}
                          w="100%"
                        >
                          <Radio value="male" size="sm" my={1}>
                            Male
                          </Radio>
                          <Radio value="female" size="sm" my={1}>
                            Female
                          </Radio>
                        </Stack>
                      </Radio.Group>
                    )}
                  />
                </Box>
              </HStack>
              <HStack justifyContent="space-evenly" mt={2}>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Birth Date
                  </FormControl.Label>
                  <Controller
                    name=""
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        isReadOnly={disabled}
                      />
                    )}
                  />
                  <Input placeholder="Birth Date" variant="underlined" />
                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {/* {errors.Personal?.Name ? errors.Personal?.Name.message : ""} */}
                    </Text>
                  </FormControl.HelperText>
                </Box>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Domicile
                  </FormControl.Label>
                  <Controller
                    name="Personal.Domicile"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Domicile"
                        variant="underlined"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.Personal?.Domicile)}
                        isReadOnly={disabled}
                      />
                    )}
                  />
                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.Domicile
                        ? errors.Personal?.Domicile.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
              </HStack>
              <HStack justifyContent="space-evenly" mt={2}>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Working Experience
                  </FormControl.Label>
                  <Controller
                    name="Personal.TotalWorkingExperience"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Working Experience"
                        variant="underlined"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.Personal?.TotalWorkingExperience)}
                        isReadOnly={disabled}
                      />
                    )}
                  />
                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.TotalWorkingExperience
                        ? errors.Personal?.TotalWorkingExperience.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
                <Box w="48%">
                  <FormControl.Label alignSelf="center" mb={0}>
                    Salary Expectation
                  </FormControl.Label>
                  <Controller
                    name="Personal.SalaryExpectation"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                        placeholder="Salary Expectation"
                        variant="underlined"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={Boolean(errors.Personal?.SalaryExpectation)}
                        isReadOnly={disabled}
                      />
                    )}
                  ></Controller>

                  <FormControl.HelperText mt={0}>
                    <Text fontSize={"2xs"}>
                      {errors.Personal?.SalaryExpectation
                        ? errors.Personal?.SalaryExpectation.message
                        : ""}
                    </Text>
                  </FormControl.HelperText>
                </Box>
              </HStack>
              <Box w="100%">
                <FormControl.Label alignSelf="center" mb={0}>
                  Skill Set
                </FormControl.Label>
                <HStack
                  justifyContent="flex-start"
                  mt={2}
                  marginLeft={3}
                  space="2"
                  flexWrap="wrap"
                >
                  {SkillSetField.map((SkillSet, index) => {
                    const handleDelete = () => {
                      // func logic delete confrimation
                      SkillSetRemove(index);
                    };
                    return (
                      <Box key={index} minWidth="30%">
                        <Controller
                          name={`SkillSet[${index}].Skill`}
                          control={control}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              placeholder="Skill"
                              variant="underlined"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              error={Boolean(errors.Personal?.SkillSet)}
                              isReadOnly={disabled}
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
                                size="xs"
                              >
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
                  <Text fontSize={"2xs"}>
                    {errors.SkillSet?.Name
                      ? errors.Personal?.SkillSet.message
                      : ""}
                  </Text>
                </FormControl.HelperText>
                {disabled ? (
                  <Box />
                ) : (
                  <HStack
                    space={4}
                    alignItems="center"
                    justifyContent="center"
                    marginTop={1}
                  >
                    <Box width={"50%"}>
                      <Button
                        onPress={() => SkillSetAppend({ Skill: "" })}
                        variant="subtle"
                        colorScheme="primary"
                        size="xs"
                        disabled={SkillSetField.length >= 9}
                      >
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
                  <Box width={"50%"}>
                    <Button
                      onPress={() => changeDisable(!disabled)}
                      variant="subtle"
                      size="xs"
                      colorScheme="red"
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box width={"50%"}>
                    <Button
                      onPress={handleSubmit(onSubmit)}
                      variant="subtle"
                      size="xs"
                      colorScheme="blue"
                    >
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
};

export default ProfilePersonalScreen;
