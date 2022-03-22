import {
  Pressable,
  Box,
  Flex,
  Text,
} from "native-base";
import React, { useState } from "react";
import { goToScreenWithParams } from "../navigation/NavigationHelper";
import { VACANCY_DETAIL_PATH } from "../navigation/NavigationPath";

const CardVacancy = ({ program, getId }) => {
  const detailProgram = () => {
    getId(program.ID)
    goToScreenWithParams(VACANCY_DETAIL_PATH, program.ID, false)
  }

  return (
    <>
      <Pressable onPress={detailProgram}>
        {({ isHovered, isFocused, isPressed }) => {
          return (
            <Box
              borderWidth="1"
              borderColor="coolGray.300"
              shadow="3"
              bg={
                isPressed
                  ? "coolGray.200"
                  : isHovered
                  ? "coolGray.200"
                  : "coolGray.100"
              }
              p="6"
              rounded="8"
              style={{
                transform: [
                  {
                    scale: isPressed ? 0.96 : 1,
                  },
                ],
                marginVertical: 10,
                marginHorizontal: 9,
              }}
            >
              <Flex>
                <Text
                  mt="2"
                  fontSize={20}
                  fontWeight="medium"
                  alignSelf="flex-start"
                >
                  {program?.ProgramName}
                </Text>
                <Text
                  mt="2"
                  fontSize={14}
                  fontWeight="medium"
                  alignSelf="flex-start"
                >

                  {program?.ProgramLocation?.Address}
                </Text>
              </Flex>
            </Box>
          );
        }}
      </Pressable>
    </>
  );
};

export default CardVacancy;
