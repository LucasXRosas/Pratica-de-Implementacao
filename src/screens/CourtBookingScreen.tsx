import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

interface FormErrors {
  name?: string;
  courtType?: string;
  bookingDate?: string;
}

interface BookingFormData {
  applicantName: string;
  courtType: string;
  bookingDate: string;
  emailNotifications: boolean;
  submissionStatus: string;
  timestamp: string;
}

export default function CourtBookingScreen() {
  const [loading, setLoading] = useState<boolean>(true);

  const [name, setName] = useState<string>('');
  const [courtType, setCourtType] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [receiveNotifications, setReceiveNotifications] = useState<boolean>(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const currentErrors: FormErrors = {};

    if (name.length > 0 && name.length < 3) {
      currentErrors.name = 'O nome deve ter no mínimo 3 caracteres.';
    }

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (bookingDate.length > 0 && !dateRegex.test(bookingDate)) {
      currentErrors.bookingDate = 'Formato de data inválido (DD/MM/AAAA).';
    }

    setErrors(currentErrors);
    const allFieldsFilled =
      name.trim().length >= 3 &&
      courtType.trim().length > 0 &&
      dateRegex.test(bookingDate);

    setIsFormValid(allFieldsFilled && Object.keys(currentErrors).length === 0);
  }, [name, courtType, bookingDate]);

  const handleSubmit = () => {
    const formData: BookingFormData = {
      applicantName: name,
      courtType: courtType,
      bookingDate: bookingDate,
      emailNotifications: receiveNotifications,
      submissionStatus: 'CONFIRMED',
      timestamp: new Date().toISOString(),
    };

    console.log('[LOG] Form Submission Successful!', JSON.stringify(formData, null, 2));
    Alert.alert('Sucesso', 'Reserva realizada! Confira os dados no console.');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Sistema Carregado...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/857/857418.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>ARENA SPORTS</Text>
          <Text style={styles.subtitle}>RESERVA DE QUADRA</Text>
        </View>

        <View style={styles.formContainer}>
          <FormInput
            label="Nome Completo do Responsável"
            placeholder="Ex: Maria Silva"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <FormInput
            label="Tipo de Quadra / Esporte"
            placeholder="Ex: Futsal, Basquete, Tênis"
            value={courtType}
            onChangeText={setCourtType}
            error={errors.courtType}
          />

          <FormInput
            label="Data da Reserva (DD/MM/AAAA)"
            placeholder="20/10/2026"
            value={bookingDate}
            onChangeText={setBookingDate}
            error={errors.bookingDate}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Notificações por Lembrete</Text>
            <Switch
              trackColor={{ false: '#334155', true: '#10B981' }}
              thumbColor={receiveNotifications ? '#FFFFFF' : '#94A3B8'}
              onValueChange={setReceiveNotifications}
              value={receiveNotifications}
            />
          </View>

          <FormButton
            title="Confirmar Reserva"
            disabled={!isFormValid}
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#10B981',
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    letterSpacing: 1.5,
    marginTop: 4,
  },
  formContainer: {
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  switchLabel: {
    color: '#ECF0F1',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});