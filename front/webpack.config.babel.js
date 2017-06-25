import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackBuildNotifierPlugin from 'webpack-build-notifier';
import autoprefixer from 'autoprefixer';

const PATH = {
  src: 'src',
  dist: '../app/assets'
};


/**
 * js compile
 * @type {{entry, output, module, eslint, postcss, plugins, resolve}}
 */
/*
const jsConfig = ((env)=> {
    const entry = {
      'app': [
        `${PATH.src}/css/foundation/sanitaize.css`,
        `${PATH.src}/css/foundation/base.css`,
        `${PATH.src}/js/app.jsx`
      ]
    };
const output = {
  path: `${PATH.dist}/js`,
  filename: "[name].js"
};
const module = ((env)=> {

    const rp = {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader:'string-replace',
      query: {
        search: '{JS_PATH}',
        replace: (env === 'prod') ? '/': "../"
      }
    };
const jsModule = {
  test: /\.jsx?$/,
  exclude: /(node_modules)|(\.DS_Store$)/,
  loaders: ['babel-loader','eslint-loader']
};

const cssModule = {
  test: /\.css$/,
  // loaders: ['style', 'css?modules']
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss-loader')
};

if(env === 'prod'){
  console.log('      ******************************************************************'.green);
  console.log('                      deploy start!!  '.custom);
  console.log('                      remove console.log  '.custom);
  console.log('      ******************************************************************'.green);
  jsModule.loaders.unshift(
    WebpackStrip.loader('console.log')
  );
};

const svgModule = {
  // test: /\.(png|svg)$/i, loaders: [ 'url?name=[path][name].[ext]' ]
  test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
};

const imgModule = {
  test: /\.(jpe?g|png|gif)$/i, loaders: ['file-loader?name=../img/[name].[ext]']
};

return {
  loaders: [rp, svgModule, jsModule, cssModule, imgModule]
};
})(env);

const eslint = {
  configFile: '.eslintrc'
};

const postcss = ((webpack) => {
    let config = [];
config = config.concat([
  require('postcss-import')({ addDependencyTo: webpack }),
  require('postcss-cssnext')({
    browsers: ['last 2 versions']
  })
]);
return config;
})(webpack);

const plugins = [
  new CopyWebpackPlugin([
    {from: `${PATH.src}/html`, to: path.join(__dirname, 'dist')},
    {from: `${PATH.src}/asset/img`, to: path.join(__dirname, 'dist/img')}
  ]),
  new ExtractTextPlugin('[name].css')
];

if(env === 'prod'){
  plugins.unshift(
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': '"production"' } }),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  );
} else {
  plugins.unshift(
    new WebpackBuildNotifierPlugin()
  );
}

const resolve = {
  extensions: ['', '.js', '.jsx']
}

return {entry, output, module, eslint, postcss, plugins, resolve}
})(process.env.NODE_ENV);
*/

/**
 * css compile
 * @type {{entry, output, module, plugins, postcss}}
 */
 const cssConfig = ((env)=>{
   const entry = {
     style: path.join(__dirname, `css/style.scss`),
   };
   const output = {
     path: path.join(__dirname, `${PATH.dist}/stylesheets/`),
     filename: '[name].css',
   };

   const module = {
     rules: [       {
         test: /\.scss$/,
         exclude: /node_modules/,
         use: ExtractTextPlugin.extract({
           fallback: "style-loader",
           use: ["css-loader",
             {
               loader: 'postcss-loader',
               options: {
                 plugins: () => [autoprefixer]
               }
             },
             "sass-loader"
           ]
         })
       },
       // {
       //  test: /\.(jpg|png|gif|svg)$/,
       //  use: 'file-loader?name=[name].[ext]'
       // }
     ]
   };

   const plugins = [
     new ExtractTextPlugin('[name].css'),
     new webpack.LoaderOptionsPlugin({
       options: {
         postcss: [
           autoprefixer({ browsers: ['last 2 versions', 'Android >= 4.1'] }),
         ]
       }
     }),
     new WebpackBuildNotifierPlugin()
   ];

 return {entry, output, module, plugins}
 })(process.env.NODE_ENV);

module.exports = [cssConfig];
