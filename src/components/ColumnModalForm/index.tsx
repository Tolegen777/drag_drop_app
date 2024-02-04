import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../../app/store";
import {
    cardCreate,
    cardEdit,
    columnCreate,
    columnEdit,
    ICard,
    ICardCreate,
    IColumn
} from "../../features/column/columnSlice";
import {useDispatch} from "react-redux";

type Props = {
    entity: IColumn,
    type: 'create' | 'edit',
    onCloseModal: () => void,

}
const CardModalForm = ({entity, type, onCloseModal}: Props) => {

    const [name, setName] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (entity) {
            setName(entity.name)
        }
    }, [entity])

    const onSubmit = () => {
        if (type === 'create') {
            const id = Math.floor(Math.random() * 100001);
            dispatch(columnCreate({
                id: id,
                name: name,
                cards: []
            }))
        } else {
            dispatch(columnEdit({
                id: entity.id as number,
                name: name,
                cards: entity.cards
            }))
        }
        onCloseModal()
    }

    return (
        <div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Название колонки
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Напишите название колонки"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <button
                    className="bg-sky-500 text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                    onClick={onSubmit}
                >
                    Ок
                </button>
        </div>
    );
};

export default CardModalForm;
