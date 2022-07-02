import React , {useState} from 'react';
import { uploadFile } from 'react-s3';
import AWS from 'aws-sdk';
//import { builtinModules } from 'module';


window.Buffer = window.Buffer || require("buffer").Buffer;
const S3_BUCKET ='upload-file-project';
const REGION ='ap-south-1';
const ACCESS_KEY ='AKIATMKNUSCUSEZPW4MK';
const SECRET_ACCESS_KEY ='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';

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}
const styles = {
    mainDiv: {
      backgroundColor: "#e8a9a9",
      height:"100vh",
    },
    content:{
        marginTop: "6%"
    },
    button:{
        width: "20%",
        height: "35px",
        borderRadius:"none",

    },
    font:{
        color:"white"
    },
    li:{
       marginLeft: "10px",
       width: "20%",
       height: "35px",
       borderRadius:"none",
    }
}
const UploadFile = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [fileName, setFileName]= useState()
    const [donloaddedFile, setDownloadedFile] = useState('choose file')
    const [fileList, setFileList] = useState([])
    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        
    }

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => setFileName(data.key))
            .catch(err => console.error(err))
            console.log(fileName)
        setFileList([...fileList,fileName])
        console.log("hello")
        setDownloadedFile(fileName)
    }

    AWS.config.update({
        accessKeyId:'AKIATMKNUSCUSEZPW4MK',
        secretAccessKey: '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',
      });



    const handleDownload = () => {
        const s3 = new AWS.S3();
    
        const params = {
          Bucket: S3_BUCKET,
          Key: donloaddedFile,
        };
    
        s3.getObject(params, (err, data) => {
          if (err) {
            console.log(err, err.stack);
          } else {
                console.log('hi',data);
            }
        
          })
          
        }
    const url = `https://file-upload-project.s3.amazonaws.com/${fileName}`
    return <div id="mainDiv" style={styles.mainDiv}>
        <div >
            <h1 style={styles.font}>File Upload</h1>
            <input type="file" name='file' onChange={handleFileInput} style={styles.content}/>
            <button onClick={() => handleUpload(selectedFile)} style={styles.button}> Upload to S3</button>
            <p style={styles.font}>Files</p>
            <ul>{fileList.map((item,index)=>(
                <li key={index}><a href={url} onClick={handleDownload} style={styles.button}>{item}</a></li>
            ))}</ul>
        </div>
    </div>
}

export default UploadFile;