import React, { memo, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ButtonSettingsComp from '../elementSettings/ButtonSettingsComp';
import TextSettingsComp from '../elementSettings/TextSettingsComp';
import EditorSettingsComp from '../elementSettings/EditorSettingsComp';
import ImageSettingsComp from '../elementSettings/ImageSettingsComp';
import DividerSettingsComp from '../elementSettings/DividerSettingsComp';
import VideoSettingsComp from '../elementSettings/VideoSettingsComp';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { builderActions } from '@/redux/combineActions';

const elementTypesConstants = {
  button: ButtonSettingsComp,
  text: TextSettingsComp,
  editor: EditorSettingsComp,
  image: ImageSettingsComp,
  divider: DividerSettingsComp,
  video: VideoSettingsComp,
};

const ElementControls = memo(() => {
  const dispatch = useDispatch();
  const { setTemplateDataAction, setActiveSectionAction } = builderActions;
  const { templateSections, activeSection } = useSelector((state) => state.builderToolkitState);

  const onDelete = useCallback(() => {
    if (
      !activeSection?.section_uuid ||
      !activeSection?.block_uuid ||
      !activeSection?.sub_block_uuid
    )
      return;

    const sectionId = activeSection.section_uuid;
    const blockId = activeSection.block_uuid;
    const subBlockId = activeSection.sub_block_uuid;

    const updatedSections = templateSections.map((section) => {
      if (section.uuid === sectionId) {
        return {
          ...section,
          block: section.block.map((block) => {
            if (block.uuid === blockId) {
              return {
                ...block,
                subBlock: block.subBlock.filter((subBlock) => subBlock.uuid !== subBlockId),
              };
            }
            return block;
          }),
        };
      }
      return section;
    });

    const updatedActiveSection = _.cloneDeep(activeSection);
    updatedActiveSection.sub_block_uuid = null;

    // Dispatch the updated sections to the store
    dispatch(setTemplateDataAction(updatedSections));
    dispatch(setActiveSectionAction(updatedActiveSection));
  }, [templateSections, activeSection]);

  return (
    <div className="flex  justify-end gap-2">
      {/* Delete */}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Move Up */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Move up</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Move Down */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Move down</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
});

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
    <>
      <div className="mb-1">{ActiveComponent && <ElementControls />}</div>

      <Card>
        <CardHeader>
          <CardTitle>{elementDetails?.label} Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {ActiveComponent && <ActiveComponent {...elementDetails} />}
        </CardContent>
      </Card>
    </>
  );
};

export default memo(ElementSettings);
