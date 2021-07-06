import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {Mic} from 'assets';
import styles from './style';
import Voice from '@react-native-voice/voice';
import {translate} from 'locale';
import {Label, LabelVariant} from 'components/elements';

const VoiceNote = ({}) => {
  const [value, setValue] = useState('');
  const [started, setStarted] = useState('');
  const [recognized, setRecognized] = useState('');
  const [result, setResult] = useState([]);

  const onChangeText = e => {
    setValue(e);
  };

  Voice.onSpeechStart = e => {
    setStarted('√');
  };
  Voice.onSpeechRecognized = e => {
    setRecognized('√');
  };
  Voice.onSpeechResults = e => {
    setResult(e.value);
    value(e.value[0]);
  };
  const startRecognition = async e => {
    setStarted('');
    setRecognized('');
    setResult([]);
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };
  const renderVoiceNote = () => {
    return (
      <>
        <View style={styles.label}>
          <Label variant={LabelVariant.h2} title={translate('note.title')} />
        </View>
        <View style={styles.mainView}>
          <TextInput
            multiline={true}
            style={styles.transcript}
            onChangeText={onChangeText}
            placeholder={translate('note.placeholder')}>
            {value}
          </TextInput>
          <TouchableOpacity style={styles.image} onPress={startRecognition}>
            <Mic height={35} width={35} />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return <View>{renderVoiceNote()}</View>;
};

export default VoiceNote;
