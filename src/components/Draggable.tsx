import { FC } from 'react';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  id: string;
  label: string;
}

export const Draggable: FC<Props> = ({ id, label }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
  } = useDraggable({
    id,
  });

  const style = {
    color: 'white',
    backgroundColor: '#007bff',
    border: '1px dashed black',
    borderRadius: '4px',
    padding: '0.5rem 1rem',
    cursor: 'grab',
    listStyle: 'none',
    display: 'inline-block',
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {label}
    </li>
  );
};