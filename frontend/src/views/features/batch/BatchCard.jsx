import { memo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

const BatchCard = ({ board }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold">{board.name}</CardTitle>
              <CardDescription className="mt-1">
                {moment(board.startDate).format('MMM d, yyyy')} -{' '}
                {moment(board.endDate).format('MMM d, yyyy')}
              </CardDescription>
            </div>
            <Badge variant={board.isActive ? 'default' : 'secondary'}>
              {board.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Created By</p>
              <p>{board.createdBy.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Updated By</p>
              <p>{board.updatedBy.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Created At</p>
              <p>{moment(board.createdAt).format('MMM d, yyyy h:mm a')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Updated At</p>
              <p>{moment(board.updatedAt).format('MMM d, yyyy h:mm a')}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default memo(BatchCard);
