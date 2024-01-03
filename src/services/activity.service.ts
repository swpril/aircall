import axiosInstance from '../interceptor';
import { IActivity } from '../models/activity';

export const getCallActivities = () =>
  axiosInstance.get<IActivity[]>('/activities');

export const getCallByCallId = (callId: string) =>
  axiosInstance.get<IActivity>(`/activities/${callId}`);

export const markArchiveOrUnarchiveByCallId = (
  callId: string,
  is_archived: boolean
) =>
  axiosInstance.patch(`/activities/${callId}`, {
    is_archived
  });

export const resetCalls = () => axiosInstance.patch('/reset');
