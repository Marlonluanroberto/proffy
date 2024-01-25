import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257e5',
        justifyContent: 'center',
        padding: 40
    },
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 32,
        lineHeight: 37,
        maxWidth: 180
    },
    description: {
        marginVertical: 40,
        color: '#D4C2FF',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular'
    },
    okButton: {
        height: 58,
        backgroundColor: '#04D361',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    okButtonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 16
    }

});

export default styles;