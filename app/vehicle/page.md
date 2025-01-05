@startuml

actor User
entity "AddVehiclePage" as AddVehiclePage
entity "User Context" as UserContext
entity "Vehicle Data" as VehicleData
entity "Vehicle API" as VehicleAPI
entity "Snackbar" as Snackbar
entity "Router" as Router

User -> AddVehiclePage : Acessa página
AddVehiclePage -> UserContext : Obtém dados do usuário
AddVehiclePage -> VehicleData : Preenche dados do veículo
AddVehiclePage -> VehicleData : Valida dados
VehicleData -> AddVehiclePage : Retorna erros (se houver)
AddVehiclePage -> VehicleAPI : Envia dados do veículo
VehicleAPI -> AddVehiclePage : Retorna sucesso ou erro
AddVehiclePage -> Snackbar : Exibe mensagem de sucesso ou erro
AddVehiclePage -> Router : Redireciona após sucesso

@enduml
