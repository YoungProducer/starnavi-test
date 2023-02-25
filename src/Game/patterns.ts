import { DifficlutyName } from './useFetchDiffultiesData';
import easy from '../assets/patterns/easy.json';
import normal from '../assets/patterns/normal.json';
import hard from '../assets/patterns/hard.json';

export type PatternsMap = Record<DifficlutyName, boolean[][]>;

export const patterns: PatternsMap = {
  'Easy': easy,
  'Normal': normal,
  'Hard': hard,
}