import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum PropertyEnum {
  HDB = "HDB",
  CONDO = "CONDO",
  LANDED = "LANDED",
  UNIVERSITY = "UNIVERSITY"
}



type EagerSavedAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedAccommodation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Accommodations?: (SavedAccommodationAccommodation | null)[] | null;
  readonly User?: (UserSavedAccomodations | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySavedAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedAccommodation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Accommodations: AsyncCollection<SavedAccommodationAccommodation>;
  readonly User: AsyncCollection<UserSavedAccomodations>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SavedAccommodation = LazyLoading extends LazyLoadingDisabled ? EagerSavedAccommodation : LazySavedAccommodation

export declare const SavedAccommodation: (new (init: ModelInit<SavedAccommodation>) => SavedAccommodation) & {
  copyOf(source: SavedAccommodation, mutator: (draft: MutableModel<SavedAccommodation>) => MutableModel<SavedAccommodation> | void): SavedAccommodation;
}

type EagerChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users?: (UserChatRoom | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly LastMessage?: Message | null;
  readonly Accommodation?: Accommodation | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
  readonly chatRoomAccommodationId?: string | null;
}

type LazyChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Users: AsyncCollection<UserChatRoom>;
  readonly Messages: AsyncCollection<Message>;
  readonly LastMessage: AsyncItem<Message | undefined>;
  readonly Accommodation: AsyncItem<Accommodation | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly chatRoomLastMessageId?: string | null;
  readonly chatRoomAccommodationId?: string | null;
}

export declare type ChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerChatRoom : LazyChatRoom

export declare const ChatRoom: (new (init: ModelInit<ChatRoom>) => ChatRoom) & {
  copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom>) => MutableModel<ChatRoom> | void): ChatRoom;
}

type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly text: string;
  readonly chatRoomId: string;
  readonly userId: string;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt: string;
  readonly text: string;
  readonly chatRoomId: string;
  readonly userId: string;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Accommodation, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly availableDate?: string | null;
  readonly description: string;
  readonly images?: string[] | null;
  readonly price: number;
  readonly propertyType?: PropertyEnum | keyof typeof PropertyEnum | null;
  readonly rented?: boolean | null;
  readonly createdAt: string;
  readonly title: string;
  readonly address?: string | null;
  readonly userId: string;
  readonly unitFeature?: (string | null)[] | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly savedaccommodations?: (SavedAccommodationAccommodation | null)[] | null;
  readonly User?: User | null;
  readonly updatedAt?: string | null;
}

type LazyAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Accommodation, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly availableDate?: string | null;
  readonly description: string;
  readonly images?: string[] | null;
  readonly price: number;
  readonly propertyType?: PropertyEnum | keyof typeof PropertyEnum | null;
  readonly rented?: boolean | null;
  readonly createdAt: string;
  readonly title: string;
  readonly address?: string | null;
  readonly userId: string;
  readonly unitFeature?: (string | null)[] | null;
  readonly latitude?: number | null;
  readonly longitude?: number | null;
  readonly savedaccommodations: AsyncCollection<SavedAccommodationAccommodation>;
  readonly User: AsyncItem<User | undefined>;
  readonly updatedAt?: string | null;
}

export declare type Accommodation = LazyLoading extends LazyLoadingDisabled ? EagerAccommodation : LazyAccommodation

export declare const Accommodation: (new (init: ModelInit<Accommodation>) => Accommodation) & {
  copyOf(source: Accommodation, mutator: (draft: MutableModel<Accommodation>) => MutableModel<Accommodation> | void): Accommodation;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status?: string | null;
  readonly userType?: string | null;
  readonly Accommodations?: (Accommodation | null)[] | null;
  readonly ChatRooms?: (UserChatRoom | null)[] | null;
  readonly Messages?: (Message | null)[] | null;
  readonly SavedAccommodation?: (UserSavedAccomodations | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly status?: string | null;
  readonly userType?: string | null;
  readonly Accommodations: AsyncCollection<Accommodation>;
  readonly ChatRooms: AsyncCollection<UserChatRoom>;
  readonly Messages: AsyncCollection<Message>;
  readonly SavedAccommodation: AsyncCollection<UserSavedAccomodations>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerSavedAccommodationAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedAccommodationAccommodation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly savedAccommodationId?: string | null;
  readonly accommodationId?: string | null;
  readonly savedAccommodation: SavedAccommodation;
  readonly accommodation: Accommodation;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySavedAccommodationAccommodation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SavedAccommodationAccommodation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly savedAccommodationId?: string | null;
  readonly accommodationId?: string | null;
  readonly savedAccommodation: AsyncItem<SavedAccommodation>;
  readonly accommodation: AsyncItem<Accommodation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SavedAccommodationAccommodation = LazyLoading extends LazyLoadingDisabled ? EagerSavedAccommodationAccommodation : LazySavedAccommodationAccommodation

export declare const SavedAccommodationAccommodation: (new (init: ModelInit<SavedAccommodationAccommodation>) => SavedAccommodationAccommodation) & {
  copyOf(source: SavedAccommodationAccommodation, mutator: (draft: MutableModel<SavedAccommodationAccommodation>) => MutableModel<SavedAccommodationAccommodation> | void): SavedAccommodationAccommodation;
}

type EagerUserSavedAccomodations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSavedAccomodations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly savedAccommodationId?: string | null;
  readonly userId?: string | null;
  readonly savedAccommodation: SavedAccommodation;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserSavedAccomodations = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserSavedAccomodations, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly savedAccommodationId?: string | null;
  readonly userId?: string | null;
  readonly savedAccommodation: AsyncItem<SavedAccommodation>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserSavedAccomodations = LazyLoading extends LazyLoadingDisabled ? EagerUserSavedAccomodations : LazyUserSavedAccomodations

export declare const UserSavedAccomodations: (new (init: ModelInit<UserSavedAccomodations>) => UserSavedAccomodations) & {
  copyOf(source: UserSavedAccomodations, mutator: (draft: MutableModel<UserSavedAccomodations>) => MutableModel<UserSavedAccomodations> | void): UserSavedAccomodations;
}

type EagerUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserChatRoom = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserChatRoom, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly chatRoomId?: string | null;
  readonly userId?: string | null;
  readonly chatRoom: AsyncItem<ChatRoom>;
  readonly user: AsyncItem<User>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserChatRoom = LazyLoading extends LazyLoadingDisabled ? EagerUserChatRoom : LazyUserChatRoom

export declare const UserChatRoom: (new (init: ModelInit<UserChatRoom>) => UserChatRoom) & {
  copyOf(source: UserChatRoom, mutator: (draft: MutableModel<UserChatRoom>) => MutableModel<UserChatRoom> | void): UserChatRoom;
}