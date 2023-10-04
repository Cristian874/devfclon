

/* exportamos la dependencias  */
const {src,dest, watch,series,parallel} = require('gulp');

/* exportamos gulp-sass y sass y todo lo almacenamos en la función de sass */
const sass =require('gulp-sass')(require('sass'));

/* exportamos la dependencias de autoprefixer y gulp-postcss */
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

 /* exportamos la dependencia de las imagenes */
 const imagemin = require('gulp-imagemin')
/* Función csss */
function css (done){

    /* Identificamos la hoja de sass */
    src('src/scss/app.scss')
    /* compilamos la hoja de sass .scss */
    /* ({outputStyle: 'compressed'}) sirve para cminificar la hoja de estilos*/
    .pipe(sass(/* {outputStyle: 'compressed'} */))

    /* pipe para el autoprefixer */
    .pipe(postcss([autoprefixer()]))
    /* Guardamos la hoja ya compilada */
    .pipe(dest('build/css'));


    done();
}

/* funcion de imagenes */
function imagenes(done){
    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('build/img'))

    done();
}

function JavaScript(done){

    src('src/js/**/*')
    .pipe(dest('build/js'))

    done();
}

/* Función para watch */
function dev(done){
    watch('src/scss/**/*.scss',css);
    watch('src/img/**/*', imagenes);
    watch('src/js/**/*', JavaScript);


    done();
}

/* exportamos la funciones  */
exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.JavaScript = JavaScript;
/* exportamos la funcíón de serie para corres las tareas por default */
exports.default = series(css,imagenes,JavaScript,dev);