import React, {useEffect, useState} from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { View ,FlatList, Image, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api'
import logo from '../../assets/logo.png';
import styles from './styles'

export default function Incidents() {
    const [incs,setIncs] = useState([]);
    const [totalIncs,setTotalIncs] = useState(0);
    const [page,setPage] = useState(1);
    const [isLoading,setIsLoading] = useState(0);
    const navigation = useNavigation(false);

    function navigateToDetail(inc) {
        navigation.navigate('Detail', { inc });
    }

    async function loadIncidents() {
        if (isLoading)
            return;
        
        if (totalIncs > 0
            && incs.length === totalIncs)
            return;

        setIsLoading(true)

        const resp = await api.get('incident', {
            params : {
                page : page
            }
        });

        setIncs([...incs,...resp.data])
        setPage(page + 1);
        setTotalIncs(resp.headers['x-total-count'])

        setIsLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total of <Text style={styles.headerTextBold}>{totalIncs} Cases </Text>
                </Text>
            </View>

            <Text style={styles.title}>
                Welcome!
            </Text>
            <Text style={styles.description}>
                Choose one and save the day!!!
            </Text>

            <FlatList style={styles.incidentList}
                data={incs}
                keyExtractor={inc => String(inc.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item : inc}) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>
                            ONG:
                    </Text>
                        <Text style={styles.incidentValue}>
                            {inc.name}
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

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(inc)}>
                            <Text style={styles.detailsButtonText}>
                                View More Details
                            </Text>
                            <Feather name="arrow-right" size={16} color='#E02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />

        </View>
    )
} 
