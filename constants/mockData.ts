
import { Snippet, Doc, LearningGoal, SchedulerEvent, Tag } from '../types';

export const allTags: Tag[] = [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'KendoReact' },
  { id: 4, name: 'Performance' },
  { id: 5, name: 'Hooks' },
  { id: 6, name: 'Styling' },
  { id: 7, name: 'API' },
];

export const mockSnippets: Snippet[] = [
  {
    id: 1,
    title: 'Custom React Hook for Fetching Data',
    language: 'TypeScript',
    code: `
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;`,
    tags: [allTags[0], allTags[1], allTags[4], allTags[6]],
    description: 'A generic custom hook for handling data fetching, loading, and error states in a React component.',
    createdAt: new Date('2023-10-26'),
  },
  {
    id: 2,
    title: 'KendoReact Grid State Management',
    language: 'JavaScript',
    code: `
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { process } from '@progress/kendo-data-query';
import products from './products.json';

const initialDataState = {
  sort: [{ field: "code", dir: "asc" }],
  take: 10,
  skip: 0
};

const DataGrid = () => {
  const [dataState, setDataState] = React.useState(initialDataState);
  const [dataResult, setDataResult] = React.useState(
    process(products, dataState)
  );

  const dataStateChange = (event) => {
    setDataResult(process(products, event.dataState));
    setDataState(event.dataState);
  }

  return (
    <Grid
      data={dataResult}
      {...dataState}
      onDataStateChange={dataStateChange}
      pageable
      sortable
    >
      <GridColumn field="ProductID" title="ID" width="100px" />
      <GridColumn field="ProductName" title="Name" />
      <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
    </Grid>
  );
};`,
    tags: [allTags[0], allTags[2]],
    description: 'Example of handling KendoReact Grid state (sorting, paging) using process from kendo-data-query.',
    createdAt: new Date('2023-11-15'),
  },
];

export const mockDocs: Doc[] = [
  { id: 1, name: 'Project_Architecture.md', type: 'text/markdown', size: 15360, uploadedAt: new Date('2023-09-01') },
  { id: 2, name: 'API_Integration_Guide.txt', type: 'text/plain', size: 30720, uploadedAt: new Date('2023-09-10') },
  { id: 3, name: 'Component_Library_Spec.md', type: 'text/markdown', size: 51200, uploadedAt: new Date('2023-10-05') },
];

export const mockLearningGoals: LearningGoal[] = [
  { id: 1, title: 'Master KendoReact Grid', category: 'KendoReact', targetHours: 20, loggedHours: 15 },
  { id: 2, title: 'Advanced TypeScript Patterns', category: 'TypeScript', targetHours: 30, loggedHours: 10 },
  { id: 3, title: 'Learn Docker for Dev Environments', category: 'DevOps', targetHours: 15, loggedHours: 14 },
  { id: 4, title: 'React Performance Optimization', category: 'React', targetHours: 25, loggedHours: 5 },
];

const now = new Date();
export const mockSchedulerEvents: SchedulerEvent[] = [
    {
        id: 0,
        title: 'Learn KendoReact Scheduler',
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30),
        isAllDay: false
    },
    {
        id: 1,
        title: 'Team Standup',
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 0),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 10, 15),
        // FIX: Added missing isAllDay property
        isAllDay: false,
        recurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR'
    },
    {
        id: 2,
        title: 'Project Architecture Review',
        start: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 0),
        end: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 15, 30),
        // FIX: Added missing isAllDay property
        isAllDay: false
    }
];