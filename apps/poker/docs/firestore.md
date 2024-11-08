# Firestoreのデータ構造

- /rooms
  - {roomId}
    - createdAt: timestamp
    - isVoting: boolean
    - /members
      - {userId}
        - name: string
        - selectedCard: string | null
        - isVoting: boolean
