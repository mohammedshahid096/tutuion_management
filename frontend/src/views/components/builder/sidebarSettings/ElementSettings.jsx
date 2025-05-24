import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useSelector } from 'react-redux';
import _ from 'lodash';
import ButtonSettingsComp from '../elementSettings/ButtonSettingsComp';
import TextSettingsComp from '../elementSettings/TextSettingsComp';

const elementTypesConstants = {
  button: ButtonSettingsComp,
  text: TextSettingsComp,
};

const ElementSettings = () => {
  const { templateSections, activeSection } = useSelector((state) => state.builderToolkitState);

  const elementDetails = useMemo(() => {
    let sectionId = activeSection?.section_uuid;
    let activeBlockId = activeSection?.block_uuid;
    let activeSubBlockId = activeSection?.sub_block_uuid;
    let layout = templateSections?.find((item) => item?.uuid === sectionId) || {};
    let activeBlock = layout?.block?.find((item) => item?.uuid === activeBlockId);
    let activeSubBlock = activeBlock?.subBlock?.find((item) => item?.uuid === activeSubBlockId);
    return activeSubBlock;
  }, [activeSection, templateSections]);

  const ActiveComponent = useMemo(() => {
    return elementTypesConstants[elementDetails?.type.toLowerCase()] ?? null;
  }, [activeSection, elementDetails?.type]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{elementDetails?.label} Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {ActiveComponent && <ActiveComponent {...elementDetails} />}
      </CardContent>
    </Card>
  );
};

export default ElementSettings;
