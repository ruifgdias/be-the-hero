import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer'
import logo from '../../assets/logo.png';
import styles from './styles'

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const inc = route.params.inc;
    const message =`Hello ${inc.name}, i want to help in ${inc.title}`;

    function goBack() {
        navigation.goBack();
    }
    function sendMail() {
        MailComposer.composeAsync({
            subject : `Hero of: ${inc.title}`,
            recipients: [inc.email],
            body: message
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${inc.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />

                <TouchableOpacity
                    onPress={goBack}
                >
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>

            </View>


            <View style={styles.incident}>
                    <Text style={styles.incidentProperty , { marginTop: 0 }}>
                            ONG:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {inc.name} - {inc.city}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            Case:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {inc.title}
                        </Text>

                        <Text style={styles.incidentProperty}>
                            Value:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-PR', {
                                style: 'currency',
                                currency: 'EUR'
                            })
                                .format(inc.value)}
                        </Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>
                    Save the day!
                    </Text>
                <Text style={styles.heroTitle}>
                    Be the hero of this case.
                    </Text>
                <Text style={styles.heroDescription}>
                    Get in Touch!
                    </Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}>
                            WhatsApp a
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}
                    >
                        <Text style={styles.actionText}>
                            E-Mail a
                            </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
} 
