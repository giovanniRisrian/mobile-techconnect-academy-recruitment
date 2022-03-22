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
} from "native-base";
import * as Yup from "yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

const validationSchema = Yup.object().shape({
  Education: Yup.array().of(
    Yup.object().shape({
      Title: Yup.string().required("This field is required"),
      Institution: Yup.string().required("This field is required"),
      Major: Yup.string().required("This field is required"),
      YearIn: Yup.string()
        .required("This field is required")
        .min(4, "Year in must be 4 character")
        .max(4, "Year in must be 4 character"),
      YearOut: Yup.string()
        .required("This field is required")
        .min(4, "Year out must be 4 character")
        .max(4, "Year in must be 4 character"),
      GPA: Yup.string().required("This field is required"),
    })
  ),
});

const ProfileEducationScreen = ({ bloc }) => {
  const [disabled, changeDisable] = useState(false);
  const [initialValues, setInitial] = useState({
    Education: [
      {
        Title: "",
        Institution: "",
        Major: "",
        YearIn: "",
        YearOut: "",
        GPA: "",
      },
    ],
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
    defaultValues: initialValues,
  });

  const {
    fields: EducationField,
    append: EducationAppend,
    remove: EducationRemove,
  } = useFieldArray({ control, name: "Education" });

  const onSubmit = (values) => {
    // function to submit
    console.log("HEI INI MUNCUL GA", values);
    // changeDisable(!disabled);
  };

  useEffect(() => {
    //
  }, []);

  return (
    <SafeAreaView>
      <Box marginTop={5}>
        {/* Start of Avatar */}
        <Center>
          <Avatar
            bg="pink.600"
            alignSelf="center"
            size="2xl"
            source={require("../../../assets/images/avatar.png")}
          ></Avatar>

          {/* End of Avatar */}
          {/* Start of Edit & Upload Button */}

          <HStack space={4} alignItems="center" marginTop={2}>
            <Button
              onPress={() => console.log("Edit Profile")}
              variant="subtle"
              colorScheme="secondary"
              size="xs"
            >
              Edit Profile
            </Button>
            <Button
              onPress={() => console.log("Upload CV")}
              variant="subtle"
              colorScheme="secondary"
              size="xs"
            >
              Upload CV
            </Button>
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
                <FormControl mt="5">
                  <HStack justifyContent="space-evenly">
                    <Box w="48%">
                      <FormControl.Label alignSelf="center" mb={0}>
                        Title
                      </FormControl.Label>
                      <Controller
                        name={`Education[${idx}].Title`}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Title"
                            variant="underlined"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />

                      <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Title
                          ? errors?.Education?.[idx]?.Title.message
                          : ""}
                      </FormControl.HelperText>
                    </Box>
                    <Box w="48%">
                      <FormControl.Label alignSelf="center" mb={0}>
                        Institution
                      </FormControl.Label>
                      <Controller
                        name={`Education[${idx}].Institution`}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Institution"
                            variant="underlined"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />

                      <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Institution
                          ? errors?.Education?.[idx]?.Institution.message
                          : ""}
                      </FormControl.HelperText>
                    </Box>
                  </HStack>
                  <HStack justifyContent="space-evenly" mt={3}>
                    <Box w="48%">
                      <FormControl.Label alignSelf="center" mb={0}>
                        Year In
                      </FormControl.Label>
                      <Input placeholder="Year In" variant="underlined" />
                      <FormControl.HelperText>
                        {/* Error */}
                      </FormControl.HelperText>
                    </Box>
                    <Box w="48%">
                      <FormControl.Label alignSelf="center" mb={0}>
                        Year Out
                      </FormControl.Label>
                      <Input placeholder="Year Out" variant="underlined" />
                      <FormControl.HelperText>
                        {/* Error */}
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
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="Major"
                            variant="underlined"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />
                      <FormControl.HelperText>
                        {errors?.Education?.[idx]?.Major
                          ? errors?.Education?.[idx]?.Major.message
                          : ""}
                      </FormControl.HelperText>
                    </Box>
                    <Box w="48%">
                      <FormControl.Label alignSelf="center" mb={0}>
                        GPA
                      </FormControl.Label>
                      <Controller
                        name={`Education[${idx}].GPA`}
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder="GPA"
                            variant="underlined"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        )}
                      />

                      <FormControl.HelperText>
                        {errors?.Education?.[idx]?.GPA
                          ? errors?.Education?.[idx]?.GPA.message
                          : ""}
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
                          colorScheme="secondary"
                          size="xs"
                        >
                          X
                        </Button>
                      )}
                    </Box>
                  )}

                  {/* <HStack
                    space={4}
                    alignItems="center"
                    justifyContent="center"
                    marginTop={2}
                  >
                    <IconButton icon={<Icon as name="" />}></IconButton>
                  </HStack> */}
                </FormControl>
                {/* End of Form */}
              </Box>
            );
          })}

          {disabled ? (
            <Box />
          ) : (
            <Button
              onPress={() =>
                EducationAppend({
                  Title: "",
                  Institution: "",
                  Major: "",
                  YearIn: "",
                  YearOut: "",
                  GPA: "",
                })
              }
              variant="subtle"
              colorScheme="secondary"
              size="xs"
              disabled={EducationField.length >= 3}
            >
              Add
            </Button>
          )}
          {/* Submit Button */}
          <Button
            onPress={handleSubmit(onSubmit)}
            mt={2}
            variant="subtle"
            colorScheme="secondary"
            size="xs"
          >
            Submit
          </Button>
          {/* Submit Button */}
        </Center>
      </Box>
    </SafeAreaView>
  );
};

export default ProfileEducationScreen;
