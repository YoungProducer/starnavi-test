import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

const url = 'http://demo7919674.mockable.io/';

interface Difficulty {
  name: string;
  field: number;
}

type MappedDiffuculties = Record<string, number>; 

const fetchDifficultiesData = async () => {
  try {
    const { data } = await axios.get<Difficulty[]>(url);

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const useFetchDifficultiesData = (): MappedDiffuculties => {
  const [difficultiesData, setDifficultiesData] = useState<Difficulty[]>([]);

  useEffect(() => {
    fetchDifficultiesData().then(setDifficultiesData);
  }, []);

  return useMemo(() =>
    difficultiesData.reduce((acc: MappedDiffuculties, curr) => ({
      ...acc,
      [curr.name]: curr.field
    }), {}),
    [difficultiesData]
  );
}