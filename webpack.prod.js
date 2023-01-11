const path = require('path'); // Importer le module de path de Node.js
const { merge } = require('webpack-merge'); // Importer la fonction de fusion de webpack-merge
const webpackConfig = require('./webpack.config'); // Importer la configuration de base de webpack

module.exports = merge(
    webpackConfig, // Fusionner la configuration de base
    {
        mode: "production", // Indiquer à webpack que nous sommes en mode production
        output: {
            path: path.join(__dirname, '/dist'), // Définir le répertoire de destination du bundle
            filename: 'bundle.js', // Définir le nom du bundle
            publicPath: '/'            
        }
    }
);