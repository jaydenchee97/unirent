/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSavedAccommodation = /* GraphQL */ `
  subscription OnCreateSavedAccommodation(
    $filter: ModelSubscriptionSavedAccommodationFilterInput
    $owner: String
  ) {
    onCreateSavedAccommodation(filter: $filter, owner: $owner) {
      id
      Accommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      savedAccommodationUserId
      owner
      __typename
    }
  }
`;
export const onUpdateSavedAccommodation = /* GraphQL */ `
  subscription OnUpdateSavedAccommodation(
    $filter: ModelSubscriptionSavedAccommodationFilterInput
    $owner: String
  ) {
    onUpdateSavedAccommodation(filter: $filter, owner: $owner) {
      id
      Accommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      savedAccommodationUserId
      owner
      __typename
    }
  }
`;
export const onDeleteSavedAccommodation = /* GraphQL */ `
  subscription OnDeleteSavedAccommodation(
    $filter: ModelSubscriptionSavedAccommodationFilterInput
    $owner: String
  ) {
    onDeleteSavedAccommodation(filter: $filter, owner: $owner) {
      id
      Accommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      savedAccommodationUserId
      owner
      __typename
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      Users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatRoomId
        userId
        updatedAt
        __typename
      }
      Accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      chatRoomAccommodationId
      __typename
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      Users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatRoomId
        userId
        updatedAt
        __typename
      }
      Accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      chatRoomAccommodationId
      __typename
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      Users {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      LastMessage {
        id
        createdAt
        text
        chatRoomId
        userId
        updatedAt
        __typename
      }
      Accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      chatRoomLastMessageId
      chatRoomAccommodationId
      __typename
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
      id
      createdAt
      text
      chatRoomId
      userId
      updatedAt
      __typename
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
      id
      createdAt
      text
      chatRoomId
      userId
      updatedAt
      __typename
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
      id
      createdAt
      text
      chatRoomId
      userId
      updatedAt
      __typename
    }
  }
`;
export const onCreateAccommodation = /* GraphQL */ `
  subscription OnCreateAccommodation(
    $filter: ModelSubscriptionAccommodationFilterInput
    $owner: String
  ) {
    onCreateAccommodation(filter: $filter, owner: $owner) {
      id
      availableDate
      description
      images
      price
      propertyType
      rented
      createdAt
      title
      address
      userId
      unitFeature
      latitude
      longitude
      savedaccommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateAccommodation = /* GraphQL */ `
  subscription OnUpdateAccommodation(
    $filter: ModelSubscriptionAccommodationFilterInput
    $owner: String
  ) {
    onUpdateAccommodation(filter: $filter, owner: $owner) {
      id
      availableDate
      description
      images
      price
      propertyType
      rented
      createdAt
      title
      address
      userId
      unitFeature
      latitude
      longitude
      savedaccommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteAccommodation = /* GraphQL */ `
  subscription OnDeleteAccommodation(
    $filter: ModelSubscriptionAccommodationFilterInput
    $owner: String
  ) {
    onDeleteAccommodation(filter: $filter, owner: $owner) {
      id
      availableDate
      description
      images
      price
      propertyType
      rented
      createdAt
      title
      address
      userId
      unitFeature
      latitude
      longitude
      savedaccommodations {
        items {
          id
          savedAccommodationId
          accommodationId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      User {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
      id
      name
      status
      userType
      Accommodations {
        items {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SavedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      createdAt
      updatedAt
      userSavedAccommodationId
      owner
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
      id
      name
      status
      userType
      Accommodations {
        items {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SavedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      createdAt
      updatedAt
      userSavedAccommodationId
      owner
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
      id
      name
      status
      userType
      Accommodations {
        items {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      ChatRooms {
        items {
          id
          chatRoomId
          userId
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      Messages {
        items {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      SavedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      createdAt
      updatedAt
      userSavedAccommodationId
      owner
      __typename
    }
  }
`;
export const onCreateSavedAccommodationAccommodation = /* GraphQL */ `
  subscription OnCreateSavedAccommodationAccommodation(
    $filter: ModelSubscriptionSavedAccommodationAccommodationFilterInput
    $owner: String
  ) {
    onCreateSavedAccommodationAccommodation(filter: $filter, owner: $owner) {
      id
      savedAccommodationId
      accommodationId
      savedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateSavedAccommodationAccommodation = /* GraphQL */ `
  subscription OnUpdateSavedAccommodationAccommodation(
    $filter: ModelSubscriptionSavedAccommodationAccommodationFilterInput
    $owner: String
  ) {
    onUpdateSavedAccommodationAccommodation(filter: $filter, owner: $owner) {
      id
      savedAccommodationId
      accommodationId
      savedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteSavedAccommodationAccommodation = /* GraphQL */ `
  subscription OnDeleteSavedAccommodationAccommodation(
    $filter: ModelSubscriptionSavedAccommodationAccommodationFilterInput
    $owner: String
  ) {
    onDeleteSavedAccommodationAccommodation(filter: $filter, owner: $owner) {
      id
      savedAccommodationId
      accommodationId
      savedAccommodation {
        id
        Accommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        createdAt
        updatedAt
        savedAccommodationUserId
        owner
        __typename
      }
      accommodation {
        id
        availableDate
        description
        images
        price
        propertyType
        rented
        createdAt
        title
        address
        userId
        unitFeature
        latitude
        longitude
        savedaccommodations {
          nextToken
          __typename
        }
        User {
          id
          name
          status
          userType
          createdAt
          updatedAt
          userSavedAccommodationId
          owner
          __typename
        }
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateUserChatRoom = /* GraphQL */ `
  subscription OnCreateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
    $owner: String
  ) {
    onCreateUserChatRoom(filter: $filter, owner: $owner) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Users {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        LastMessage {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        Accommodation {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
        chatRoomAccommodationId
        __typename
      }
      user {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateUserChatRoom = /* GraphQL */ `
  subscription OnUpdateUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
    $owner: String
  ) {
    onUpdateUserChatRoom(filter: $filter, owner: $owner) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Users {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        LastMessage {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        Accommodation {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
        chatRoomAccommodationId
        __typename
      }
      user {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteUserChatRoom = /* GraphQL */ `
  subscription OnDeleteUserChatRoom(
    $filter: ModelSubscriptionUserChatRoomFilterInput
    $owner: String
  ) {
    onDeleteUserChatRoom(filter: $filter, owner: $owner) {
      id
      chatRoomId
      userId
      chatRoom {
        id
        Users {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        LastMessage {
          id
          createdAt
          text
          chatRoomId
          userId
          updatedAt
          __typename
        }
        Accommodation {
          id
          availableDate
          description
          images
          price
          propertyType
          rented
          createdAt
          title
          address
          userId
          unitFeature
          latitude
          longitude
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        chatRoomLastMessageId
        chatRoomAccommodationId
        __typename
      }
      user {
        id
        name
        status
        userType
        Accommodations {
          nextToken
          __typename
        }
        ChatRooms {
          nextToken
          __typename
        }
        Messages {
          nextToken
          __typename
        }
        SavedAccommodation {
          id
          createdAt
          updatedAt
          savedAccommodationUserId
          owner
          __typename
        }
        createdAt
        updatedAt
        userSavedAccommodationId
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
