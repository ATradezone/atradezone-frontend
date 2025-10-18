#!/usr/bin/env node

// Script to verify that pages follow the correct layout pattern
// This script checks that dashboard and settings pages don't include duplicate layout components

const fs = require('fs');
const path = require('path');

// Directories to check
const directoriesToCheck = [
  'src/app/dashboard',
  'src/app/settings'
];

// Layout components that should NOT be imported in pages
const forbiddenLayoutComponents = [
  'MainLayout',
  'Topbar',
  'Column1',
  'Column2',
  'Column1Skeleton',
  'Column2Skeleton',
  'TopbarSkeleton'
];

// Files to skip (known exceptions)
const skipFiles = [
  'src/app/layout.tsx', // Root layout is allowed to import MainLayout
  'src/components/layout/MainLayout.tsx' // MainLayout itself
];

function checkFile(filePath) {
  if (skipFiles.includes(filePath)) {
    return true;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check for forbidden imports
    const forbiddenImports = forbiddenLayoutComponents.filter(component => 
      content.includes(`import`) && content.includes(component)
    );
    
    if (forbiddenImports.length > 0) {
      console.log(`❌ ${filePath}: Contains forbidden layout imports: ${forbiddenImports.join(', ')}`);
      return false;
    }
    
    // Check for forbidden component usage
    const forbiddenUsage = forbiddenLayoutComponents.filter(component => 
      content.includes(`<${component}`) || content.includes(`</${component}`)
    );
    
    if (forbiddenUsage.length > 0) {
      console.log(`❌ ${filePath}: Contains forbidden layout components: ${forbiddenUsage.join(', ')}`);
      return false;
    }
    
    console.log(`✅ ${filePath}: Follows correct pattern`);
    return true;
  } catch (error) {
    console.log(`⚠️  ${filePath}: Could not read file - ${error.message}`);
    return true; // Don't fail the script for unreadable files
  }
}

function checkDirectory(dirPath) {
  let allValid = true;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      
      if (fs.statSync(fullPath).isDirectory()) {
        // Recursively check subdirectories
        if (!checkDirectory(fullPath)) {
          allValid = false;
        }
      } else if (item.endsWith('.tsx') || item.endsWith('.jsx')) {
        // Check TypeScript/JavaScript files
        if (!checkFile(fullPath)) {
          allValid = false;
        }
      }
    }
  } catch (error) {
    console.log(`⚠️  ${dirPath}: Could not read directory - ${error.message}`);
  }
  
  return allValid;
}

// Run the verification
console.log('Verifying layout pattern compliance...\n');

let allValid = true;

for (const dir of directoriesToCheck) {
  if (!checkDirectory(dir)) {
    allValid = false;
  }
}

console.log('\n' + '='.repeat(50));
if (allValid) {
  console.log('✅ All pages follow the correct layout pattern!');
} else {
  console.log('❌ Some pages have layout pattern issues. See details above.');
  process.exit(1);
}