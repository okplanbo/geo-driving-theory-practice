import {
  Box,
  Text,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  Divider
} from "@chakra-ui/react";

const QuestionCard = ({ number, testSize, question }) => {
  const { id, img, question: questionText, answers } = question;
  const imageUrl = img ? `${img}.avif` : "standard.avif";

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
        <Text fontSize="sm" fontWeight="bold">
          Database ID: {id}
        </Text>
      </Box>
      <Image src={imageUrl} alt="Question Image" mt="5" mb="5" />
      <Text mb="5">
        {questionText}
      </Text>
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
      <Checkbox mt="5" alignSelf="end">Exclude this question from future tests</Checkbox>
    </Box>
  );
};

export default QuestionCard;
