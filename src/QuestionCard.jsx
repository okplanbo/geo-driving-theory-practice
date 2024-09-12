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

  const { id, img, question: questionText, answers } = question;
  const imageUrl = img ? `${img}.avif` : "standard.avif";

  const handleCheckboxChange = async (e) => {
    const checked = e.target.checked;
    setIsExcluded(checked);
    const updatedExcludedIds = checked ? [...excludedIds, id] : excludedIds.filter(excludedId => excludedId !== id);
    await updateExcludedIds(updatedExcludedIds);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="md"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      textAlign="start"
    >
      <Box className="flex justify-between w-full">
        <Text fontSize="sm">
          Question {number} of {testSize}
        </Text>
        <Text fontSize="sm">Database ID: {id}</Text>
      </Box>
      <Image src={imageUrl} alt="Question Image" mt="5" mb="5" />
      <Text mb="5">{questionText}</Text>
      <RadioGroup mb="5">
        <Stack spacing={5}>
          {answers.map((answer, index) => (
            <Radio key={index} value={answer.text}>
              {answer.text}
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
