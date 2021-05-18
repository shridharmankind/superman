import React from 'react';
import {View, Text} from 'react-native';
import { Modal } from 'react-native-paper';
import PropTypes from 'prop-types';
import {Button} from 'components/elements';
import {Area, DoctorDetails} from 'components/elements';
import themes from 'themes'
import { Strings } from 'common'
import styles from './styles';

const StandardPlanModal = ({visible, hideModal}) => {

    return(
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <View style={styles.container}>
              <View style={styles.modalHeader}>
                <View>
                    <Text>{Strings.selectDoctorAndChemist}</Text>                  
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
                        onPress={() => hideModal()}
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
                                <Text>{Strings.selectArea}</Text>
                            </View>
                            <View style={styles.areaFilterContainer}>
                                <Area 
                                    title={'Noida sec 1'} 
                                    bgColor={'#524F670D'} 
                                    color={'#524F67'}
                                    selectedColor={'#322B7C1A'}
                                    selected={true}
                                    selectedTextColor={themes.colors.primary}
                                    style={{marginRight:20}}
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
                                <View style={styles.doctorDetailsHeader}>
                                    <View>
                                        <Text>{Strings.selectVisit}</Text>
                                    </View>
                                    <View style={styles.categoryFilterContainer}>
                                        <Area 
                                            title={'All'} 
                                            bgColor={'#524F670D'} 
                                            color={'#524F67'}
                                            selectedColor={themes.colors.primary}
                                            selected={true}
                                            selectedTextColor={themes.colors.white}
                                        />
                                        <Area 
                                            title={'Doctor'} 
                                            bgColor={themes.colors.white} 
                                            color={'#524F67'}
                                        />
                                        <Area 
                                            title={'Chemist'} 
                                            bgColor={themes.colors.white} 
                                            color={'#524F67'}
                                        />
                                    </View>
                                </View>
                                <View style={styles.doctorDetailsContainer}>
                                    <Text>Noida Sec 1</Text>
                                    <View style={styles.doctorDetails}>
                                        <DoctorDetails 
                                            title={"Dr Harish"}
                                            specialization={"Cardiologist"}
                                            category={"KYC"}                                            
                                            selected={true}
                                            testID={''}
                                        />
                                        <DoctorDetails title={"Dr Harish"}/>
                                        <DoctorDetails title={"Dr Harish"}/>
                                        <DoctorDetails title={"Dr Harish"}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.rightContent}>

                        <Text>{Strings.planCompliance}</Text>
                    </View> 
              </View>
          </View>
        </Modal>
    )
}

StandardPlanModal.defaultProps = {
    visible: false,
    hideModal:() => {}
}

StandardPlanModal.propsTypes = {
    visible: PropTypes.bool,
    hideModal: PropTypes.func
}

export default StandardPlanModal;