import { ArchiveRounded, UnarchiveRounded } from '@mui/icons-material';
import { Box, Skeleton, Tab, Tabs } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { CallList } from '../components/CallList/CallList';
import { Header } from '../components/Header/Header';
import { IActivity } from '../models/activity';
import {
  getCallActivities,
  markArchiveOrUnarchiveByCallId,
  resetCalls
} from '../services/activity.service';

import { Button } from '../components/Button/Button';
import './Inbox.scss';
import { BottomNav } from '../components/BottomNav/BottomNav';

export const Inbox = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);

  const fetchCallActivities = useCallback(() => {
    setIsLoading(true);
    getCallActivities()
      .then(res => {
        console.log();
        setActivities(res?.data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCallActivities();
  }, [fetchCallActivities]);

  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const archivedCalls = activities.filter(activity => activity.is_archived);
  const unarchiveCalls = activities.filter(activity => !activity.is_archived);

  const archiveAllActivities = async () => {
    setIsLoading(true);
    await Promise.all(
      activities
        .filter(activity => !activity.is_archived)
        .map(activity => markArchiveOrUnarchiveByCallId(activity.id, true))
    );
    fetchCallActivities();
  };
  const unarchiveAllActivities = async () => {
    setIsLoading(true);
    await resetCalls().then(() => {
      setValue(0);
      fetchCallActivities();
    });
  };

  return (
    <>
      <header
        className='d-flex align-end'
        style={{
          gap: '6px',
          borderBottom: '1px solid lightgray',
          marginBottom: '6px'
        }}>
        <Header />
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label='Call List'>
            <Tab label='Inbox' />
            <Tab label='Archived' />
          </Tabs>
        </Box>
      </header>
      <main className='main'>
        {isLoading &&
          [0, 1, 2, 4, 5, 6, 7].map(item => (
            <Skeleton key={item} height={70} animation={'wave'} />
          ))}
        {!isLoading && (
          <div className='d-flex flex-column' style={{ gap: '10px' }}>
            <div className='d-flex justify-center'>
              {value === 0 && (
                <Button onClick={archiveAllActivities}>
                  <ArchiveRounded /> Archive all calls
                </Button>
              )}
              {value === 1 && (
                <Button onClick={unarchiveAllActivities}>
                  <UnarchiveRounded /> Unarchive all calls
                </Button>
              )}
            </div>

            <CallList
              activities={value === 0 ? unarchiveCalls : archivedCalls}
              onArchiveButtonClick={fetchCallActivities}
            />
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
};
