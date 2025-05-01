import React, { useEffect, useCallback, memo, useState } from 'react';
import MainWrapper from '../../layouts/Mainwrapper';
import { useSelector, useDispatch } from 'react-redux';
import { batchActions, boardActions, studentActions } from '@/redux/combineActions';
import StudentRegistrationForm from '@/views/features/students/RegisterComponent';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import moment from 'moment';

const breadCrumbs = [{ label: 'Batches', href: null }];
const classRooms = Array.from({ length: 12 }, (_, i) => i + 1); // 1 to 12

const RegisterStudent = () => {
  const { getBatchesListAction } = batchActions;
  const { getBoardsListAction } = boardActions;
  const { registerNewStudentAction } = studentActions;

  const dispatch = useDispatch();
  const { batchesList } = useSelector((state) => state.batchState);
  const { boardsList } = useSelector((state) => state.boardState);

  const [info, setInfo] = useState({
    loading: true,
    showPassword: false,
    isSubmitting: false,
  });

  useEffect(() => {
    if (!batchesList) {
      fetchBatchesListHandler();
    }

    if (!boardsList) {
      fetchBoardsListHandler();
    }

    // setInfo((prev) => ({
    //   ...prev,
    //   isSubmitting: false,
    // }));
  }, []);

  useEffect(() => {
    if (batchesList && boardsList) {
      setInfo((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  }, [boardsList, batchesList]);

  const validateSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase, one lowercase, one number and one special character'
      ),
    gender: Yup.string().required('Gender is required'),
    fatherName: Yup.string().required("Father's name is required"),
    motherName: Yup.string().required("Mother's name is required"),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),
    address: Yup.string().required('Address is required'),
    dateOfBirth: Yup.date().required('Date of birth is required'),
    classRoom: Yup.number().required('Class is required'),
    school: Yup.string().required('School is required'),
    boardType: Yup.string().required('Board type is required'),
    timings: Yup.object({
      start: Yup.string().required('Start time is required'),
      end: Yup.string().required('End time is required'),
    }),
    dateOfJoining: Yup.date().required('Date of joining is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: 'Test@123',
      gender: 'female',
      fatherName: '',
      motherName: '',
      phone: '',
      address: '',
      dateOfBirth: null,
      classRoom: '',
      school: '',
      boardType: '',
      timings: {
        start: '',
        end: '',
      },
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      dateOfJoining: null,
    },
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      await registerNewStudentDetailsHandler(values);
    },
  });

  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    resetForm,
    handleBlur,
    setFieldValue,
  } = formik;

  const fetchBatchesListHandler = useCallback(async () => {
    dispatch(getBatchesListAction());
  }, [batchesList]);

  const fetchBoardsListHandler = useCallback(async () => {
    dispatch(getBoardsListAction());
  }, [boardsList]);

  const registerNewStudentDetailsHandler = async (details) => {
    setInfo((prev) => ({
      ...prev,
      isSubmitting: true,
    }));

    // Format dates to ISO string
    const payload = {
      ...details,
      dateOfBirth: moment(details.dateOfBirth).utc().format(),
      dateOfJoining: moment(details.dateOfJoining).utc().format(),
      timings: {
        start: moment(details.timings.start, 'HH:mm').format(),
        end: moment(details.timings.end, 'HH:mm').format(),
      },
    };

    const response = await registerNewStudentAction(payload);
    if (response[2] === 201) {
      toast.success(response[1]?.message || 'successfully student is registered');
      resetForm();
    } else {
      toast.success(response[1]?.message || 'student is not registered try again later');
    }

    setInfo((prev) => ({
      ...prev,
      isSubmitting: false,
    }));
  };

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <StudentRegistrationForm
        errors={errors}
        values={values}
        touched={touched}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        info={info}
        setInfo={setInfo}
        classRooms={classRooms}
        boardTypes={boardsList}
      />
    </MainWrapper>
  );
};

export default memo(RegisterStudent);
