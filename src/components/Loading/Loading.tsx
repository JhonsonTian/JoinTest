import React from 'react';
import { Overlay } from 'react-native-elements';
import { ActivityIndicator } from 'react-native';
import { styles } from './styles';

type Props = {
   show: boolean;
   color?: string;
};

export const Loading: React.FC<Props> = ({ show = false, color = 'white' }) => {
   return (
      <Overlay isVisible={show} overlayStyle={styles.overlayStyle}>
         <ActivityIndicator size="large" color={color} />
      </Overlay>
   );
};
