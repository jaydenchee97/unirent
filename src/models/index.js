// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PropertyEnum = {
  "HDB": "HDB",
  "CONDO": "CONDO",
  "LANDED": "LANDED",
  "UNIVERSITY": "UNIVERSITY"
};

const { SavedAccommodation, ChatRoom, Message, Accommodation, User, SavedAccommodationAccommodation, UserSavedAccomodations, UserChatRoom } = initSchema(schema);

export {
  SavedAccommodation,
  ChatRoom,
  Message,
  Accommodation,
  User,
  SavedAccommodationAccommodation,
  UserSavedAccomodations,
  UserChatRoom,
  PropertyEnum
};