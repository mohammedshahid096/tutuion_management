import React, { memo, useCallback } from 'react';
import ModalV2 from '@/views/components/modal/ModalV2';
import KeyValueGrid from '@/views/components/tables/KeyValueGrid';
import { Badge } from '@/components/ui/badge';
import { badgeStyles } from './ContactList';
import moment from 'moment';
import { format } from 'timeago.js';

const ContactDetailsModal = ({ info, setInfo, details }) => {
  const closeModalFunction = useCallback(() => {
    setInfo((prev) => ({ ...prev, details: null }));
  }, [info?.details]);

  console.log(details, 'shahid');

  return (
    <ModalV2
      isOpen={Boolean(info?.details)}
      onClose={closeModalFunction}
      closeOutside={false}
      title="Contact Details"
      width="lg"
    >
      <KeyValueGrid
        data={[
          { key: 'Name', value: details?.name },
          { key: 'email', value: details?.email },
          { key: 'Phone', value: details?.phone },
          { key: 'Class', value: details?.class },
          { key: 'Message', value: details?.message },
          {
            key: 'Preferred Time',
            value: (
              <Badge className={badgeStyles[details?.preferredTime || 'default']}>
                {details?.preferredTime}
              </Badge>
            ),
          },
          {
            key: 'Heard From',
            value: (
              <Badge className={badgeStyles[details?.heardAboutUs || 'default']}>
                {details?.heardAboutUs}
              </Badge>
            ),
          },
          {
            key: 'Session Type',
            value: (
              <Badge className={badgeStyles[details?.sessionType || 'other']}>
                {details?.sessionType || 'N/A'}
              </Badge>
            ),
          },
          { key: 'Status', value: details?.status },
          { key: 'Date', value: moment(details?.createdAt).format('LL') },
          { key: 'Time Ago', value: format(details?.createdAt) },
        ]}
        cols={2}
      />
    </ModalV2>
  );
};

export default memo(ContactDetailsModal);
