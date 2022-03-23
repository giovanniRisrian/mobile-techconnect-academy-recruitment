import {
  Pressable,
  Box,
  HStack,
  Badge,
  Flex,
  Spacer,
  Text,
  Image,
} from "native-base";
import React from "react";

const CardCategories = ({ title, icons }) => {
  return (
    <Pressable>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Box
            marginRight={5}
            marginBottom={10}
            maxW="96"
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
            p="5"
            rounded="8"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            {title === "Program" ? (
              <Image
                source={require("../../assets/icons/program.png")}
                alt="icon-categories"
                width="50px"
                height="50px"
              />
            ) : (
              <></>
            )}
            {title === "Training" ? (
              <Image
                source={require("../../assets/icons/training.png")}
                alt="icon-categories"
                width="50px"
                height="50px"
              />
            ) : (
              <></>
            )}
            {title === "Certification" ? (
              <Image
                source={require("../../assets/icons/certification.png")}
                alt="icon-categories"
                width="50px"
                height="50px"
                marginLeft='4'
              />
            ) : (
              <></>
            )}

            <Flex>
              {isFocused ? (
                <Text
                  mt="2"
                  fontSize={14}
                  fontWeight="medium"
                  textDecorationLine="underline"
                  alignSelf="flex-start"
                >
                  {title}
                </Text>
              ) : (
                <Text mt="2" fontSize={14} fontWeight="medium">
                  {title}
                </Text>
              )}
            </Flex>
          </Box>
        );
      }}
    </Pressable>
  );
};

export default CardCategories;
