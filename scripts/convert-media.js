const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Path to the public directory
const publicDir = path.join(__dirname, '..', 'public');

// Function to check if FFmpeg is installed
function checkFFmpeg() {
  return new Promise((resolve, reject) => {
    exec('ffmpeg -version', (error) => {
      if (error) {
        console.error('FFmpeg is not installed. Please install FFmpeg to continue.');
        reject(new Error('FFmpeg not installed'));
      } else {
        resolve();
      }
    });
  });
}

// Function to convert MP4 to WebM
function convertMP4ToWebM(inputFile, outputFile) {
  return new Promise((resolve, reject) => {
    console.log(`Converting ${inputFile} to WebM...`);
    
    // FFmpeg command to convert MP4 to WebM with good quality and compression
    const command = `ffmpeg -i "${inputFile}" -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus "${outputFile}"`;
    
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting ${inputFile} to WebM:`, error);
        reject(error);
      } else {
        console.log(`Successfully converted ${inputFile} to WebM`);
        resolve();
      }
    });
  });
}

// Function to convert GIF to MP4 and WebM
function convertGIFToVideo(inputFile, outputMP4, outputWebM) {
  return new Promise((resolve, reject) => {
    console.log(`Converting ${inputFile} to MP4 and WebM...`);
    
    // First convert GIF to MP4
    const mp4Command = `ffmpeg -i "${inputFile}" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${outputMP4}"`;
    
    exec(mp4Command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error converting ${inputFile} to MP4:`, error);
        reject(error);
      } else {
        console.log(`Successfully converted ${inputFile} to MP4`);
        
        // Then convert MP4 to WebM
        const webmCommand = `ffmpeg -i "${outputMP4}" -c:v libvpx-vp9 -crf 30 -b:v 0 "${outputWebM}"`;
        
        exec(webmCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error converting ${outputMP4} to WebM:`, error);
            reject(error);
          } else {
            console.log(`Successfully converted ${outputMP4} to WebM`);
            resolve();
          }
        });
      }
    });
  });
}

// Main function to process all media files
async function processMediaFiles() {
  try {
    // Check if FFmpeg is installed
    await checkFFmpeg();
    
    // Get all files in the public directory
    const files = fs.readdirSync(publicDir);
    
    // Process each file
    for (const file of files) {
      const filePath = path.join(publicDir, file);
      const fileExt = path.extname(file).toLowerCase();
      const fileName = path.basename(file, fileExt);
      
      // Skip if not a file
      if (!fs.statSync(filePath).isFile()) continue;
      
      // Process MP4 files
      if (fileExt === '.mp4') {
        const outputWebM = path.join(publicDir, `${fileName}.webm`);
        
        // Skip if WebM already exists
        if (!fs.existsSync(outputWebM)) {
          await convertMP4ToWebM(filePath, outputWebM);
        } else {
          console.log(`WebM version of ${file} already exists, skipping...`);
        }
      }
      
      // Process GIF files
      else if (fileExt === '.gif') {
        const outputMP4 = path.join(publicDir, `${fileName}.mp4`);
        const outputWebM = path.join(publicDir, `${fileName}.webm`);
        
        // Skip if both MP4 and WebM already exist
        if (!fs.existsSync(outputMP4) || !fs.existsSync(outputWebM)) {
          await convertGIFToVideo(filePath, outputMP4, outputWebM);
        } else {
          console.log(`Video versions of ${file} already exist, skipping...`);
        }
      }
    }
    
    console.log('All media files processed successfully!');
  } catch (error) {
    console.error('Error processing media files:', error);
  }
}

// Run the script
processMediaFiles();