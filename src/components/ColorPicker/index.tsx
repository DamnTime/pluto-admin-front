import React from 'react';
import { SketchPicker } from 'react-color';

interface IColorPicker {
  value?: string;
  onChange?: (str: string) => void;
}

const ColorPicker = (props: IColorPicker) => {
  const { value = '#22194D', onChange, ...rest } = props;

  const onChangeComplete = (values: any) => {
    const { hex } = values;
    onChange && onChange(hex);
  };

  const colorPickerProps = {
    color: value,
    onChangeComplete,
    ...rest,
  };

  return <SketchPicker {...colorPickerProps} width="300px" />;
};

export default ColorPicker;
