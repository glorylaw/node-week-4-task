import  fs from "fs";
import {error} from "console"
import { resolve } from "dns"
const dig = require("node-dig-dns")

/**
 * Stretch goal - Validate all the emails in this files and output the report
 *
 * @param {string[]} inputPath An array of csv files to read
 * @param {string} outputFile The path where to output the report
 */
function validateEmailAddresses(inputPath: string[], outputFile: string) {
  const domainArray: string[] = []
  const validDomainArray: string[] = []
  //loop through the inputpath,readFile,validate email and push domain
  for(let i = 0;i<inputPath.length; i++){
    const path: string = inputPath[i]
    fs.readFile(path, "utf8", (err, result) => {
      if (err){
        console.error(err)
      }
      const splitArr: string[] = result.split("\n")
      for(let i = 0; i < splitArr.length; i++){
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(regex.test(splitArr[i])){
          const dom: string = splitArr[i].split("@")[1]
          domainArray.push(dom)
        }
      }
      for(let i= 0; i < domainArray.length;i++){
        dig([domainArray[i], "MX"])
        .then((res: any) =>{
          if(res.answer){
            validDomainArray.push(domainArray[i])
          }
          const filterArr: string[] = splitArr.filter((items) =>{
            if(validDomainArray.includes(items.split("@")[1])){
              return items
            }
          })
          fs.writeFileSync(outputFile, "Emails\n" + filterArr.join("\n"))
        })
       .catch((e: any) =>{
        console.error(e)
       })
      }
    })
  } 
  console.log('Complete the implementation in src/validation.ts');
}

export default validateEmailAddresses;
validateEmailAddresses(
  ['fixtures/inputs/small-sample.csv'],
  'report-validation.csv',
);

