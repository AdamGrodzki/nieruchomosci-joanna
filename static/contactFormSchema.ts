import * as Yup from 'yup';

export const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Imię i nazwisko jest zbyt krótkie')
        .max(50, 'Imię i nazwisko nie może być dłuższe niż 50 znaków')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Imię i nazwisko może zawierać tylko litery')
        .required('Imię i nazwisko jest wymagane'),
    email: Yup.string()
        .email('Nieprawidłowy adres email')
        .max(100, 'Adres email nie może być dłuższy niż 100 znaków')
        .required('Adres email jest wymagany'),
    phone: Yup.string()
        .matches(/^(?:\d{3}[- ]?\d{3}[- ]?\d{3})$/, 'Numer telefonu musi mieć 9 cyfr')
        .required('Numer telefonu jest wymagany'),
    message: Yup.string()
        .min(10, 'Wiadomość jest zbyt krótka')
        .required('Wiadomość jest wymagana'),
});

export const offerFormValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Imię i nazwisko jest zbyt krótkie')
        .max(50, 'Imię i nazwisko nie może być dłuższe niż 50 znaków')
        .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Imię i nazwisko może zawierać tylko litery')
        .required('Imię i nazwisko jest wymagane'),
    email: Yup.string()
        .email('Nieprawidłowy adres email')
        .max(100, 'Adres email nie może być dłuższy niż 100 znaków')
        .required('Adres email jest wymagany'),
    phone: Yup.string()
        .matches(/^(?:\d{3}[- ]?\d{3}[- ]?\d{3})$/, 'Numer telefonu musi mieć 9 cyfr')
        .required('Numer telefonu jest wymagany'),
    location: Yup.string()
        .required('Lokalizacja jest wymagana'),
    description: Yup.string()
        .required("Opis jest wymagany"),
    price: Yup.number()
        .min(0, 'Cena musi być większa niż 0')
        .required('Cena jest wymagana'),
    area: Yup.number()
        .min(0, 'Powierzchnia nie może byc ujemna')
        .required('Powierzchnia jest wymagana'),
    numberOfRooms: Yup.number()
        .min(0, 'Liczba pokoi nie może byc ujemna')
        .required('Liczba pokoi jest wymagane'),
});

export const validationSchemaSearchBar = Yup.object({
    minArea: Yup.number()
        .typeError('Wartość musi być liczbą')
        .min(0, 'Wartość nie może być mniejsza niż 0')
        .required('Pole jest wymagane'),
    maxArea: Yup.number()
        .typeError('Wartość musi być liczbą')
        .min(0, 'Wartość nie może być mniejsza niż 0')
        .required('Pole jest wymagane')
        .moreThan(Yup.ref('minArea'), 'Maksymalna powierzchnia musi być większa niż minimalna'),
});