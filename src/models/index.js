// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PropertyEnum = {
  "HDB": "HDB",
  "CONDO": "CONDO",
  "LANDED": "LANDED",
  "UNIVERSITY": "UNIVERSITY"
};

const { SavedAccommodation, Accommodation, User, Message, ChatRoom, SavedAccommodationAccommodation, UserChatRoom } = initSchema(schema);

export {
  SavedAccommodation,
  Accommodation,
  User,
  Message,
  ChatRoom,
  SavedAccommodationAccommodation,
  UserChatRoom,
  PropertyEnum
};