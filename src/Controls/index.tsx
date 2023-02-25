import { FunctionComponent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import styles from './styles.module.css';
import { DifficlutyName } from '../Game/useFetchDiffultiesData';

export interface ControlsProps {
  difficulties: DifficlutyName[];
  currentDifficulty: DifficlutyName;
  startButtonText: string;
  isExpectedVisible: boolean;
  selectDifficulty: (difficulty: DifficlutyName) => void;
  onStart: () => void;
  toggleIsExpectedVisible: () => void;
}

export const Controls: FunctionComponent<ControlsProps> = ({
  difficulties,
  currentDifficulty,
  selectDifficulty,
  isExpectedVisible,
  startButtonText,
  onStart,
  toggleIsExpectedVisible
}) => {
  return (
    <div className={styles.wrap}>
      <Dropdown>
        <Dropdown.Toggle variant='success' id='level'>
          {currentDifficulty || 'Pick'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {difficulties.map((name) => (
            <Dropdown.Item key={name} onClick={() => selectDifficulty(name)}>{name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={onStart}>{startButtonText}</Button>
      <Button onClick={toggleIsExpectedVisible}>{isExpectedVisible ? 'Hide' : 'Show'} expected</Button>
    </div>
  )
}