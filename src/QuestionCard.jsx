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

  const correctAnswerText = answers.filter((answer) => answer.correct)[0].text;
  const isCorrect = selectedAnswer === correctAnswerText;

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
      borderColor={
        selectedAnswer !== null
          ? isCorrect
            ? "green.400"
            : "red.400"
          : "gray.200"
      }
      borderStyle="solid"
    >
      <Box className="flex justify-between w-full">
        <Text fontSize="sm" visibility={"hidden"}>
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
            <Radio key={index} value={answer.text}>
              <p className="select-text">
                {answer.text} {answer.correct && selectedAnswer !== null ? "✓" : ""}
              </p>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Divider />
      <Box className="flex flex-row w-full justify-between items-center h-12">
        {selectedAnswer !== null ? (
          <Text color={isCorrect ? "green.400" : "red.400"}>
            {isCorrect ? "Correct!" : "Wrong!"}
          </Text>
        ) : null}
        <Checkbox
          isChecked={isExcluded}
          onChange={handleCheckboxChange}
          marginLeft="auto"
        >
          Exclude this question
        </Checkbox>
      </Box>
    </Box>
  );
};

export default QuestionCard;
