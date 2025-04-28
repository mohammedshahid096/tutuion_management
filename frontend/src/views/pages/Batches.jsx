import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import MainWrapper from '../layouts/Mainwrapper';
import BatchesList from '../features/batch/BatchesList';

const breadCrumbs = [{ label: 'Batches', href: null }];
const Batches = () => {
  return (
    <MainWrapper breadCrumbs={breadCrumbs}>
      <BatchesList />
    </MainWrapper>
  );
};

export default memo(Batches);
