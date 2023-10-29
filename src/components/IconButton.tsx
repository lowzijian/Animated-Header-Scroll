import React, {FC, PropsWithChildren} from 'react';
import {Text, View} from 'react-native';

const IconButton: FC<PropsWithChildren> = ({children}) => {
  return (
    <View
      style={{
        backgroundColor: 'blue',
        borderRadius: 12,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>{children}</Text>
    </View>
  );
};

export default IconButton;
