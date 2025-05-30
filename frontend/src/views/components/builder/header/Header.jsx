import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { builderActions } from '@/redux/combineActions';
import { set } from 'lodash';

const BuilderHeader = () => {
  const dispatch = useDispatch();
  const { setScreenSizeAction, setActiveSectionAction } = builderActions;
  const { screenSize } = useSelector((state) => state.builderToolkitState);

  const changeScreenSizeHandler = useCallback(
    (type) => {
      dispatch(setScreenSizeAction(type));
      dispatch(setActiveSectionAction(null));
    },
    [screenSize]
  );

  return (
    <div className="p-4 shadow-sm flex justify-center items-center">
      <div>
        <Button
          variant="ghost"
          className={`${screenSize === 'desktop' && 'bg-green-300 hover:bg-green-300'}`}
          onClick={() => changeScreenSizeHandler('desktop')}
        >
          <Monitor />
          Desktop
        </Button>

        <Button
          variant="ghost"
          className={`${screenSize === 'mobile' && 'bg-green-300 hover:bg-green-300'}`}
          onClick={() => changeScreenSizeHandler('mobile')}
        >
          <Smartphone />
          Mobile
        </Button>
      </div>
    </div>
  );
};

export default memo(BuilderHeader);
