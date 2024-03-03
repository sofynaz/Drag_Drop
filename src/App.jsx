import React, { useEffect, useState } from 'react'
import Data_Photos from './data'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function getListStyle(isDraggingOver) {
  return {
    background: isDraggingOver ? 'lightblue' : 'lightgrey'
  };
}

function getItemStyle(isDragging, draggableStyle) {
  return {
    userSelect: 'none',
    ...draggableStyle
  };
}

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Data_Photos);
  }, []);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(reorderedItems);
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='droppable'>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {/* <img src={item.photo}  /> */}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="container">
        {Data_Photos.map((photo, id) => photo.id === '1' || photo.id === '8' ? <div key='id'>{items.photo}</div> : "")}
        {/* <div className="grid grid-cols-2">
          <span className='text-yellow-500'>child</span>
          <span>child2</span>
        </div>
        <div className="grid grid-cols-2">
          <span className='text-yellow-500'>child1</span>
          <span>child2</span>
        </div>
        <div className="grid grid-cols-2">
          <span className='text-yellow-500'>child1</span>
          <span>child2</span>
        </div>
        <div>bottom</div> */}
      </div>
    </>
  );
}

export default App;
