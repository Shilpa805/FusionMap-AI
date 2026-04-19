import { DataModel } from '../models/DataModel.js';

export const handleUpload = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileMeta = req.file;
    let newPoints = [];

    // Parse logic based on mimetype / extension
    const mime = fileMeta.mimetype;
    const content = fileMeta.buffer.toString('utf-8');

    if (mime === 'application/json' || fileMeta.originalname.endsWith('.json')) {
      const parsed = JSON.parse(content);
      newPoints = Array.isArray(parsed) ? parsed : [parsed];
    } else if (mime === 'text/csv' || fileMeta.originalname.endsWith('.csv')) {
      // Basic CSV parsing for demo purposes
      const lines = content.split('\n').filter(l => l.trim() !== '');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      newPoints = lines.slice(1).map(line => {
        const values = line.split(',');
        const obj = {};
        headers.forEach((h, i) => {
          obj[h] = values[i] ? values[i].trim() : '';
        });
        
        return {
          id: obj.id || String(Date.now() + Math.random()),
          latitude: parseFloat(obj.latitude),
          longitude: parseFloat(obj.longitude),
          type: obj.type || 'OSINT',
          title: obj.title || 'Uploaded Data',
          description: obj.description || '',
          image: obj.image || ''
        };
      });
    } else if (mime.startsWith('image/')) {
        // Image logic: the user uploaded an image. Let's create a single dummy node for it at map center or random.
        // For a generic image, we might just create an IMINT point in a random spot in India.
        const rLat = 20 + Math.random() * 10;
        const rLng = 75 + Math.random() * 10;
        
        newPoints.push({
            id: String(Date.now()),
            latitude: rLat,
            longitude: rLng,
            type: 'IMINT',
            title: 'Image Intel Upload',
            description: `Image uploaded: ${fileMeta.originalname}`,
            image: '' // In a real app we'd save to S3/disk and attach URL
        });
    }

    // Filter valid points
    const validPoints = newPoints.filter(p => !isNaN(p.latitude) && !isNaN(p.longitude));
    
    if (validPoints.length === 0 && newPoints.length > 0) {
        return res.status(400).json({ message: 'No valid coordinates found in upload.' });
    }

    // Assign IDs if missing
    validPoints.forEach(p => {
        if(!p.id) p.id = String(Date.now() + Math.random());
    });

    const updatedData = DataModel.addPoints(validPoints);

    res.status(200).json({ 
        message: `Successfully processed ${validPoints.length} points.`, 
        data: updatedData,
        newPoints: validPoints
    });

  } catch (error) {
    console.error('Error handling upload:', error);
    res.status(500).json({ message: 'Error processing uploaded file', error: error.message });
  }
};
