import TripSchema from "./models/tripModel.js";
import PackSchema from "./models/packModel.js";
import ItemSchema from "./models/itemModel.js";
import UserSchema from "./models/userModel.js";

import m2s from "mongoose-to-swagger";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

// import options from "../utils/swaggerOptions.js";

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "PackRat API", // Specify the title of your API
      version: "1.0.0", // Specify the version of your API
      description: "API documentation for the PackRat MERN application",
    },
  },

  // Path to the API routes
  apis: [
    // "./*.js", // this will look for .js files in the current directory
    // "./**/*.js", // this will look for .js files in all subdirectories

    "./routes/*.js",
    // "../middleware/validators/*.js",
    // "../models/*.js",
    // "../controllers/*.js",
  ],

  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://packrat.onrender.com",
      description: "Production server",
    },
  ],

};
//  Swagger-jsdoc with the options
const specs = swaggerJsdoc(options);

// Add the schemas generated by mongoose-to-swagger to the components.schemas property of the specs object
specs.components = {
  schemas: {
    User: m2s(UserSchema),
    Trip: m2s(TripSchema),
    Pack: m2s(PackSchema),
    Item: m2s(ItemSchema),
  },
};

// console.log("options ----- ", options);
// console.log("specs ----- ", specs);


export default specs;
