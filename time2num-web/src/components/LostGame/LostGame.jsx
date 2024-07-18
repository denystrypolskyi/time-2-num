import { Button } from "react-bootstrap";

const LostGame = ({ levelReached, resetGame }) => (
  <>
    <h4>Oops! Looks like you lost.</h4>
    <p>You were on Level {levelReached}, but don't worry, you can try again!</p>
    <Button
      style={{ fontWeight: 500 }}
      variant="primary"
      size="md"
      onClick={resetGame}
    >
      Try Again
    </Button>
  </>
);

export default LostGame;
