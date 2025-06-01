import React, { memo, useCallback } from 'react';
import ModalV1 from '@/views/components/modal/ModalV1';
import { useDispatch, useSelector } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import slugify from 'slugify';

const CreateNotesModal = ({ info, setInfo }) => {
  const dispatch = useDispatch();
  const { boardsList } = useSelector((state) => state.boardState);
  const { createNewBoardAction, updateBoardAction } = builderActions;

  const validateSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'title must be at least 3 characters')
      .max(50, 'title cannot exceed 50 characters')
      .required('title name is required'),
    description: Yup.string().max(200, 'Description cannot exceed 200 characters'),
  });

  const formik = useFormik({
    initialValues: {
      title: info?.noteDetails?.title || '',
      description: info?.noteDetails?.description || '',
    },
    enableReinitialize: true,
    validationSchema: validateSchema,
    onSubmit: async (values) => {
      let json = {
        name: values?.name,
        description: values?.description,
      };

      if (info?.noteDetails) {
        await updateSubmitHandlerFunction(json);
      } else {
        await submitHandlerFunction(json);
      }
    },
  });
  const { errors, values, touched, handleChange, handleSubmit, handleBlur, resetForm } = formik;

  const submitHandlerFunction = async (json) => {
    // let response = await createNewBoardAction(json);
    // if (response[2] === 201) {
    //   let updateData = _.cloneDeep(boardsList);
    //   openCloseCreateModal(false);
    //   resetForm();
    // } else {
    //   toast.error(response[1]?.message || 'unable to add to a board');
    // }
  };

  const updateSubmitHandlerFunction = async (json) => {
    // let response = await updateBoardAction(info?.selectedBoardId, json);
    // if (response[0]) {
    //   let updateData = _.cloneDeep(boardsList)?.map((item) => {
    //     if (item._id === info?.selectedBoardId) {
    //       return response[1]?.data;
    //     } else {
    //       return item;
    //     }
    //   });
    //   openCloseCreateModal(false);
    //   resetForm();
    //   dispatch({ type: BOARD_LIST.update, payload: updateData });
    // } else {
    //   toast.error(response[1]?.message || 'unable to add to a board');
    // }
  };

  const closeModalFunction = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      openCreateModal: false,
      noteDetails: null,
    }));
  }, [info?.openCreateModal, info?.noteDetails]);

  return (
    <ModalV1
      isOpen={info?.openCreateModal}
      title={info?.noteDetails ? 'Update Notes' : 'Create New Notes'}
      onClose={closeModalFunction}
      size="small"
      maxHeight="fit-content"
    >
      <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium">
            Notes title *
          </Label>
          <Input
            id="title"
            placeholder="Enter board name"
            value={values?.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${errors.title ? 'border-red-500' : ''}`}
            readOnly={info?.isSubmitting}
          />
          {touched?.title && errors?.title && (
            <p className="text-sm text-red-500 mt-1">{errors?.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium">
            Notes slug *
          </Label>
          <Input
            id="slug"
            placeholder="Enter board name"
            value={slugify(values?.title, { lower: true, strict: true })}
            // onChange={handleChange}
            // onBlur={handleBlur}
            className={`${errors.slug ? 'border-red-500' : ''}`}
            readOnly={true}
            disabled={true}
          />
          {touched?.slug && errors?.slug && (
            <p className="text-sm text-red-500 mt-1">{errors?.slug}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="block text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter board description"
            rows={5}
            value={values?.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className="resize-none"
            readOnly={info?.isSubmitting}
          />
          <p className="text-sm text-muted-foreground">Optional description for your notes</p>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {info?.noteDetails ? (
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
                  'Create New Note'
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
                'Update Board'
              )}
            </Button>
          )}
        </div>
      </form>
    </ModalV1>
  );
};

export default memo(CreateNotesModal);
