import fs from 'fs';
import emails from 'validator';
/**
 * First task - Read the csv files in the inputPath and analyse them
 *
 * @param {string[]} inputPaths An array of csv files to read
 * @param {string} outputPath The path to output the analysis
 */
function analyseFiles(inputPaths: string[], outputPath: string) {
  const domainArray: string[] = [];
  const validEmailArray: string[] = [];
  const sortedEmail: string[] = [];
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

      for (let j = 0; j < arraySplit.length; j++) {
        if (arraySplit[j] === 'Emails' || arraySplit[j] === '') {
          continue;
        } else {
          sortedEmail.push(arraySplit[j]);
        }
        //validate email
        if (emails.isEmail(arraySplit[j])) {
          const domain: string = arraySplit[j].split('@')[1];

          validEmailArray.push(arraySplit[j]);
          domainArray.push(domain);

          //populate part of the result object which is the categories object in the main output
          if (result[domain]) {
            result[domain]++;
          } else {
            result[domain] = 1;
          }
        }
      }
      //populate the actual object
      const outputObj: any = {
        'valid-domain': domainArray,
        totalSortedEmail: sortedEmail.length,
        totalValidEmail: validEmailArray.length,
        categories: result,
      };
      fs.writeFileSync(outputPath, JSON.stringify(outputObj, null, 2));
    });
  }
  console.log('Complete the implementation in src/analysis.ts');
}
//analyseFiles(['fixtures/inputs/small-sample.csv'], 'report-analysis.json');

export default analyseFiles;
