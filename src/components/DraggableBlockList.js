import { Card, Button } from "react-bootstrap";

const DraggableBlockList = ({
  name,
  id,
  index,
  moveItemUp,
  moveItemDown,
  heroes,
}) => {
  return (
    <Card className="app-card m-3 p-2 d-flex flex-row justify-content-center align-items-center ">
      <Card.Title className="mb-0 d-flex flex-row justify-content-center align-items-center">
        {name}
      </Card.Title>
      <div className="wrap-btn d-flex flex-column">
        <Button
          className="mb-1 btn-up"
          variant="primary"
          size="sm"
          onClick={() => moveItemUp(id)}
          disabled={index === 0}
        >
          Move Up
        </Button>{" "}
        <Button
          className="btn-down"
          variant="primary"
          size="sm"
          onClick={() => moveItemDown(id)}
          disabled={index === heroes.length - 1}
        >
          Move Down
        </Button>
      </div>
    </Card>
  );
};

export default DraggableBlockList;
