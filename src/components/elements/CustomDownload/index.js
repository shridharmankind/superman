import React from 'react';
import {Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  PermissionsAndroid} from 'react-native';
import styles from './style';
import RNFetchBlob from 'rn-fetch-blob';


const CustomDownload = ({ }) => {
  const [showImage,setShowImage] = React.useState(false);
  const [filePath,setFileUrl] = React.useState(null);
  const fileUrl = 'https://www.techup.co.in/wp-content/uploads/2020/01/techup_logo_72-scaled.jpg';  
  let fileName = "";

  const checkPermission = async () => {
    
    // Function to check the platform
    // If Platform is Android then check for permissions.
 
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error','Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
      }
    }
  };


  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permission title",
          message:
            "Permission message",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the EXTERNAL_STORAGE");
        setShowImage(true);
      } else {
        console.log("EXTERNAL_STORAGE permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
 
  const downloadFile = () => {
    console.log("Downloading file")
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;    
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    fileName = RootDir+ '/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: fileName,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        console.log("filename -- ",res.data)
        setFileUrl('file://'+res.data);
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        const dirs = RNFetchBlob.fs.dirs
        console.log(dirs.DocumentDir)
        console.log(dirs.CacheDir)
        console.log(dirs.DCIMDir)
        console.log(dirs.DownloadDir)
        alert('File Downloaded Successfully.');
        requestStoragePermission();
      });
  };
 

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, textAlign: 'center' }}>
          React Native File Download Example

        </Text>
       
      </View>
      {showImage ? (
        <Text>Show Image value - {showImage}</Text>
        ) : (<Text>Show Image value - {showImage}</Text>)}
      <Text>{filePath}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={checkPermission}>
        <Text style={styles.text}>
          Download File
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// CustomDownload.propTypes = {
//   model: PropTypes.oneOf(['outlined', 'contained', 'text']),
//   title: PropTypes.string.isRequired,
//   testID: PropTypes.string,
//   onPress: PropTypes.func,
//   disabled: PropTypes.bool,
// };

export default CustomDownload;
