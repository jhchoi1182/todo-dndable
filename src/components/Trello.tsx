import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import Board from "./Board";

const Trello = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    if (source.droppableId === destination?.droppableId) {
      setTodos((prev) => {
        const sourceTodos = [...prev[source.droppableId]];
        const selectedTodo = sourceTodos[source.index];
        sourceTodos.splice(source.index, 1);
        sourceTodos.splice(destination?.index, 0, selectedTodo);
        return {
          ...prev,
          [source.droppableId]: sourceTodos,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setTodos((prev) => {
        const sourceTodos = [...prev[source.droppableId]];
        const selectedTodo = sourceTodos[source.index];
        const destinationTodos = [...prev[destination.droppableId]];
        sourceTodos.splice(source.index, 1);
        destinationTodos.splice(destination.index, 0, selectedTodo);
        return {
          ...prev,
          [source.droppableId]: sourceTodos,
          [destination.droppableId]: destinationTodos,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default Trello;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
