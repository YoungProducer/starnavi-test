import { FunctionComponent, useMemo, MouseEvent } from 'react';
import { Row } from '../Row';

import styles from './styles.module.css'

export interface BoardProps {
  data: boolean[][];
  setData: (data: boolean[][]) => void;
}

export const Board: FunctionComponent<BoardProps> = ({ data, setData }) => {
  const boardRender = useMemo(() =>
    data.map((row, id) => (
      <Row key={id} row={row} rowId={id} />
    )),
    [data]
  );

  const handleMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    // using bubbling to prevent using a ton of handlers on the cells

    const dataset = (event.target as HTMLDivElement).dataset;

    // check wether the target has data attributes and the attributes important to us or not
    if (!dataset || !dataset.row || !dataset.col) return;

    const row = Number(dataset.row);
    const col = Number(dataset.col);

    const newData = Array.from(data.map(row => Array.from(row)));

    const currentState = newData[row][col];

    // modify cell according to row and col that we got from target
    newData[row][col] = !currentState;

    setData(newData);

    // setData(data => {
    //   // create a deep copy of array
    //   const newData = Array.from(data.map(row => Array.from(row)));

    //   const currentState = newData[row][col];

    //   // modify cell according to row and col that we got from target
    //   newData[row][col] = !currentState;

    //   return newData;
    // })
  }

  return (
    <div className={styles.board} onMouseOver={handleMouseOver}>
      {boardRender}
    </div>
  )
}