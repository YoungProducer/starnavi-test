import { FunctionComponent, useState, useMemo, useCallback } from 'react';
import { Board } from '../Board';
import { useFetchDifficultiesData } from './useFetchDiffultiesData';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { createCleanBoard } from './utils';
import { noop } from '../utils/noop';

import styles from './styles.module.css';

const defaultBoardSize = 5;

export const Game: FunctionComponent = () => {
  const difficultiesData = useFetchDifficultiesData();

  const [boardData, setBoardData] = useState<boolean[][]>(createCleanBoard(defaultBoardSize));

  const [difficulty, setDifficulty] = useState<string>('');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const levels = useMemo(() => Object.keys(difficultiesData), [difficultiesData]);

  const resetBoardByDifficulty = useCallback((level: string) => {
    const size = difficultiesData[level];

    if (!size) return;

    setBoardData(createCleanBoard(size));
  }, [difficultiesData, setBoardData]);

  const selectDifficulty = (difficulty: string) => () => {
    setDifficulty(difficulty);
    
    // if game started do not change current board
    if (isGameStarted) return;

    resetBoardByDifficulty(difficulty);
  }

  const startGame = useCallback(() => {
    if (!difficulty) return;

    setIsGameStarted(true);
  }, [difficulty, setIsGameStarted]);

  const restartGame = useCallback(() => {
    if (!difficulty) return;

    setIsGameStarted(true);
    resetBoardByDifficulty(difficulty)
  }, [difficulty, setIsGameStarted, resetBoardByDifficulty]);

  const updateBoardData = useMemo(() => isGameStarted ? setBoardData : noop, [isGameStarted]);

  const startButtonHandler = useMemo(() => isGameStarted ? restartGame : startGame, [isGameStarted, startGame, restartGame]);

  const startButtonText = useMemo(() => isGameStarted ? 'Restart' : 'Start', [isGameStarted]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <Dropdown>
          <Dropdown.Toggle variant='success' id='level'>
            {difficulty || 'Pick'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {levels.map(name => (
              <Dropdown.Item key={name} onClick={selectDifficulty(name)}>{name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button onClick={startButtonHandler}>{startButtonText}</Button>
      </div>
      <Board data={boardData} setData={updateBoardData} />
    </div>
  )
}