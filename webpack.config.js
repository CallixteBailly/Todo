const path = require('path'); // Importer le module de path de Node.js
const HTMLWebpackPlugin = require('html-webpack-plugin'); // Importer le plugin HTMLWebpackPlugin

module.exports = {
    plugins: [
        new HTMLWebpackPlugin({ // Créer une instance du plugin HTMLWebpackPlugin
            template: './src/index.html' // Définir le template HTML à utiliser
        })
    ],

    module: { // Définir les règles pour le traitement des différents types de fichiers
        rules: [
            {
                test: /\.js$/, // Appliquer la règle aux fichiers JavaScript
                exclude: /node_modules/, // Exclure les fichiers se trouvant dans node_modules
                use: {
                    loader: 'babel-loader', // Utiliser le chargeur Babel
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'] // Utiliser les préréglages '@babel/preset-env' et '@babel/preset-react'
                    }
                }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/, // Exclure les fichiers se trouvant dans node_modules
                use: ['ts-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']  // Indiquer à webpack les extensions de fichiers qu'il doit prendre en compte lors de la résolution des imports
    }
}
