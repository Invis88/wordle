const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');

    axios.get('https://www.thefreedictionary.com/5-letter-words.htm' )
    .then(function (response) { // success
        const $ = cheerio.load(response.data);

        $('#dCont li').each(function() {
            let newWord = $(this).text()
            let newData = `'${newWord}', \n`;

            if (!newWord.includes(' ') && !newWord.includes('-')) {
                fs.writeFile('allWords.js', newData, { flag: 'a+' }, err => { });
            };
        })
    })
    .catch(function (error) { // error
        console.log(error);
    })
    .finally(function () { // always
        // console.log(`${i} done`)
    });
