import fs from 'fs';
import emails from 'validator';
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
  let domainArray: string[] = [];
  let validEmailArray: string[] = [];
  let sortedEmail: string[] = [];
  const result: any = {};

  //looping through the inputpath, reading the file,validating the email and pushing the domain to populate our result
  for (let i = 0; i < inputPaths.length; i++) {
    const path: string = inputPaths[i];

    fs.readFile(path, 'utf8', (err, res) => {
      if (err) {
        console.error(err);
      }
      //split at spaces which is represented by \n
      const arraySplit: string[] = res.split('\n');
      sortedEmail = arraySplit.filter((element) => element.toString()!= "Emails" && element.toString() != '');
      validEmailArray = arraySplit.filter((element) => emails.isEmail(element));
      domainArray = validEmailArray.map(item=>{
        const domain = item.split('@')[1];
        result[domain] = result[domain] ? result[domain]+1 : 1
      
        return domain
      });
      //populate the actual object
      const outputObj: any = {
        'valid-domain': [...new Set(domainArray)],
        totalEmailsParsed: sortedEmail.length,
        totalValidEmail: validEmailArray.length,
        categories: result,
      };
      fs.writeFileSync(outputPath, JSON.stringify(outputObj, null, 2));
    });
  }
  //console.log('Complete the implementation in src/analysis.ts');
}


export default analyseFiles;