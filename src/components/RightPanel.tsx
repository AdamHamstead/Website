// externals
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card } from 'react-bootstrap';

// dnd-kit
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';

// components
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { DropBin } from './DropBin';

// initial function names
const functionNames = ['calculateTotal', 'formatDate', 'sendEmail', 'validateInput'];

interface ActiveItem {
  id: UniqueIdentifier;
  label: string;
}

export const RightPanel = () => {
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null);

  const [selectedItem, setSelectedItem] = useState<ActiveItem>({
    id: 'calculateTotal',
    label: 'calculateTotal',
  });

  const [favoriteItem, setFavoriteItem] = useState<ActiveItem>({
    id: 'formatDate',
    label: 'formatDate',
  });

  const handleDragStart = ({ active }: any) => {
    setActiveItem({ id: active.id, label: String(active.id) });

    // Determine origin
    if (active.id === selectedItem?.id) setActiveItemOrigin('selected');
    else if (active.id === favoriteItem?.id) setActiveItemOrigin('favorite');
    else setActiveItemOrigin('functionList');
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveItem(null);
    setActiveItemOrigin(null);

    if (!over) return;

    const draggedItem = { id: active.id, label: String(active.id) };

    if (over.id === 'selected') {
      setSelectedItem(draggedItem);
      if (activeItemOrigin === 'favorite') setFavoriteItem(null);
    } else if (over.id === 'favorite') {
      setFavoriteItem(draggedItem);
      if (activeItemOrigin === 'selected') setSelectedItem(null);
    }
  };

  return (
    <div>
      <DndContext
        onDragStart={handleDragStart}
        onDragCancel={() => {
          setActiveItem(null);
          setActiveItemOrigin(null);
        }}
        onDragEnd={handleDragEnd}
      >
        <Row className="mt-3">
          {/* Drop Targets */}
          <Col md={4}>
            <Card className="mb-3 p-3">
              <Card.Title>Selected Function</Card.Title>
              <Droppable id="selected">
                {selectedItem && (
                  <Draggable id={selectedItem.id} label={selectedItem.label} />
                )}
              </Droppable>
            </Card>

            <Card className="mb-3 p-3">
              <Card.Title>Favorite Function</Card.Title>
              <Droppable id="favorite">
                {favoriteItem && (
                  <Draggable id={favoriteItem.id} label={favoriteItem.label} />
                )}
              </Droppable>
            </Card>

            <Card className="p-3 text-center">
              <DropBin active={activeItemOrigin === null} />
            </Card>
          </Col>

          {/* Draggable Function List */}
          <Col md={8}>
            <h5>Available Functions</h5>
            <div className="d-flex flex-wrap gap-2">
              {functionNames.map((funcName) => {
                // Don't show in list if already in selected or favorite
                if (
                  funcName === selectedItem?.id ||
                  funcName === favoriteItem?.id
                ) {
                  return null;
                }
                return (
                  <Draggable key={funcName} id={funcName} label={funcName} />
                );
              })}
            </div>
          </Col>
        </Row>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeItem ? (
            <span className="badge bg-primary">{activeItem.label}</span>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default RightPanel;
