const errorMessages: { [key: string]: string } = {
    'invalid_credentials': 'Senha ou Login Inválidos',
    'email_address_not_authorized': 'Email não autorizado',
    'UNAUTHORIZED': 'You are not authorized to perform this action.',
    'SERVER_ERROR': 'An internal server error occurred.',
    // Add more error messages as needed
};

export function errorHandler(message: string): string {
    console.log(message);
    return errorMessages[message] || `Erro: ${message}`;
}