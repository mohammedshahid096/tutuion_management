import MetaData from '@/utils/MetaData';
import MainWrapper from '@/views/layouts/Mainwrapper';
import React, { memo, useCallback, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import AdminGenderGraph from '@/views/components/graphs/AdminGenderGraph';
import { useDispatch, useSelector } from 'react-redux';
import { graphActions } from '@/redux/combineActions';

const breadCrumbs = [{ label: 'Analytics', href: null }];

const AdminDashboard = () => {
  const { getAdminDashboardListAction } = graphActions;
  const dispatch = useDispatch();
  const { genderGraphData } = useSelector((state) => state.graphState);

  useEffect(() => {
    if (!genderGraphData) {
      fetchAdminDashboardGraphDataHandler();
    }
  }, []);

  const fetchAdminDashboardGraphDataHandler = useCallback(() => {
    dispatch(getAdminDashboardListAction());
  }, [genderGraphData]);
  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <MetaData title="Admin Dashboard | EduExcellence" />
      <div className=" space-y-8 p-2">
        {' '}
        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          <Card className=" w-fit">
            {' '}
            <AdminGenderGraph data={genderGraphData} />
          </Card>

          {/* <Card>
            <EventStatusBasedCount data={eventStatusBasedCount} />
          </Card> */}
        </div>
        {/* <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          <Card>
            <ExpenseStatusGraph data={expenseStatusGraph} />
          </Card>
          <Card>
            <ExpensePaymentGraph data={expensePaymentGraph} />
          </Card>
        </div>
        <div className="grid grid-cols-1">
          <Card>
            <ExpenseTypeBasedGraph data={expenseTypeGraph} />
          </Card>
        </div> */}
      </div>
    </MainWrapper>
  );
};

export default memo(AdminDashboard);
