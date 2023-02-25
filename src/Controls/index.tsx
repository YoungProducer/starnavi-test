import { FunctionComponent } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import styles from './styles.module.css';
import { DifficlutyName } from '../Game/useFetchDiffultiesData';

export interface ControlsProps {
  difficulties: DifficlutyName[];
  currentDifficulty: DifficlutyName;
  startButtonText: string;
  selectDifficulty: (difficulty: DifficlutyName) => void;
  onStart: () => void;
}

export const Controls: FunctionComponent<ControlsProps> = ({
  difficulties,
  currentDifficulty,
  selectDifficulty,
  startButtonText,
  onStart,
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
    </div>
  )
}