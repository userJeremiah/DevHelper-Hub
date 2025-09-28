
import React, { useState } from 'react';
// FIX: Imported specific view components like DayView, WeekView, etc., to correctly define scheduler views.
import { Scheduler, DayView, WeekView, MonthView, AgendaView } from '@progress/kendo-react-scheduler';
import { Button } from '@progress/kendo-react-buttons';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { mockSchedulerEvents } from '../constants/mockData';
import { SchedulerEvent } from '../types';
import PageContainer from '../components/PageContainer';

const SchedulerPage: React.FC = () => {
  const [events, setEvents] = useState<SchedulerEvent[]>(mockSchedulerEvents.map(e => ({...e, start: new Date(e.start), end: new Date(e.end)})));
  // FIX: The view state should be a string, not the SchedulerView component type.
  const [view, setView] = React.useState('day');
  const [date, setDate] = React.useState<Date>(new Date());
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleDataChange = ({ created, updated, deleted }: any) => {
    const newEvents = events
      .filter(event => deleted.find((item: any) => item.id === event.id) === undefined)
      .map(event => updated.find((item: any) => item.id === event.id) || event);
      
    const createdWithIds = created.map((item: any) => ({...item, id: Math.random()}));

    setEvents([...newEvents, ...createdWithIds]);
  };

  const showNotification = () => {
    setNotificationVisible(true);
    setTimeout(() => {
        setNotificationVisible(false);
    }, 3000)
  };

  return (
    <PageContainer title="Coding Session Scheduler">
      <div className="mb-4">
        <Button onClick={showNotification}>Show Upcoming Session Reminder</Button>
      </div>
      <Scheduler
        data={events}
        onDataChange={handleDataChange}
        view={view}
        // FIX: The event value is a string, which matches the state type.
        onViewChange={e => setView(e.value)}
        date={date}
        onDateChange={e => setDate(e.value)}
        editable={true}
        style={{ height: 'calc(100vh - 200px)' }}
      >
        {/* FIX: Use specific view components instead of the generic SchedulerView. */}
        <DayView />
        <WeekView />
        <MonthView />
        <AgendaView />
      </Scheduler>

      <NotificationGroup
        style={{
          right: "10px",
          bottom: "10px",
          alignItems: "flex-start",
          flexWrap: "wrap-reverse",
        }}
      >
        {notificationVisible && (
            <Notification
              type={{ style: 'info', icon: true }}
              closable={true}
              onClose={() => setNotificationVisible(false)}
            >
              <span>Reminder: Your 'Learn KendoReact Scheduler' session starts soon!</span>
            </Notification>
        )}
      </NotificationGroup>
    </PageContainer>
  );
};

export default SchedulerPage;
