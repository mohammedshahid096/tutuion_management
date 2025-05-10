import React, { memo, useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import _ from 'lodash';

const AdminMarkAttendanceComponent = ({
  classRooms,
  data,
  info,
  filterChangeHandlerFunction,
  navigateToStudentDetails,
}) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Day Wise Attendance Mark Sheet</h1>
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-10"
              value={info?.name}
              onChange={(e) => {
                filterChangeHandlerFunction('name', e.target.value);
              }}
            />
          </div>

          <Select
            value={info?.classRoom}
            onValueChange={(value) => filterChangeHandlerFunction('classRoom', value)}
            // disabled={info?.isSubmitting}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {info?.classRoom && <SelectItem value={'all'}>All </SelectItem>}
              {classRooms?.map((grade) => (
                <SelectItem key={grade} value={grade.toString()}>
                  Class {grade}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={() => filterChangeHandlerFunction('reset', null)}>Reset </Button>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Attendance</TableHead>
                {/* <TableHead>Actions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.docs?.length > 0 ? (
                data?.docs?.map((singleAttendance) => (
                  <TableRow key={singleAttendance?._id}>
                    <TableCell className="font-medium">{singleAttendance?.name}</TableCell>
                    <TableCell>{singleAttendance?.class}</TableCell>

                    {/* <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => navigateToStudentDetails(student)}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2"
                            onClick={() => navigateToStudentAttendanceList(student)}
                          >
                            <List className="h-4 w-4" />
                            Attendance
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell> */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No Live found Today.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminMarkAttendanceComponent);
