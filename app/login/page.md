@startuml

actor User
entity "LoginPage" as LoginPage
entity "User Context" as UserContext
entity "Location Context" as LocationContext
entity "Auth Form" as AuthForm
entity "Location Verification" as LocationVerification
entity "Router" as Router
entity "Login API" as LoginAPI
entity "Snackbar" as Snackbar
entity "Theme" as Theme

User -> LoginPage : Acessa página
LoginPage -> UserContext : Obtém dados do usuário
LoginPage -> LocationContext : Obtém localização do usuário
LoginPage -> AuthForm : Exibe formulário de login ou cadastro
User -> AuthForm : Preenche dados
AuthForm -> LocationVerification : Verifica localização
AuthForm -> LoginAPI : Envia dados de login ou cadastro
LoginAPI -> LoginPage : Retorna sucesso ou erro
LoginPage -> Router : Redireciona após sucesso
LoginPage -> Snackbar : Exibe feedback de sucesso ou erro
LoginPage -> Theme : Permite troca de tema

@enduml
