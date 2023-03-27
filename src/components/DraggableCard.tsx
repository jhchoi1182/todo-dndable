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
      {(provided) => (
        <Card ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {todo}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableCard);

const Card = styled.li`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
