import React, { memo, useCallback, useEffect, useState } from 'react';
import ModalV1 from '@/views/components/modal/ModalV1';
import { useSelector, useDispatch } from 'react-redux';
import { subjectActions } from '@/redux/combineActions';
import { Checkbox } from '@/components/ui/checkbox';
import _ from 'lodash';
import { Label } from '@/components/ui/label';

const AddNewEnrollment = ({ studentId, info, setInfo, batches, studentDetails }) => {
  const dispatch = useDispatch();
  const { getPublicSubjectsListAction } = subjectActions;

  const { publicSubjectsList } = useSelector((state) => state.subjectState);
  const { enrollmentsList } = useSelector((state) => state.studentState);

  const [currentDetails, setCurrentDetails] = useState({
    activeBatch: '',
  });

  useEffect(() => {
    if (
      info?.registerEnrollmentModal === true &&
      batches &&
      (!publicSubjectsList || publicSubjectsList?.boardType !== studentDetails?.boardType?._id)
    ) {
      let query = {
        boardType: studentDetails?.boardType?._id,
        classRoom: studentDetails?.class,
        batch: _.find(batches, { isActive: true })?._id,
      };
      fetchSubjectsListHandler(query);
    }
  }, [studentId, info?.registerEnrollmentModal]);

  useEffect(() => {
    if (batches) {
      setCurrentDetails((prev) => ({
        ...prev,
        activeBatch: _.find(batches, { isActive: true }),
      }));
    }
  }, [batches]);

  const closeModalFunction = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      registerEnrollmentModal: false,
    }));
  }, [info?.registerEnrollmentModal]);

  const fetchSubjectsListHandler = useCallback(
    async (query) => {
      dispatch(getPublicSubjectsListAction(query));
    },
    [publicSubjectsList]
  );

  const batchChangeHandler = async (e) => {
    let query = {
      boardType: studentDetails?.boardType?._id,
      classRoom: studentDetails?.class,
      batch: e.target.value,
    };
    fetchSubjectsListHandler(query);
    setCurrentDetails((prev) => ({
      ...prev,
      activeBatch: _.find(batches, { _id: e.target.value }),
    }));
  };

  return (
    <ModalV1
      isOpen={info?.registerEnrollmentModal}
      onClose={closeModalFunction}
      title="Add New Enrollment"
      size="small"
      maxHeight="fit-content"
    >
      <div className="container py-4">
        <div>Class : {studentDetails?.class}</div>
        <div>Board : {studentDetails?.boardType?.name}</div>
        <div>Batch : {currentDetails?.activeBatch?.name}</div>

        <div className="my-4">
          <Label>Select Batch</Label>
          <select
            id="countries"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={currentDetails?.activeBatch?._id}
            onChange={batchChangeHandler}
          >
            <option disabled>Select Batch</option>
            {batches &&
              enrollmentsList &&
              batches?.map((singleBatch) => (
                <option
                  value={singleBatch?._id}
                  selected={currentDetails?.activeBatch?._id === singleBatch?._id}
                  disabled={
                    _.some(
                      enrollmentsList?.docs,
                      (item) => item?.batch?._id === singleBatch?._id
                    ) || false
                  }
                >
                  {singleBatch?.name}
                </option>
              ))}
          </select>
        </div>
        <div className="grid gap-2 md:col-span-2 mt-2">
          <Label>Select Subjects :</Label>
          <div className="flex flex-wrap gap-4">
            {publicSubjectsList &&
              publicSubjectsList?.docs?.[studentDetails?.class]?.map((singleSubject) => (
                <div key={singleSubject?._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`singleBatch-${singleSubject?._id}`}
                    //   checked={values?.days[day]}
                    //   onCheckedChange={(checked) => setFieldValue(`days.${day}`, checked)}
                    //   disabled={info?.isSubmitting}
                    //   readOnly={info?.isReadOnly}
                  />
                  <Label htmlFor={`singleBatch-${singleSubject?._id}`} className="capitalize">
                    {singleSubject?.name}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </ModalV1>
  );
};

export default memo(AddNewEnrollment);
