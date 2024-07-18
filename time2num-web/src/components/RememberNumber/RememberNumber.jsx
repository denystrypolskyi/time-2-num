import { ProgressBar } from "react-bootstrap";
import styles from "./RememberNumber.module.css";

const RememberNumber = ({ targetNumber, remainingTimerSeconds }) => (
  <>
    <h4>{targetNumber}</h4>
    <p className="mb-3">You have limited time to memorize the number.</p>
    <ProgressBar
      now={remainingTimerSeconds * 10}
      className={styles.progressBar}
    />
  </>
);

export default RememberNumber;
