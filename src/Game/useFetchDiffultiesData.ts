import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

const url = 'http://demo7919674.mockable.io/';

export const DifficultyName = ['Easy', 'Normal', 'Hard'] as const
export type DifficlutyName = typeof DifficultyName[number];

interface Difficulty {
  name: DifficlutyName;
  field: number;
}

type MappedDiffuculties = Record<DifficlutyName, number>; 

const fetchDifficultiesData = async () => {
  try {
    const { data } = await axios.get<Difficulty[]>(url);

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const useFetchDifficultiesData = (): MappedDiffuculties | undefined => {
  const [difficultiesData, setDifficultiesData] = useState<Difficulty[]>([]);

  useEffect(() => {
    fetchDifficultiesData().then(setDifficultiesData);
  }, []);

  return useMemo(() =>
    difficultiesData.length === 0
      ? undefined
      : difficultiesData.reduce((acc: MappedDiffuculties, curr) => ({
        ...acc,
        [curr.name]: curr.field
      }), {} as MappedDiffuculties),
    [difficultiesData]
  );
}