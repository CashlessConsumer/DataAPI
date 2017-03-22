var Tabletop = require('tabletop');
var jsonfile = require('jsonfile');
var async = require('async');

var sheets = [
{
  name: "VPAIdentifiers",
  url: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=1y3OBnhmtAuMtGlxzpAazzo0zw466pmYKoTLJaSO7h7g&output=html',
  api: 'vpa.json',
  sheetName: "Sheet1"
}
]

async.forEach(sheets, function (item, callback){

  function writeData(dataSet, tabletop) {
	var obj = {
	  columns: tabletop.sheets(item.sheetName)['column_names'],
	  rows: tabletop.sheets(item.sheetName).toArray()
	}
	var file = 'src/api/'+item.api;

	jsonfile.writeFileSync(file, obj)
	console.log('Saved: '+item.name);
	callback();
  }
  Tabletop.init( { key: item.url,
	callback: writeData,
	wanted: [item.sheetName],
	simpleSheet: false } )

  }, function(err) {
	console.log('Done');
  });
