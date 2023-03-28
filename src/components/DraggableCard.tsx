import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  todo: string;
  index: number;
}

const DraggableCard = ({ todo, index }: IDraggableCardProps) => {
  console.log(todo);

  return (
    <Draggable draggableId={todo} index={index}>
      {(provided, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.li<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? "#e4f2ff" : props.theme.cardColor)};
  box-shadow: ${(props) => (props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none")};
`;
