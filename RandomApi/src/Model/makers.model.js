const mongoose=require("mongoose");

// Map schema
const MapSchema = new mongoose.Schema(
    {
      latitude: { type: String, required: true },
      longitude: { type: String, required: true },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );
  
  // Map Model
   const Map = mongoose.model("googlemaps", MapSchema);
  module.exports= Map;