const path = require('path');
const fs = require('fs');
const sass = require('sass');

const input = path.join(__dirname, 'src', 'scss', 'apollo.scss');
const output = path.join(__dirname, 'source', 'css', 'apollo.css')

sass.render({
    file: input,
    outputStyle: 'compressed'
}, (error, result) => {
    if (error) throw error;
    fs.writeFile(output, result.css, (error) => {
        if (error) throw error;
    })
})