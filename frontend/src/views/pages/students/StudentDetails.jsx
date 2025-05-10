import React, { memo, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Mainwrapper from '@/views/layouts/Mainwrapper';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useParams, useNavigate } from 'react-router-dom';
import RegisterStudent from '@/views/pages/students/RegisterStudent';
import UpdateStudentDetails from './UpateStudentDetails';
import AttendanceList from './AttendanceList';
import Enrollments from './Enrollments';

const menuItems = [
  {
    id: 'student-profile',
    label: 'Student Profile',
    breadCumbs: [
      { label: 'Student Details', href: null },
      { label: 'Profile', href: null },
    ],
  },
  {
    id: 'student-enrollments',
    label: 'Student Enrollments',
    breadCumbs: [
      { label: 'Student Details', href: null },
      { label: 'Enrollments', href: null },
    ],
  },
  {
    id: 'student-attendance',
    label: 'Student Attendance',
    breadCumbs: [
      { label: 'Student Details', href: null },
      { label: 'Attendance', href: null },
    ],
  },
];

const settingsMenuMapper = {
  'student-profile': UpdateStudentDetails,
  'student-enrollments': Enrollments,
  'student-attendance': AttendanceList,
};

const StudentDetails = () => {
  const { studentId, pageType } = useParams();
  const navigate = useNavigate();
  const ComponentRender = useMemo(
    () => settingsMenuMapper[pageType] || settingsMenuMapper['student-profile'],
    [pageType]
  );
  const breadCumbs = useMemo(() => {
    let current = menuItems.find((item) => item.id === pageType);
    return current?.breadCumbs || menuItems[0].breadCumbs;
  }, [pageType]);

  const handleTabChange = useCallback(
    (id) => {
      navigate(`/admin/student-details/${studentId}/${id}`);
    },
    [pageType]
  );

  return (
    <Mainwrapper breadCrumbs={breadCumbs}>
      <div className="flex gap-6">
        <div className="flex flex-col gap-6  w-4/5">
          <ComponentRender />
        </div>

        <div className="sticky w-1/5 top-4">
          <Card className=" bg-white dark:bg-gray-800 p-4 border-r dark:border-gray-700">
            <h2 className="text-lg font-medium mb-4">Settings</h2>
            <div className="max-h-[calc(100vh-100px)] overflow-y-auto pr-2">
              <nav className="flex flex-col space-y-1">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={studentId === item.id ? 'secondary' : 'ghost'}
                    className={`justify-start text-left ${
                      'profile' === item.id ? 'font-medium bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                    onClick={() => handleTabChange(item.id)}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </Card>
        </div>
      </div>
    </Mainwrapper>
  );
};

export default memo(StudentDetails);
