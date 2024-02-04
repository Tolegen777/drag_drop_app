import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../app/store";
import {cardCreate, cardEdit, ICard, ICardCreate} from "../../features/column/columnSlice";
import {useDispatch} from "react-redux";

type Props = {
    entity: ICardCreate,
    type: 'create' | 'edit'
    onCloseModal: () => void,
    columnId: number

}
const CardModalForm = ({entity, type, onCloseModal, columnId}: Props) => {

    const { columns } = useTypedSelector(state => state.column)

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (entity) {
            setName(entity.cardBody.name)
            setDesc(entity.cardBody.description)
        }
    }, [entity])

    const onSubmit = () => {
        if (type === 'create') {
            const id = Math.floor(Math.random() * 100001);
            dispatch(cardCreate({
                columnId: columnId as number,
                cardBody: {
                    id: id,
                    description: desc,
                    name: name
                }
            }))
        } else {
            dispatch(cardEdit({
                columnId: columnId as number,
                cardBody: {
                    id: entity.cardBody.id,
                    description: desc,
                    name: name
                }
            }))
        }
        onCloseModal()
    }

    return (
        <div>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Название карточки
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Напишите название карточки"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Описание карточки
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="dscription"
                        type="text"
                        placeholder="Напишите описание карточки"
                        value={desc}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Колонка
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="columnId"
                        value={columnId as number}
                        disabled
                    >
                        {columns.map(item => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                <button
                    className="bg-sky-500 text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                    onClick={onSubmit}
                >
                    Ок
                </button>
            </form>
        </div>
    );
};

export default CardModalForm;
