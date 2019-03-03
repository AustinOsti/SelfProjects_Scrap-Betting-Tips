const axios = require('axios');
const request = require('request');
const cheerio = require('cheerio');

const fs = require('fs');
const file = fs.createWriteStream('./tips.txt');

/* send console.log to tips.txt file ...
var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/tips.txt', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};
*/

const url = 'https://www.bettingtips1x2.com/';

//make HTTP request to url using axios to get website content
axios.get(url)
.then(function(response){
	getData(response.data);
//	console.log(response.data);	
})
.catch(function(error){
	console.log(error);
});

//parse the HTML with Cheerio.js
let getData = function(html){
	data = [];
	d = new Date();
	const $ = cheerio.load(html);	
	$('table.results tr')
	.each(function(i, elem){
		var game = $(elem).children("td:nth-child(4)").text();
		if (game.length > 0) {
			data.push({
				date: d,
				league: $(elem).children("td:nth-child(2)").text(),
				game: game.replace('-', 'vs'),
				odds_1:	$(elem).children("td:nth-child(5)").text(),
				odds_X: $(elem).children("td:nth-child(6)").text(),
				odds_2: $(elem).children("td:nth-child(7)").text(),
				tip: $(elem).children("td:nth-child(8)").text().replace(':', '--')
			});			
		}	
	});
	file.write(JSON.stringify(data));
	file.end();	
//	console.log(data);	
}
