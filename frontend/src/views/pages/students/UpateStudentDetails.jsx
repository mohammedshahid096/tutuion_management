import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const UpdateStudentDetails = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Profile Details</CardTitle>
        <CardDescription>
          Update your personal information and manage your profile settings.
        </CardDescription>
      </CardHeader>
      <CardContent>hello world</CardContent>
    </Card>
  );
};

export default memo(UpdateStudentDetails);
