import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "Enter a first name"
  },
  lastName: {
    type: String,
    required: "Enter a last name"
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  phone: {
    type: Number
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

export interface Contact {
  firstName: string;
  lastName: string;
  email?: string;
  company?: string;
  phone?: Number;
}

export const TripSchema = new Schema({
  servicetype: { type: String },
  servicename: { type: String }
});

export const InterventionSchema = new Schema({
  seqno: { type: String },
  streetname: { type: String },
  houseno: { type: String },
  cityname: { type: String },
  longitude: { type: String },
  latitude: { type: String },
  numcasualties: { type: String },
  description: { type: String },
  remarks: { type: String },
  callref: { type: String },
  date: { type: String },
  time: { type: String },
  phoneno: { type: String },
  callername: { type: String },
  controlroomname: { type: String },
  sectorcode: { type: String },
  trip: [TripSchema]
});

export interface Trip {
  servicetype?: string;
  servicename?: string;
}

export interface Intervention {
  seqno?: string;
  streetname?: string;
  houseno?: string;
  cityname?: string;
  longitude?: string;
  latitude?: string;
  numcasualties?: string;
  description?: string;
  remarks?: string;
  callref?: string;
  date?: string;
  time?: string;
  phoneno?: string;
  callername?: string;
  controlroomname?: string;
  sectorcode?: string;
  trip?: Trip[];
}
