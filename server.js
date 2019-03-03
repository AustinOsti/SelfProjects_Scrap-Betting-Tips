const axios = require('axios');
const cheerio = require('cheerio');

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
		data.push({
			date: d,
			league: $(elem).children("td:nth-child(2)").text(),
			game: $(elem).find('a').text(),
			odds_1:	$(elem).children("td:nth-child(5)").text(),
			odds_X: $(elem).children("td:nth-child(6)").text(),
			odds_2: $(elem).children("td:nth-child(7)").text(),
			tip: $(elem).children("td:nth-child(8)").text()
		});		
	});
	console.log(data);	
}
