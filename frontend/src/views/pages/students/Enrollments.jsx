import { Skeleton } from '@/components/ui/skeleton';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DataTableSkeleton = memo(({ numRows = 6, numCols = 5 }) => {
  return (
    <div className="rounded-md border overflow-hidden">
      {/* Table Header */}
      <div className="flex items-center h-12 px-4 bg-muted text-sm font-medium">
        {Array.from({ length: numCols }).map((_, i) => (
          <div key={i} className="w-full min-w-[100px]">
            <Skeleton className="h-5 w-3/4 rounded" />
          </div>
        ))}
      </div>

      {/* Table Body */}
      <div className="divide-y">
        {Array.from({ length: numRows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center h-16 px-4 text-sm gap-6">
            {Array.from({ length: numCols }).map((_, colIndex) => (
              <div key={colIndex} className="w-full min-w-[100px] py-2">
                <Skeleton className="h-4 w-full rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

const Enrollments = ({ info, setInfo }) => {
  const { enrollmentsList, enrollmentLoading } = useSelector((state) => state.studentState);

  const openCreateEnrollmentModalFunction = useCallback(() => {
    setInfo((prev) => ({ ...prev, registerEnrollmentModal: true }));
  }, [info?.registerEnrollmentModal]);

  const navigate = useNavigate();
  return !enrollmentLoading ? (
    <div className="container mx-auto py-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-6">Enrollments</h1>
        <Button onClick={openCreateEnrollmentModalFunction}>Add New Enrollment</Button>
      </div>
      <div className="space-y-4">
        {/* Table */}

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Subjects</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentsList?.docs?.length > 0 ? (
                enrollmentsList?.docs?.map((singleEnrollment) => (
                  <React.Fragment key={singleEnrollment?._id}>
                    <TableRow>
                      <TableCell className="font-medium">{singleEnrollment?.class}</TableCell>
                      <TableCell>{singleEnrollment?.batch?.name}</TableCell>
                      <TableCell>{singleEnrollment?.board?.name}</TableCell>
                      <TableCell>
                        {singleEnrollment?.subjects?.map((singleSubject, index) => (
                          <TableRow
                            key={`${singleEnrollment?._id}-subject-${index}`}
                            className="w-full"
                          >
                            <TableCell className="px-4 font-semibold :">
                              Subject {index + 1}
                            </TableCell>
                            <TableCell className="px-4">{singleSubject?.subjectId?.name}</TableCell>
                            <TableCell className="px-4">
                              {singleSubject?.chapters?.length} chapters
                            </TableCell>
                            <TableCell className="px-4">
                              <Button
                                onClick={() =>
                                  navigate(
                                    `${singleEnrollment?._id}/${singleSubject?.subjectId?._id}`
                                  )
                                }
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No Enrollment found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ) : (
    <DataTableSkeleton />
  );
};

export default memo(Enrollments);
