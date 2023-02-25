import { FunctionComponent, useEffect, useState, useMemo, MouseEvent } from 'react';
import { createCleanBoard } from './utils';
import { Row } from '../Row';

import styles from './styles.module.css'

export interface BoardProps {
  size?: number;
}

export const Board: FunctionComponent<BoardProps> = ({ size = 5 }) => {
  const [data, setData] = useState<boolean[][]>(createCleanBoard(size));

  // reset the board when size changes
  useEffect(() => {
    setData(createCleanBoard(size));
  }, [size, setData]);

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

    setData(data => {
      // create a deep copy of array
      const newData = Array.from(data.map(row => Array.from(row)));

      const currentState = newData[row][col];

      // modify cell according to row and col that we got from target
      newData[row][col] = !currentState;

      return newData;
    })
  }

  return (
    <div className={styles.board} onMouseOver={handleMouseOver}>
      {boardRender}
    </div>
  )
}