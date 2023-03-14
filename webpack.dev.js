const { merge } = require('webpack-merge'); // Importer la fonction de fusion de webpack-merge
const webpackConfig = require('./webpack.config'); // Importer la configuration de base de webpack

module.exports = merge(
    webpackConfig, // Fusionner la configuration de base
    {
        mode: "development", // Indiquer à webpack que nous sommes en mode développement
        entry: "./src/index.tsx" // Définir un nouveau point d'entrée pour l'application
    }
);