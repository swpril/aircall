export type ActivityDirectionType = 'inbound' | 'outbound';
export type ActivityCallType = 'missed' | 'answered' | 'voicemail';

export interface IActivity {
  id: string;
  created_at: string;
  direction: ActivityDirectionType;
  from: string;
  to: string;
  via: string;
  duration: number;
  is_archived: string;
  call_type: ActivityCallType;
}
