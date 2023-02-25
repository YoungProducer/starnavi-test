import { FunctionComponent, useState, useMemo, useCallback } from 'react';
import { Board } from '../Board';
import { useFetchDifficultiesData, DifficlutyName } from './useFetchDiffultiesData';
import { createCleanBoard, compareBoards } from './utils';
import { noop } from '../utils/noop';
import { patterns } from './patterns';

import styles from './styles.module.css';
import { Controls } from '../Controls';

const defaultBoardSize = 5;

export const Game: FunctionComponent = () => {
  const difficultiesData = useFetchDifficultiesData();

  const [boardData, setBoardData] = useState<boolean[][]>(createCleanBoard(defaultBoardSize));

  const [difficulty, setDifficulty] = useState<DifficlutyName>('Easy');
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isExpectedVisible, setIsExpectedVisible] = useState<boolean>(false);

  const levels = useMemo(() => difficultiesData ? Object.keys(difficultiesData) : [], [difficultiesData]);

  const resetBoardByDifficulty = useCallback((difficulty: DifficlutyName) => {
    if (!difficultiesData) return;

    const size = difficultiesData[difficulty];

    if (!size) return;

    setBoardData(createCleanBoard(size));
  }, [difficultiesData, setBoardData]);

  const selectDifficulty = (difficulty: DifficlutyName) => {
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

  const toggleIsExpectedVisible = () => {
    setIsExpectedVisible(s => !s);
  }

  const expectedResult = useMemo(() => {
    const expectedData = patterns[difficulty];

    return expectedData || [];
  }, [difficulty])

  const updateBoardData = useMemo(() => {
    if (!isGameStarted) return noop;

    return (data: boolean[][]) => {
      setBoardData(data);

      if (!compareBoards(data, expectedResult)) {
        // needs a smallest timeout since modal appers faster then the square updates
        setTimeout(() => alert('Congratulations, you passed the level correctly!'), 100);
      }
    }
  }, [isGameStarted, expectedResult]);

  const startButtonHandler = useMemo(() => isGameStarted ? restartGame : startGame, [isGameStarted, startGame, restartGame]);

  const startButtonText = useMemo(() => isGameStarted ? 'Restart' : 'Start', [isGameStarted]);

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <Controls
          currentDifficulty={difficulty}
          difficulties={levels as DifficlutyName[]}
          selectDifficulty={selectDifficulty}
          startButtonText={startButtonText}
          onStart={startButtonHandler}
          toggleIsExpectedVisible={toggleIsExpectedVisible}
          isExpectedVisible={isExpectedVisible}
        />
      </div>
      <div className={styles.board}>
        <Board data={boardData} setData={updateBoardData} />
        {isExpectedVisible && (
          <div className={styles['expected-board']}>
            <Board data={expectedResult} setData={noop} />
          </div>
        )}
      </div>
    </div>
  )
}