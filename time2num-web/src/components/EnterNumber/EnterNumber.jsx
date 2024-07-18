import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { CheckLg } from "react-bootstrap-icons";
import styles from "./EnterNumber.module.css";

const EnterNumber = ({ onNumberSubmit }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onNumberSubmit(enteredNumber);
    }
  };

  return (
    <>
      <h4>Time has ended.</h4>
      <p>Please enter the number you remembered below.</p>
      <InputGroup style={{ width: "350px" }}>
        <Form.Control
          style={{ fontWeight: 500 }}
          type="number"
          size="lg"
          placeholder="Number"
          onChange={(e) => {
            setEnteredNumber(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <InputGroup.Text
          style={{ cursor: "pointer", backgroundColor: "#0d6efd" }}
          onClick={() => onNumberSubmit(enteredNumber)}
        >
          <CheckLg color="white" size={16} />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default EnterNumber;
