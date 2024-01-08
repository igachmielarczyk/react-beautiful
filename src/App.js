import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import StrictModeDroppable from "./components/StrictModeDroppable";
import { data } from "./data";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import DraggableBlockList from "./components/DraggableBlockList";

function App() {
  const [heroes, setHeroes] = useState(
    data.map((hero) => ({ ...hero, id: hero.id.toString() }))
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedHeroes = Array.from(heroes);
    const [reorderedHero] = reorderedHeroes.splice(result.source.index, 1);
    reorderedHeroes.splice(result.destination.index, 0, reorderedHero);

    setHeroes(reorderedHeroes);
  };

  const moveItemUp = (id) => {
    const currentIndex = heroes.findIndex((hero) => hero.id === id);
    if (currentIndex > 0) {
      const newHeroes = [...heroes];
      const temp = newHeroes[currentIndex];
      newHeroes[currentIndex] = newHeroes[currentIndex - 1];
      newHeroes[currentIndex - 1] = temp;
      setHeroes(newHeroes);
    }
  };

  const moveItemDown = (id) => {
    const currentIndex = heroes.findIndex((hero) => hero.id === id);
    if (currentIndex < heroes.length - 1) {
      const newHeroes = [...heroes];
      const temp = newHeroes[currentIndex];
      newHeroes[currentIndex] = newHeroes[currentIndex + 1];
      newHeroes[currentIndex + 1] = temp;
      setHeroes(newHeroes);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container
        fluid
        className="main text-center d-flex flex-column justify-content-start align-items-center pt-3"
      >
        <h1 className="h1-app">Marvel's Heroes</h1>

        <StrictModeDroppable droppableId="heroes">
          {(provided) => (
            <div
              className="list text-center "
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {heroes.map((hero, index) => (
                <Draggable key={hero.id} draggableId={hero.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <DraggableBlockList
                        key={hero.id}
                        name={hero.name}
                        id={hero.id}
                        index={index}
                        heroes={heroes}
                        moveItemUp={moveItemUp}
                        moveItemDown={moveItemDown}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </Container>
    </DragDropContext>
  );
}

export default App;
