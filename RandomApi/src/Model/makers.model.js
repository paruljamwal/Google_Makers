const mongoose=require("mongoose");

// Map schema
const MapSchema = new mongoose.Schema(
    {
      lat: { type: String, required: true },
      lng: { type: String, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  // Map Model
   const Map = mongoose.model("googlemaps", MapSchema);
  module.exports= Map;