import { PhotoCamera } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { isEmpty, map, startCase } from "lodash";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function renderInput(currentQuestion, userData, updateUserData) {
  const { id, options, questionName, questionType } = currentQuestion;

  if (questionType === "radio") {
    return (
      <FormControl>
        <RadioGroup onChange={(e) => updateUserData(e.target.value)}>
          {map(options, (option, i) => (
            <FormControlLabel
              key={i}
              value={option}
              control={<Radio />}
              label={startCase(option)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  if (questionType === "text") {
    return (
      <TextField
        value={userData[id]}
        onChange={(e) => updateUserData(e.target.value)}
        label={startCase(questionName)}
        variant="outlined"
      />
    );
  }

  if (questionType === "textarea") {
    return (
      <TextField
        multiline
        value={userData[id]}
        onChange={(e) => updateUserData(e.target.value)}
        label={startCase(questionName)}
        variant="outlined"
      />
    );
  }

  if (questionType === "number") {
    return (
      <TextField
        value={userData[id]}
        onChange={(e) => updateUserData(e.target.value)}
        label={startCase(questionName)}
        variant="outlined"
      />
    );
  }

  if (questionType === "checkbox") {
    return (
      <FormGroup>
        {map(options, (option, i) => (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                onChange={(e) => {
                  const newOptions = {
                    ...userData[id],
                    [option]: e.target.checked,
                  };

                  updateUserData(newOptions);
                }}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    );
  }

  if (questionType === "date") {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            onAccept={(e) => {
              const year = e.$y;
              const month = `${parseInt(e.$M) + 1}`.padStart(2, "0");
              const day = `${e.$D}`.padStart(2, "0");
              updateUserData(`${year}-${month}-${day}`);
            }}
            label={startCase(questionName)}
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  }

  if (questionType === "file") {
    return (
      <Button
        startIcon={<PhotoCamera />}
        variant="contained"
        color="fitFeedBlue"
        component="label"
      >
        Upload File
        <input onChange={handleFileUpload} type="file" hidden />
      </Button>
    );
  }

  return `TODO: Implement questionType ${questionType}`;
}

export function Question({ props }) {
  const { questions, questionIndex, userData, setUserData } = props;

  if (isEmpty(questions)) {
    return "No questions provided";
  }

  const currentQuestion = questions[questionIndex];

  function updateUserData(newValue) {
    setUserData({ ...userData, [currentQuestion.id]: newValue });
  }

  return (
    <>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ padding: "15px" }}
        gutterBottom
      >
        {currentQuestion.question}
      </Typography>
      {renderInput(currentQuestion, userData, updateUserData)}
    </>
  );
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  // TODO send formData to backend - need to use formData instead of JSON
}
