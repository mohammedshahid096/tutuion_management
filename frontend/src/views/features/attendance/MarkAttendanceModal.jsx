import React, { memo, useCallback } from 'react';
import ModalV1 from '@/views/components/modal/ModalV1';
import { Label } from '@radix-ui/react-dropdown-menu';
import moment from 'moment';

const MarkAttendanceModal = ({ info, setInfo }) => {
  const closeModalFunction = useCallback(() => {
    setInfo((prev) => ({ ...prev, isOpen: false, selectedAttendance: null }));
  }, [info?.isOpen]);

  return (
    <ModalV1
      title="Mark Attendance"
      isOpen={info?.isOpen}
      onClose={closeModalFunction}
      size="small"
      maxHeight="fit-content"
    >
      <div className="py-4 space-y-4">
        <div className="flex gap-4">
          <Label htmlFor="attendance-id">Attendance ID :</Label>
          <p id="attendance-id">{info?.selectedAttendance?._id || 'N/A'}</p>
        </div>

        <div className="flex gap-4">
          <Label htmlFor="student-name">Student Name :</Label>
          <p id="student-name">{info?.selectedAttendance?.student?.name || 'N/A'}</p>
        </div>

        <div className="grid grid-cols-3">
          <div className="flex gap-4">
            <Label htmlFor="class">Class :</Label>
            <p id="class">{info?.selectedAttendance?.class || 'N/A'}</p>
          </div>

          <div className=" flex gap-4 col-span-2">
            <Label htmlFor="date">Date :</Label>
            <p id="date">{moment(info?.selectedAttendance?.startDate).format('LLL') || 'N/A'}</p>
          </div>
        </div>
      </div>
      <div>
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select Subject
        </label>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a subject</option>
          {info?.selectedAttendance?.enrollment?.subjects?.map((singleSubject) => (
            <option value={singleSubject?.subjectId?._id}>{singleSubject?.subjectId?.name}</option>
          ))}
        </select>
      </div>
    </ModalV1>
  );
};

export default MarkAttendanceModal;
