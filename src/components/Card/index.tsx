import React from "react";
import {ICard} from "../../features/column/columnSlice";

type Props = {
  children?: React.ReactNode;
  data: ICard;
    onCartEdit: () => void
};

const Card = ({ data, onCartEdit }: Props) => {
  return (
    <div className="shadow-lg flex w-full cursor-pointer mb-3">
      <div className="rounded-l-md p-5 w-20 bg-blue-300">
      </div>

      <main className="py-7 px-5 rounded-r-md w-full bg-white">
        <span className="flex flex-row justify-between">
          <h4 className="uppercase font-normal">Описание: {data.description}</h4>
          <img src={"./editIcon.svg"} alt="" onClick={onCartEdit}/>
        </span>
        <h1 className="font-bold text-xl">Карточка: {data.name}</h1>
      </main>
    </div>
  );
};

export default Card;
