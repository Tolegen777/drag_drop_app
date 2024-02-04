import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface ICard {
    id: number,
    name: string,
    description: string
}

export interface IColumn {
    id: number,
    name: string,
    cards: ICard[]
}

export interface ICardCreate {
    columnId: number,
    cardBody: ICard
}

export interface ICardMove {
    moveFromColumnId: number,
    moveToColumnId: number,
    cardBody: ICard
}

export interface ColumnState {
    columns: IColumn[]
}

const initialState: ColumnState = {
    columns: []
}

export const columnSlice = createSlice({
    name: 'column',
    initialState,
    reducers: {
        columnCreate: (state, action: PayloadAction<IColumn>) => {
            state.columns.push(action.payload)
        },
        columnEdit: (state, action: PayloadAction<IColumn>) => {
            state.columns = state.columns.map(item => {
                if (item.id === action.payload?.id) {
                    return action.payload
                }
                return item
            })
        },
        cardCreate: (state, action: PayloadAction<ICardCreate>) => {
            state.columns = state.columns.map(item => {
                if (item.id === action.payload.columnId) {
                    return {
                        ...item,
                        cards: [...item.cards, action.payload.cardBody]
                    }
                }
                return item
            })
        },
        cardEdit: (state, action: PayloadAction<ICardCreate>) => {
            state.columns = state.columns.map(column => {
                if (column.id === action.payload.columnId) {
                    return {
                        ...column,
                        cards: column.cards.map(item => {
                            if (item.id === action.payload.cardBody.id) {
                                return action.payload.cardBody;
                            }
                            return item;
                        })
                    };
                }
                return column;
            });
        },
        cardMove: (state, action: PayloadAction<ICardMove>) => {
            state.columns = state.columns.map(column => {
                if (column.id === action.payload.moveFromColumnId) {
                    return {
                        ...column,
                        cards: column.cards.filter(card => card.id !== action.payload.cardBody.id)
                    };
                }

                if (column.id === action.payload.moveToColumnId) {
                    return {
                        ...column,
                        cards: [...column.cards, action.payload.cardBody]
                    };
                }

                return column;
            });
        },

    },
})
export const {columnCreate, cardCreate, cardMove, cardEdit, columnEdit} = columnSlice.actions

export default columnSlice.reducer
