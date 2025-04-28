import { useState, memo, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import BatchCard from './BatchCard';
import BatchSkeleton from './BatchSkeleton';
import { useSelector } from 'react-redux';

const BatchesList = ({ info, setInfo }) => {
  const { loading, batchesList } = useSelector((state) => state.batchState);

  const filteredBoards = useMemo(() => {
    let results = batchesList?.filter((board) =>
      board.name.toLowerCase().includes(info?.searchTerm.toLowerCase())
    );
    return results;
  }, [info?.searchTerm, batchesList]);

  const filterBoardListHandleChange = useCallback(
    (e) => {
      setInfo((prev) => ({
        ...prev,
        searchTerm: e?.target?.value || '',
      }));
    },
    [info?.searchTerm]
  );

  return (
    <div className="container py-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Batches</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Input
            placeholder="Search batch..."
            className="w-full md:w-64"
            value={info?.searchTerm}
            onChange={filterBoardListHandleChange}
          />
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Add New Board
          </Button>
        </div>
      </div>

      {loading ? (
        <BatchSkeleton />
      ) : filteredBoards?.length > 0 ? (
        filteredBoards?.map((singleBoard) => (
          <BatchCard board={singleBoard} key={singleBoard?._id} />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">
            {info?.searchTerm ? 'No matching boards found' : 'No boards available'}
          </p>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create New Board
          </Button>
        </div>
      )}
    </div>
  );
};
export default memo(BatchesList);

{
  /* <div className="flex justify-center items-center h-64">
<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
</div> */
}
