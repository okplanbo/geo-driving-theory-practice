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

const QuestionCard = ({
  number,
  testSize,
  question,
  excludedIds,
  updateExcluded,
}) => {
  const [isExcluded, setIsExcluded] = useState(
    excludedIds.includes(question.id),
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const { id, img, question: questionText, answers } = question;

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsExcluded(checked);
    const newExcludedIds = checked
      ? [...excludedIds, id]
      : excludedIds.filter((excludedId) => excludedId !== id);
    updateExcluded(newExcludedIds);
  };

  const correctAnswerText = answers.filter((answer) => answer.correct)[0].text;
  const isCorrect = selectedAnswer === correctAnswerText;

  return (
    <Box
      className="border-x-0 border-y-2 pt-2 md:rounded-lg md:border-2 md:p-6"
      overflow="hidden"
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
      <Box className="mb-5 flex w-full justify-between">
        <Text fontSize="sm" visibility={"hidden"}>
          Question {number} of {testSize}
        </Text>
        <Text fontSize="sm">Database ID: {id}</Text>
      </Box>
      {img ? (
        <Image
          src={`${img}.avif`}
          alt="Question Image"
          mb="5"
          className="rounded-lg"
        />
      ) : (
        <Divider className="mb-5" />
      )}
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
                {answer.text}{" "}
                {answer.correct && selectedAnswer !== null ? "✓" : ""}
              </p>
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
      <Divider />
      <Box className="flex h-12 w-full flex-row items-center justify-between">
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
