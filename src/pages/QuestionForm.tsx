import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, ToggleButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuestionDispatch } from "../FormContext.tsx";

const questions = [
  "Is the observation domestic?",
  "Do you want to share with the community?",
  "Do you need identification help?",
];

const QuestionForm = () => {
  const [answers, setAnswers] = useState<boolean[]>([true, true, true]);
  const navigate = useNavigate();
  const dispatch = useQuestionDispatch();

  console.log("Answers:", answers);

  const handleToggle = (index: number, value: boolean) => {
    const updated: boolean[] = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({
      payload: {
        domestic: answers[0],
        public: answers[1],
        identification: answers[2],
      },
    });

    navigate("/add");
  };

  return (
    <div>
      <h2 className="mb-4">Add observation</h2>
      <Form onSubmit={onSubmit}>
        {questions.map((question, index) => (
          <Form.Group as={Row} className="mb-4" key={index}>
            <Form.Label column sm={8}>
              {question}
            </Form.Label>
            <Col sm={4}>
              <ButtonGroup>
                <ToggleButton
                  id={`yes-${index}`}
                  type="radio"
                  variant={
                    answers[index] === true ? "success" : "outline-success"
                  }
                  name={`question-${index}`}
                  value="yes"
                  checked={answers[index] === true}
                  onChange={() => handleToggle(index, true)}
                >
                  Yes
                </ToggleButton>
                <ToggleButton
                  id={`no-${index}`}
                  type="radio"
                  variant={
                    answers[index] === false ? "danger" : "outline-danger"
                  }
                  name={`question-${index}`}
                  value="no"
                  checked={answers[index] === false}
                  onChange={() => handleToggle(index, false)}
                >
                  No
                </ToggleButton>
              </ButtonGroup>
            </Col>
          </Form.Group>
        ))}
        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default QuestionForm;
