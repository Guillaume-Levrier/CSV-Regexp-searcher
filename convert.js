const fs = require("fs");
const d3 = require("d3");
const csv = require("csv-parser");

var dataset=[];
var inputName =process.argv[2]
var args = process.argv.slice(3);
var regs = []
var filename = "";
args.forEach(d=>{
    regs.push(RegExp(d, 'i'))
    filename += d+"_";
})

filename+=inputName.slice(0,-4);

fs.createReadStream(inputName) // Read the flatfile dataset provided by the user
                .pipe(csv()) // pipe buffers to csv parser
                .on("data", data => {
                    regs.forEach(e=>{
                        for (const key in data) {
                            let d = data[key];
                            if (e.test(d)){
                                dataset.push({type:key,text:d})
                            }
                        }
                    })
                }).on("end", () => {
                    
                    var nested=d3.nest()
                                 .key(d=>d.type)
                                 .entries(dataset)

                    fs.writeFile(filename+'.json',JSON.stringify(nested),()=>{
                        console.log("✅ Saved in this folder under the name "+filename+".json")  
                    })

                    var textVersion = "";

                    nested.forEach(d=>{
                        textVersion+="\n "+JSON.stringify(d.key)+" \n" 
                        d.values.forEach(e=>textVersion+="\n "+e.text+" \n" )
                    })

                    fs.writeFile(filename+'.txt',textVersion,()=>{
                        console.log("✅ Saved a text version in this folder under the name "+filename+".txt")
                    })
                    
                })
