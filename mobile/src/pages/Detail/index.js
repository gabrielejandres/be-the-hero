import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; //redirecionamento
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

/* Importação de imagens */
import logoImg from '../../assets/logo.png'; //importa a logo com o melhor formato de acordo com a tela a ser utilizada

/* CSS */
import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute(); //pega a URL atual

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    /* Função para voltar à página anterior */
    function navigateBack() {
        navigation.goBack();
    }

    /* Função para abrir o e-mail */
    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            repipients: [incident.email],
            body: message,
        })
    }

    /* Função para abrir o wpp */
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}> 
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" /> 
                </TouchableOpacity>
            </View>
        
            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG: </Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO: </Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>VALOR: </Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
            
                <Text style={styles.heroDescription}> Entre em contato: </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}> WhatsApp </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}> E-mail </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}