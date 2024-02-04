import React from "react";
import { Droppable, DroppableProvided, DroppableStateSnapshot } from "react-beautiful-dnd";

type ListProps = {
    children?: React.ReactNode;
    title: string;
    onCartCreate: () => void;
    onCartEdit: () => void;
    name: string;
};

const ColumnContent = ({ children, title, name, onCartCreate, onCartEdit }: ListProps) => {
    return (
        <div className="flex flex-col items-center gap-2 bg-green-100 p-4 rounded-xl">
            <h2 className="flex gap-2 text-2xl font-bold text-black">
                Колонка: {title}
                <img src={"./editIcon.svg"} alt="" onClick={onCartEdit} className="cursor-pointer" />
            </h2>
            <button
                onClick={onCartCreate}
                className="border-2 border-sky-500 p-2 rounded-xl bg-sky-500 text-white mb-4"
            >
                Создать карточку +
            </button>
            <div>
                <Droppable droppableId={name}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                        <div ref={provided.innerRef} className="h-full">
                            <div className="w-72 min-h-80">
                                {children}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
};

export default ColumnContent;
