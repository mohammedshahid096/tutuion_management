import React, { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MetaData from '@/utils/MetaData';
import CreateNotesModal from '@/views/features/builder/notes/CreateNotesModal';
import MainWrapper from '@/views/layouts/Mainwrapper';
import { useDispatch, useSelector } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import CustomTable1 from '@/views/components/tables/TableV1';
import moment from 'moment';
import { format } from 'timeago.js';

const breadCrumbs = [{ label: 'Notes', href: null }];
const headers = [
  { title: 'Title', key: 'title' },
  { title: 'Description', key: 'description' },
];

const NotesList = () => {
  const { fetchNotesAction } = builderActions;
  const dispatch = useDispatch();
  const { notesList, loading } = useSelector((state) => state.builderToolkitState);

  const [info, setInfo] = useState({
    openCreateModal: false,
    isSubmitting: false,
    noteDetails: null,
    loading: true,
    limit: 20,
    currentPage: 1,
  });

  useEffect(() => {
    if (!notesList && notesList?.currentPage !== 1) {
      fetchNotesListHandler();
    }
  }, []);

  const fetchNotesListHandler = useCallback(
    async (queryObject) => {
      let query = {
        page: queryObject?.currentPage ?? info?.currentPage,
        limit: queryObject?.limit ?? info?.limit,
      };
      dispatch(fetchNotesAction(query));
    },
    [notesList, info?.currentPage, info?.limit]
  );

  const paginationFunctionHandler = useCallback(
    (currentPage) => {
      let update = { currentPage };
      setInfo((prev) => ({ ...prev, ...update }));
      fetchNotesListHandler(update);
    },
    [info?.page]
  );

  const openCreateNoteModalFunction = useCallback(() => {
    setInfo((prev) => ({
      ...prev,
      openCreateModal: true,
    }));
  }, [info?.noteDetails, info?.openCreateModal]);

  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <MetaData title="Notes | EduExcellence" />

      <div className="flex justify-end">
        <Button onClick={openCreateNoteModalFunction}>Add New Notes</Button>
      </div>

      <div>
        <CustomTable1
          headers={headers}
          docs={notesList?.docs?.map((singleData) => ({
            ...singleData,
            date: moment(singleData?.createdAt).format('LL'),
            timeAgo: format(singleData?.createdAt),
          }))}
          cardTitle="Notes List Data"
          loading={loading}
          totalPages={notesList?.totalPages}
          currentPage={notesList?.currentPage}
          onPageChange={paginationFunctionHandler}
        />
      </div>

      <CreateNotesModal info={info} setInfo={setInfo} />
    </MainWrapper>
  );
};

export default NotesList;
