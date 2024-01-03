import {
  Call,
  CallMadeRounded,
  CallMissed,
  CallReceived,
  Voicemail
} from '@mui/icons-material';
import { useState } from 'react';

import { IActivity } from '../../models/activity';
import { markArchiveOrUnarchiveByCallId } from '../../services/activity.service';
import { getMinutesFormatFromSeconds, getTimeFromDate } from '../../utils/time';
import { Button } from '../Button/Button';

import './ActivityCard.scss';

const CALL_STATUS_COMPONENT_MAP: {
  [key: string]: JSX.Element;
} = {
  missed: <CallMissed />,
  answered: <Call />,
  voicemail: <Voicemail />
};
export const ActivityCard = ({
  activity,
  onArchiveButtonClick
}: {
  activity: IActivity;
  onArchiveButtonClick: () => void;
}) => {
  const { time, isPM } = getTimeFromDate(activity.created_at);

  const [activeId, setActiveId] = useState<string>('');

  const CallTypeComponent = CALL_STATUS_COMPONENT_MAP[activity.call_type];

  return (
    <div
      className='card d-flex align-center justify-between relative'
      onMouseEnter={() => setActiveId(activity.id)}
      onMouseLeave={() => setActiveId('')}>
      {activeId === activity.id && (
        <Button
          onClick={async () => {
            await markArchiveOrUnarchiveByCallId(
              activeId,
              !activity.is_archived
            );
            onArchiveButtonClick();
          }}>
          {activity.is_archived ? 'Unarchive' : 'Archive'}
        </Button>
      )}
      <div className={`d-flex align-center`}>
        <span style={{ marginRight: '4px' }}>
          {activity.direction === 'inbound' ? (
            <CallReceived fontSize='small' color='success' />
          ) : (
            <CallMadeRounded color='warning' />
          )}
        </span>

        <div style={{ marginRight: '4px' }}>
          {activity.from && (
            <>
              <p className='from'>{activity?.from || ''}</p>
              <p className='to'>
                {activity?.to ? 'tried to call on ' + activity.to : ''}
              </p>
              <p>{' via ' + activity?.via || ''}</p>
            </>
          )}

          {!activity.from && (
            <p className='from'>Caller ID: {activity?.id || ''}</p>
          )}
        </div>

        <span className='d-flex align-center'>
          {CallTypeComponent}
          {activity.call_type !== 'missed' &&
            getMinutesFormatFromSeconds(activity.duration)}
        </span>
      </div>

      <p className='time d-flex justify-between align-center'>
        {time}
        <span className='zone'>{isPM ? 'PM' : 'AM'}</span>
      </p>
    </div>
  );
};
