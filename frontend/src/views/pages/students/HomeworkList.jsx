import React, { useEffect, useCallback, memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { batchActions, boardActions, studentActions } from '@/redux/combineActions';
import StudentRegistrationForm from '@/views/features/students/RegisterComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import _ from 'lodash';
import { useParams } from 'react-router-dom';
import MetaData from '@/utils/MetaData';

const HomeworkList = () => {
  const {} = studentActions;

  const dispatch = useDispatch();
  const { studentId } = useParams();
  const {} = useSelector((state) => state.studentState);

  const [info, setInfo] = useState({});

  const fetchStudentDetailHandler = useCallback(async () => {}, [studentId]);

  return (
    <div>
      <MetaData title={`Admin Student Homework | EduExcellence `} />
    </div>
  );
};

export default memo(HomeworkList);
