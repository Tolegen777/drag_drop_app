import Card from "../Card/index";
import List from "../ColumnContent/index";
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { useState } from "react";
import { useTypedSelector } from "../../app/store";
import { useDispatch } from "react-redux";
import { cardMove, ICard, ICardCreate, IColumn } from "../../features/column/columnSlice";
import Modal from "../Modal/Modal";
import ColumnModalForm from "../ColumnModalForm";
import CardModalForm from "../CardModalForm";

const DragDropContent = () => {
    const { columns } = useTypedSelector((state) => state.column);

    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalContentType, setModalContentType] = useState<"column" | "card">("column");

    const [actionType, setActionType] = useState<"create" | "edit">("create");

    const [editEntity, setEditEntity] = useState<ICardCreate | IColumn | null>(null);

    const [columnId, setColumnId] = useState<number | null>(null);

    const openModal = (type: "column" | "card", action: "create" | "edit", entity?: ICardCreate | IColumn | null, columnId?: number) => {
        setIsModalOpen(true);
        setModalContentType(type);
        setActionType(action);
        if (entity) {
            setEditEntity(entity);
        }
        if (columnId) {
            setColumnId(columnId);
        }
    };

    const closeModal = () => {
        setEditEntity(null);
        setIsModalOpen(false);
    };

    const onDragEnd = (result: any) => {
        const fromId = Number(result?.source?.droppableId);
        const toId = Number(result?.destination?.droppableId);
        const cartId = Number(result?.draggableId);
        const cartBody = columns?.find((item) => item?.id === fromId)?.cards?.find((item) => item.id === cartId);
        dispatch(
            cardMove({
                moveFromColumnId: fromId,
                moveToColumnId: toId,
                cardBody: cartBody as ICard,
            })
        );
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <button
                    onClick={() => openModal("column", "create")}
                    className="border-2 border-sky-500 p-2 rounded-xl bg-sky-500 text-white mb-4"
                >
                    Создать колонку +
                </button>
                <div className="flex space-x-4">
                    {columns.map((column) => (
                        <List
                            title={column.name}
                            name={column.id?.toString()}
                            onCartCreate={() => openModal("card", "create", null, column.id)}
                            onCartEdit={() => openModal("column", "edit", column)}
                        >
                            {column.cards.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id?.toString()} index={index}>
                                    {(
                                        provided: DraggableProvided | any,
                                        snapshot: DraggableStateSnapshot
                                    ) => (
                                        <div>
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Card
                                                    data={item}
                                                    onCartEdit={() =>
                                                        openModal("card", "edit", {
                                                            columnId: column.id,
                                                            cardBody: {
                                                                id: item.id,
                                                                name: item.name,
                                                                description: item.description,
                                                            },
                                                        }, column?.id as number)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </List>
                    ))}
                </div>
            </DragDropContext>

            <div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {modalContentType === "column" && (
                        <ColumnModalForm
                            type={actionType}
                            entity={editEntity as IColumn}
                            onCloseModal={() => setIsModalOpen(false)}
                        />
                    )}
                    {modalContentType === "card" && (
                        <CardModalForm
                            type={actionType}
                            entity={editEntity as ICardCreate}
                            onCloseModal={() => setIsModalOpen(false)}
                            columnId={columnId as number}
                        />
                    )}
                </Modal>
            </div>
        </>
    );
};

export default DragDropContent;
