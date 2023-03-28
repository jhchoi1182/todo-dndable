import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardPros {
  todos: string[];
  boardId: string;
}

const Board = ({ todos, boardId }: IBoardPros) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.map((todo, i) => (
              <DraggableCard key={todo} todo={todo} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
