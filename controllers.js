const {connection} = require('./db.config.js')
const fs = require('fs');
const Path = require('path');
let nanoGlobal ;
// Using dynamic import to load ES module syntax
(async () => {
    var { nanoid } = await import('nanoid');
    nanoGlobal = nanoid
  })();
  

const FormSubmit = async(req,res)=>{
console.log(req.body);
  const {address, city, contact, 
    email_id, name, state} = req.body;

   let Uid = nanoGlobal();
   console.log(Uid)
    try{
       // Get the file buffer and the file format
      const fileBuffer = req.file.buffer;

      // Define the folder path
      const folderPath = Path.join('SchoolImages');

      // Create the folder if it doesn't exist
      if (!fs.existsSync(folderPath)) {
        console.log(folderPath)
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Define the file path, including the desired file name and format
      const fileName = `${Uid}_${req.file.originalname}`;
      const filePath = Path.join(folderPath, fileName);

      // Save the file buffer to the specified file path
      fs.writeFileSync(filePath, fileBuffer);

      const query = `INSERT INTO schools(name, address, city, state, contact, image, email_id) VALUES
    ('${name}','${address}', '${city}', '${state}', '${contact}', 
    'https://findschool.onrender.com/school/getImage/${Uid}_${req.file.originalname}',
    '${email_id}')`

      const update = connection.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
            return;
        }else{
            res.status(200).send({msg:'Form submitted successfully'});
            
        }
      });
      
      
    }catch(err){
       console.log(err);
       res.status(400).send(err);
    }
   
};

const GetImage = async (req, res) => {
    const filename = req.params.filename;
   

    const pdfFolderPath = Path.resolve('SchoolImages');

    const filePath = Path.join(pdfFolderPath, filename);
  
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(404).send({ error: 'File not found' });
      }
    });
  }
  

const getListing = (req,res)=>{


    const query = `SELECT *FROM schools`;
    connection.query(query, (err, result) => {
        if(err){
            console.log(err);
            res.status(400).send(err);
            return;
        }else{
            res.status(200).send(result);
            console.log('Schools listing fetched successfully');
        }
    });
}
module.exports = {FormSubmit, GetImage, getListing};
