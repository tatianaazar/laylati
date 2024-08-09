import React from 'react';
import { SvgProps } from 'react-native-svg';

interface TabBarIconProps {
  IconComponent: React.FC<SvgProps>;
  color: string;
  size: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ IconComponent, color, size }) => {
  return <IconComponent width={size} height={size} fill="none" stroke={color} />;
};

export default TabBarIcon;
