import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import MetaData from '@/utils/MetaData';
import CreateNotesModal from '@/views/features/builder/notes/CreateNotesModal';
import MainWrapper from '@/views/layouts/Mainwrapper';

const breadCrumbs = [{ label: 'Notes', href: null }];
const NotesList = () => {
  const [info, setInfo] = useState({
    openCreateModal: false,
    isSubmitting: false,
    noteDetails: null,
  });

  const openCreateNoteModalFunction = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      openCreateModal: true,
      noteDetails: {
        title: '',
        description: '',
      },
    }));
  }, [info?.noteDetails, info?.openCreateModal]);
  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <MetaData title="Notes | EduExcellence" />

      <div className="flex justify-end">
        <Button onClick={openCreateNoteModalFunction}>Add New Notes</Button>
      </div>

      <CreateNotesModal info={info} setInfo={setInfo} />
    </MainWrapper>
  );
};

export default NotesList;
