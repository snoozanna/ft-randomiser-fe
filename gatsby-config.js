const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// });

module.exports = {
  siteMetadata: {
    title: `Randomiser Test`,
    siteUrl: "https://first.trimester",
    description: "First Trimester by Krisha Istha",
    twitter: "@KrishnaIstha",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-apollo",
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -50,
      },
    },
    {
      // this is the name of the plugin you are adding
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "vlp0qz8p",
        dataset: "production",
        watchMode: true,
        apiVersion: "2023-08-01", // use a UTC date string
        token: process.env.SANITY_TOKEN,
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
          {
            name: `Glory`,
            file: `https://fonts.googleapis.com/css2?family=Glory:ital,wght@0,300;0,600;0,700;1,300;1,500&display=swap`,
          },
          {
            name: `Inconsolata`,
            file: `https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;600;700;800;900&display=swap`,
          },
          {
            name: `Roboto`,
            file: `https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,400;1,700&display=swap`,
          },
        ],
      },
    },
  ],
};
