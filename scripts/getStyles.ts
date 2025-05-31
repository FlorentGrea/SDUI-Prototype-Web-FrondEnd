// scripts/generate-safelist.ts
import fs from 'fs';
import http from 'http';
import https from 'https';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const CONFIG_PATH = './tailwind.config.ts';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error('Error: NEXT_PUBLIC_API_URL is not defined in environment variables');
  process.exit(1);
}

// Choose http or https based on URL protocol
const client = API_URL.startsWith('https:') ? https : http;

client.get(API_URL + '/ui/styles/web', (res) => {
  let data = '';

  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('API Response:', response); // Debug log

      // Check if response has classNames property
      const classes = response.classNames || [];
      
      if (!Array.isArray(classes)) {
        console.error('Error: Expected an array of class names, got:', typeof classes);
        process.exit(1);
      }

      // Log each class name
      console.log('Processing Tailwind classes:');
      classes.forEach((className: string, index: number) => {
        console.log(`${index + 1}. ${className}`);
      });
      
      const safelist = `safelist: ${JSON.stringify(classes, null, 2)}`;

      // Read the current config
      let config = fs.readFileSync(CONFIG_PATH, 'utf-8');

      // Remove existing safelist if it exists
      config = config.replace(/safelist:[\s\S]*?],\s*/g, '');

      // Insert new safelist before the theme section, maintaining proper spacing
      config = config.replace(/(\s*)theme:/, `$1${safelist},\n$1theme:`);

      // Write back the modified config
      fs.writeFileSync(CONFIG_PATH, config);
      console.log('Safelist updated!');
    } catch (error) {
      console.error('Error processing API response:', error);
      console.error('Raw response:', data);
      process.exit(1);
    }
  });
}).on('error', (error) => {
  console.error('Error making API request:', error);
  process.exit(1);
});