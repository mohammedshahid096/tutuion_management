import ModalV2 from '@/views/components/modal/ModalV2';
import React, { memo, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { studentActions } from '@/redux/combineActions';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const createHomework = ({ info, setInfo, closeModalFunction }) => {
  const { assignNewHomeworkAction } = studentActions;
  const { studentId } = useParams();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required').min(2, 'Title is too short!'),
    description: Yup.string()
      .required('Description is required')
      .min(5, 'Description is too short!'),
  });

  const formik = useFormik({
    initialValues: {
      title: info?.title || '',
      description: info?.description || '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      submitAssignHomeworkFormHandler(values);
    },
  });
  const { errors, values, touched, handleChange, handleSubmit, handleBlur, resetForm } = formik;

  const submitAssignHomeworkFormHandler = useCallback(
    async (values) => {
      if (info?.isSubmitting) return;

      setInfo((prev) => ({ ...prev, isSubmitting: true }));
      let json = {
        title: values?.title,
        description: values?.description,
      };
      let updateInfoState = {
        loading: false,
      };
      const response = await assignNewHomeworkAction(studentId, json);
      if (response[2] === 201) {
        resetForm();
        closeModalFunction();
      } else {
        toast.error(response[1]?.message || 'unable to assign the home work');
      }

      setInfo((prev) => ({ ...prev, ...updateInfoState }));
    },
    [info?.isSubmitting]
  );

  return (
    <ModalV2
      isOpen={info?.openModal}
      title="Create New Homework"
      onClose={() => {
        resetForm();
        closeModalFunction();
      }}
    >
      <Card className="lg:col-span-2">
        <CardContent>
          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name" className="block text-sm font-medium">
                Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter the title"
                value={values?.title}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${touched?.title && errors?.title ? 'border-red-500' : ''}`}
                readOnly={info?.isSubmitting}
              />
              {touched?.title && errors?.title && (
                <p className="text-sm text-red-500 mt-1">{errors?.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="block text-sm font-medium">
                Description *
              </Label>
              <Textarea
                id="description"
                placeholder="Enter board description"
                rows={5}
                value={values?.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`resize-none ${
                  touched?.description && errors?.description ? 'border-red-500' : ''
                }`}
                readOnly={info?.isSubmitting}
              />
              {touched?.description && errors?.description && (
                <p className="text-sm text-red-500 mt-1">{errors?.description}</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {!info?.selectedBoardId ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={info?.isSubmitting || false}
                    onClick={resetForm}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={info?.isSubmitting || false}>
                    {info?.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create New Homework'
                    )}
                  </Button>
                </>
              ) : (
                <Button type="submit" disabled={info?.isSubmitting || false}>
                  {info?.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    'Update Homework'
                  )}
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </ModalV2>
  );
};

export default memo(createHomework);
