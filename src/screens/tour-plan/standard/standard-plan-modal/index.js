import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import { Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button} from 'components/elements';
import {Area, DoctorDetails} from 'components/elements';
import styles from './styles';

const StandardPlanModal = ({visible, hideModal}) => {

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <View style={styles.container}>
              <View style={styles.modalHeader}>
                <View>
                    <Text>Select doctors and Chemist</Text>                  
                </View>
                <View>
                    <Text>sf</Text>
                </View>
                <View style={styles.headerButtonGroup}>
                <Button
                        mode="outlined"
                        title="Close"
                        uppercase={true}
                        contentStyle={styles.closeBtn}
                    />
                    <Button
                        mode="contained"
                        title="Done"
                        uppercase={true}
                        contentStyle={styles.doneBtn}
                    />
                </View>
              </View>
              <View style={styles.content}>
                    <View style={styles.leftContent}>
                        <View style={styles.selectAreaContainer}>
                            <View>
                                <Text>Select Area</Text>
                            </View>
                            <View style={styles.areaFilterContainer}>
                                <Area 
                                    title={'Noida sec 1'} 
                                    bgColor={'#524F670D'} 
                                    color={'#524F67'}
                                    selectedColor={'#322B7C1A'}
                                    selected={true}
                                    selectedTextColor={'#322B7C'}
                                />
                                <Area 
                                    title={'Noida sec 1'} 
                                    bgColor={'#524F670D'} 
                                    color={'#524F67'}
                                />
                            </View>
                        </View>
                        <View style={styles.doctorDetailsContainer}>
                            <View>
                                <Text>Select Visit</Text>
                                <View>
                                    <DoctorDetails title={"Dr Harish"}/>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightContent}>
                        <Text>Plan Compliance</Text>
                    </View> 
              </View>
          </View>
        </Modal>
    )
}

export default StandardPlanModal;