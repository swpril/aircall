import * as _ from 'lodash-es';
import * as React from 'react';

import { IActivity } from '../../models/activity';
import { ActivityCard } from '../ActivityCard/ActivityCard';
import { Divider } from '@mui/material';

export const CallList = ({
  activities,
  onArchiveButtonClick
}: {
  activities: IActivity[];
  onArchiveButtonClick: () => void;
}) => {
  const groupedByDate = _.groupBy(activities, activity =>
    new Date(activity.created_at).toDateString()
  ) as { [key: string]: IActivity[] };

  return Object.entries(groupedByDate)
    .sort(([dateA], [dateB]) => +new Date(dateB) - +new Date(dateA))
    .map(([date, callLogs]) => {
      return (
        <React.Fragment key={date}>
          <Divider textAlign='center'>{date}</Divider>
          {callLogs.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onArchiveButtonClick={onArchiveButtonClick}
            />
          ))}
        </React.Fragment>
      );
    });
};
