import React, { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ColorPicker from '../../color-picker/ColorPicker';
import { getNumberFromPx } from '@/helpers/get-initials';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { builderActions } from '@/redux/combineActions';
import { Textarea } from '@/components/ui/textarea';

const ImageSettingsComp = ({ imageUrl, alt, style }) => {
  const dispatch = useDispatch();
  const { setTemplateDataAction } = builderActions;
  const { templateSections, activeSection } = useSelector((state) => state.builderToolkitState);

  const changeHandlerFunction = (value, property, isPx = false, px = 'px') => {
    console.log(value, property, isPx, 'shahid');
    let updatedTemplate = _.cloneDeep(templateSections);
    updatedTemplate?.forEach((section) => {
      let sectionId = section?.uuid;
      if (sectionId === activeSection?.section_uuid) {
        if (property === 'imageUrl') {
          section['block'][activeSection.block_index]['subBlock'][activeSection.sub_block_index][
            property
          ] = value;
        } else {
          section['block'][activeSection.block_index]['subBlock'][activeSection.sub_block_index][
            'style'
          ][property] = isPx ? value + px : value;
        }
      }
    });
    dispatch(setTemplateDataAction(updatedTemplate));
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="image-source">Image Source</Label>
        <div className="flex gap-2">
          <Input
            id="image-source"
            type="text"
            placeholder="Paste image URL"
            value={imageUrl || ''}
            onChange={(e) => changeHandlerFunction(e.target.value, 'imageUrl')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-width">Width</Label>
        <div className="flex items-center space-x-2">
          <Slider
            min={0}
            max={700}
            value={[style?.width === '100%' ? 0 : getNumberFromPx(style?.width) || 0]}
            onValueChange={(e) =>
              changeHandlerFunction(e[0] === 0 ? '100%' : e[0], 'width', e[0] === 0 ? false : true)
            }
          />
          <span className="w-12 text-center">{style?.width}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-height">Height</Label>
        <div className="flex items-center space-x-2">
          <Slider
            min={0}
            max={700}
            value={[style?.height === 'auto' ? 0 : getNumberFromPx(style?.height) || 0]}
            onValueChange={(e) =>
              changeHandlerFunction(e[0] === 0 ? 'auto' : e[0], 'height', e[0] === 0 ? false : true)
            }
          />
          <span className="w-12 text-center">{style?.height}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image-height">Border Radius</Label>
        <div className="flex items-center space-x-2">
          <Slider
            min={0}
            max={50}
            value={[getNumberFromPx(style?.borderRadius) || 0]}
            onValueChange={(e) => changeHandlerFunction(e[0], 'borderRadius', true, '%')}
          />
          <span className="w-12 text-center">{style?.borderRadius}</span>
        </div>
      </div>
    </>
  );
};

export default memo(ImageSettingsComp);
