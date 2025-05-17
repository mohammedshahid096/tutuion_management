import React, { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentActions } from '@/redux/combineActions';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import MetaData from '@/utils/MetaData';
import CustomTable1 from '@/views/components/tables/TableV1';
import moment from 'moment';
import { Badge } from '@/components/ui/badge';
import MainWrapper from '@/views/layouts/Mainwrapper';

const headers = [
  { title: 'Summary', key: 'summary' },
  { title: 'Subject', key: 'subjectName' },
  { title: 'Chapter', key: 'chapterName' },
  { title: 'Progress', key: 'value' },
  { title: 'Time', key: 'time' },
  { title: 'Meet', key: 'meet' },
  { title: 'Attended', key: 'isPresent' },
];

const MyAttendance = () => {
  return <MainWrapper>MyAttendance</MainWrapper>;
};

export default memo(MyAttendance);
