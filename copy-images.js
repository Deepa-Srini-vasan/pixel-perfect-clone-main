const fs = require('fs');
const path = require('path');

const srcDir = '/Users/wsploffi/.gemini/antigravity-ide/brain/9d8e236c-7930-476a-bc78-69627ae969e5';
const destDir = path.join(__dirname, 'public', 'plumtek-img');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const fileMapping = {
  'hq_blue_1779866745413.png': 'sakthi_hq_generated.png',
  'hoses_blue_1779866775062.png': 'suction_hoses_generated.png',
  'pipes_blue_1779866803629.png': 'ppr_pipes_generated.png',
  'elbow_blue_1779866861242.png': 'elbow_fitting_generated.png',
  'braided_blue_1779866880260.png': 'braided_hose_generated.png',
  'globe_blue_1779866899228.png': 'uganda_globe_generated.png',
  'taps_faucets_1779864994588.png': 'taps_faucets_generated.png',
  'lanka_showroom_1779865022105.png': 'lanka_showroom_generated.png',
  'plumtek_shield_1779865047326.png': 'plumtek_shield_generated.png',
  'mdpe_fitting_1779865074795.png': 'mdpe_fitting_generated.png',
  'fastfit_union_1779865101275.png': 'fastfit_union_generated.png'
};

Object.entries(fileMapping).forEach(([srcFile, destFile]) => {
  const srcPath = path.join(srcDir, srcFile);
  const destPath = path.join(destDir, destFile);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied: ${srcFile} -> ${destFile}`);
  } else {
    console.error(`Missing source file: ${srcPath}`);
  }
});
