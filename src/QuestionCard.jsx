import { useState } from "react";

import {
  Box,
  Text,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Divider,
} from "@chakra-ui/react";

import { updateExcludedIds } from "./db";

const QuestionCard = ({ number, testSize, question, excludedIds }) => {
  const [isExcluded, setIsExcluded] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { id, img, question: questionText, answers } = question;
  const imageUrl = img ? `${img}.avif` : "standard.avif";

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsExcluded(checked);
    const updatedExcludedIds = checked
      ? [...excludedIds, id]
      : excludedIds.filter((excludedId) => excludedId !== id);
    await updateExcludedIds(updatedExcludedIds);
  };

  // const isCorrect = selectedAnswer === answers.isCorrect;

  return (
    <Box
      borderWidth="0.125rem"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      textAlign="start"
      // borderColor={
      //   selectedAnswer !== null
      //     ? isCorrect
      //       ? "green.400"
      //       : "red.400"
      //     : "gray.200"
      // }
      // borderStyle="solid"
    >
      <Box className="flex justify-between w-full">
        <Text fontSize="sm">
          Question {number} of {testSize}
        </Text>
        <Text fontSize="sm">Database ID: {id}</Text>
      </Box>
      <Image
        src={imageUrl}
        alt="Question Image"
        mt="5"
        mb="5"
        className="rounded-lg"
      />
      <Text mb="5">{questionText}</Text>
      <RadioGroup
        mb="5"
        value={selectedAnswer}
        isDisabled={selectedAnswer !== null}
        onChange={(value) => {
          setSelectedAnswer(value);
        }}
      >
        <Stack spacing={5}>
          {answers.map((answer, index) => (
            <Radio
              key={index}
              value={answer.text}
              // borderStyle="solid"
              // borderColor={
              //   selectedAnswer !== null && !isCorrect
              //     ? "red.400"
              //     : undefined
              // }
            >
              <p className="select-text">{answer.text}</p>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Divider />
      <Checkbox
        isChecked={isExcluded}
        onChange={handleCheckboxChange}
        mt="5"
        alignSelf="end"
      >
        Exclude this question from future tests
      </Checkbox>
    </Box>
  );
};

export default QuestionCard;
