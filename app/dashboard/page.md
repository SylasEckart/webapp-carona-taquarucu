@startuml

actor User
entity "AddVehiclePage" as AddVehiclePage
entity "Vehicle Data" as VehicleData
entity "Vehicle API" as VehicleAPI
entity "Snackbar" as Snackbar
entity "User Context" as UserContext
entity "Router" as Router

User -> AddVehiclePage : Preenche dados do veículo
AddVehiclePage -> VehicleData : Atualiza dados do veículo
AddVehiclePage -> VehicleData : Valida dados do veículo
VehicleData -> AddVehiclePage : Retorna erros (se houver)
AddVehiclePage -> VehicleAPI : Envia dados do veículo (se válidos)
VehicleAPI -> AddVehiclePage : Retorna sucesso ou erro
AddVehiclePage -> Snackbar : Exibe mensagem de sucesso ou erro
AddVehiclePage -> Router : Redireciona após sucesso
UserContext -> AddVehiclePage : Obtém informações do usuário

@enduml
