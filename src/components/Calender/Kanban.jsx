import React from 'react';
import KanbanBoard from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';

const Board = {
    columns: [
        {
            id: 1,
            title: "Monday",
            cards: [
                { id: 1, title: "Ticket 1", description: "Task details here" },
                { id: 2, title: "Ticket 2", description: "More task details" },
            ],
        },
        {
            id: 2,
            title: "Tuesday",
            cards: [],
        },
        {
            id: 3,
            title: "Wednesday",
            cards: [],
        },
        {
            id: 4,
            title: "Thursday",
            cards: [],
        },
        {
            id: 5,
            title: "Friday",
            cards: [],
        },
        {
            id: 6,
            title: "Saturday",
            cards: [],
        },
    ],
};

const Kanban = () => {
    const handleCardMove = (board) => {
        console.log("Updated Board", board);
    };

    return (
        <KanbanBoard
            initialBoard={Board}
            allowAddCard
            onCardDragEnd={handleCardMove}
        />
    );
};

export default Kanban;
