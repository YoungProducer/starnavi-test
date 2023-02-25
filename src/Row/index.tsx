import { FunctionComponent, useMemo } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

export interface RowProps {
  row: boolean[];
  rowId: number;
}

export const Row: FunctionComponent<RowProps> = ({ row, rowId }) => {
  const cells = useMemo(() => {
    return (
      <>
        {row.map((state, colId) =>
          <div
            key={colId}
            className={
              classNames(
                styles.cell, {
                  [styles['cell-selected']]: state
                })
            }
            data-col={colId}
            data-row={rowId}
          />
        )}
      </>
    )
  }, [row, rowId]);

  return (
    <div className={styles.row}>
      {cells}
    </div>
  )
}