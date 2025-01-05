@startuml

actor User
entity "SocialPage" as SocialPage
entity "User Context" as UserContext
entity "App Context" as AppContext
entity "SocialFriendsList" as SocialFriendsList

User -> SocialPage : Acessa página
SocialPage -> AppContext : Obtém lista de usuários
SocialPage -> UserContext : Obtém dados do usuário
SocialPage -> SocialFriendsList : Exibe lista de amigos e não-amigos
User -> SocialFriendsList : Interage com a lista de amigos

@enduml
