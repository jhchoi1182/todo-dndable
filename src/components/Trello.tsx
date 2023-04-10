import React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import Board from "./Board";
import { useForm } from "react-hook-form";

interface IForm {
  category: string;
}

const Trello = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const addCategory = ({ category }: IForm) => {
    setTodos((prev) => {
      return { [category]: [], ...prev };
    });
    setValue("category", "");
  };

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
        <form onSubmit={handleSubmit(addCategory)}>
          <AddBoardInput
            {...register("category", { required: true })}
            type="text"
            placeholder="추가할 카테고리를 입력해주세요."
          />
        </form>
        <BoardContainer>
          <Boards>
            {Object.keys(todos).map((boardId) => (
              <Board boardId={boardId} key={boardId} todos={todos[boardId]} />
            ))}
          </Boards>
        </BoardContainer>
      </Wrapper>
    </DragDropContext>
  );
};

export default Trello;

const Wrapper = styled.div`
  display: block;
  width: 85vw;
  height: 100vh;
  margin: 0 auto;
  padding-top: 5%;
`;

const AddBoardInput = styled.input`
  display: block;
  margin: 0 auto 30px;
  width: 230px;
`;

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
`;
