import * as React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'react-native-paper';

const Headings = ({title, style, size = 18, type = 'regular', ...props}) => {
	const {fonts} = useTheme();
	return (
		<Text style={
			[{ fontFamily: fonts[type], fontSize: size },
			{ ...style }]}
			{...props}>
			{title}
		</Text >
	);
};

export default Headings;