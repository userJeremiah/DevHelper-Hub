
import React, { useState } from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
} from '@progress/kendo-react-charts';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { mockLearningGoals } from '../constants/mockData';
import PageContainer from '../components/PageContainer';
import { LearningGoal } from '../types';

const ProgressTracker: React.FC = () => {
  const [goals] = useState<LearningGoal[]>(mockLearningGoals);

  const chartData = goals.map(goal => ({
    category: goal.title,
    logged: goal.loggedHours,
    target: goal.targetHours,
  }));

  return (
    <PageContainer title="Learning Progress Tracker">
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Hours Logged vs. Target</CardTitle>
          </CardHeader>
          <CardBody>
            <Chart style={{ height: 350 }}>
              <ChartLegend position="top" orientation="horizontal" />
              <ChartCategoryAxis>
                <ChartCategoryAxisItem categories={chartData.map(d => d.category)} />
              </ChartCategoryAxis>
              <ChartSeries>
                <ChartSeriesItem
                  type="column"
                  name="Logged Hours"
                  data={chartData.map(d => d.logged)}
                />
                <ChartSeriesItem
                  type="line"
                  name="Target Hours"
                  data={chartData.map(d => d.target)}
                />
              </ChartSeries>
            </Chart>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const completion = (goal.loggedHours / goal.targetHours) * 100;
          return (
            <Card key={goal.id}>
              <CardHeader className="flex justify-between items-center">
                <CardTitle>{goal.title}</CardTitle>
                <span className="text-sm font-medium text-gray-600">{goal.category}</span>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-gray-500 mb-2">
                  {goal.loggedHours} / {goal.targetHours} hours completed
                </p>
                <ProgressBar value={completion} />
              </CardBody>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default ProgressTracker;
