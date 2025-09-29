const institutes = [
  // Engineering Colleges
  {
    id: 1,
    name: 'International Institute of Information Technology (I2IT), Pune',
    type: 'Engineering',
    address: 'P-14, Rajiv Gandhi Infotech Park, Hinjawadi, Pune, Maharashtra 411057',
    website: 'https://www.isquareit.edu.in/'
  },
  {
    id: 2,
    name: 'College of Engineering Pune (COEP)',
    type: 'Engineering',
    address: 'Wellesley Rd, Shivajinagar, Pune, Maharashtra 411005',
    website: 'https://www.coep.org.in/',
    placementsAvg: '10-12 LPA (approx.)',
    highestPackage: '50+ LPA (approx.)',
    campusArea: '36 acres (approx.)',
    topRecruiters: ['TCS','Infosys','Cummins','Barclays'],
    examsAccepted: ['MHT-CET','JEE Main'],
    cutoffNote: 'Varies by branch; high for CSE/ENTC'
  },
  {
    id: 3,
    name: 'Veermata Jijabai Technological Institute (VJTI), Mumbai',
    type: 'Engineering',
    address: 'H R Mahajani Rd, Matunga, Mumbai, Maharashtra 400019',
    website: 'https://vjti.ac.in/',
    placementsAvg: '9-11 LPA (approx.)',
    highestPackage: '45+ LPA (approx.)',
    campusArea: '16 acres (approx.)',
    topRecruiters: ['TCS','L&T','JPMC','Deloitte'],
    examsAccepted: ['MHT-CET','JEE Main'],
    cutoffNote: 'Competitive cutoffs; CSE/IT highest'
  },
  {
    id: 4,
    name: 'Sardar Patel College of Engineering, Mumbai',
    type: 'Engineering',
    address: 'Bhavan’s Campus, Munshi Nagar, Andheri (W), Mumbai, Maharashtra 400058',
    website: 'https://www.spce.ac.in/'
  },
  {
    id: 5,
    name: 'Walchand College of Engineering, Sangli',
    type: 'Engineering',
    address: 'Vishrambag, Sangli, Maharashtra 416415',
    website: 'https://www.walchandsangli.ac.in/'
  },
  {
    id: 6,
    name: 'Government College of Engineering, Aurangabad',
    type: 'Engineering',
    address: 'Station Road, Osmanpura, Aurangabad, Maharashtra 431005',
    website: 'https://geca.ac.in/'
  },
  {
    id: 7,
    name: 'Pune Institute of Computer Technology (PICT), Pune',
    type: 'Engineering',
    address: 'Survey No. 27, Dhankawadi, Pune, Maharashtra 411043',
    website: 'https://www.pict.edu/'
  },
  {
    id: 8,
    name: 'Vishwakarma Institute of Technology (VIT), Pune',
    type: 'Engineering',
    address: '666, Upper Indira Nagar, Bibwewadi, Pune, Maharashtra 411037',
    website: 'https://www.vit.edu/'
  },
  {
    id: 9,
    name: 'Fr. Conceicao Rodrigues College of Engineering, Mumbai',
    type: 'Engineering',
    address: 'Fr. Agnel Ashram, Bandstand, Bandra (W), Mumbai, Maharashtra 400050',
    website: 'https://www.frcrce.ac.in/'
  },
  {
    id: 10,
    name: 'Sinhgad College of Engineering, Pune',
    type: 'Engineering',
    address: 'S. No. 44/1, Vadgaon (Bk), Off Sinhgad Road, Pune, Maharashtra 411041',
    website: 'http://www.sinhgad.edu/Sinhgad-Institutes/Engineering/SCOE/'
  },

  // Science Colleges
  {
    id: 11,
    name: 'Fergusson College, Pune',
    type: 'Science',
    address: 'Fergusson College Rd, Shivajinagar, Pune, Maharashtra 411004',
    website: 'https://www.fergusson.edu/'
  },
  {
    id: 12,
    name: 'St. Xavier’s College, Mumbai',
    type: 'Science',
    address: '5, Mahapalika Marg, Dhobi Talao, Mumbai, Maharashtra 400001',
    website: 'https://xaviers.edu/'
  },
  {
    id: 13,
    name: 'Ramnarain Ruia Autonomous College, Mumbai',
    type: 'Science',
    address: 'L. Nappu Road, Matunga, Mumbai, Maharashtra 400019',
    website: 'https://www.ruiacollege.edu/'
  },
  {
    id: 14,
    name: 'Nowrosjee Wadia College, Pune',
    type: 'Science',
    address: '19, Late Prin. V.K. Joag Path, Pune, Maharashtra 411001',
    website: 'https://nowrosjeewadiacollege.edu.in/'
  },
  {
    id: 15,
    name: 'Jai Hind College, Mumbai',
    type: 'Science',
    address: 'A Road, Churchgate, Mumbai, Maharashtra 400020',
    website: 'https://www.jaihindcollege.com/'
  },
  {
    id: 16,
    name: 'Elphinstone College, Mumbai',
    type: 'Science',
    address: '156, M.G. Road, Fort, Mumbai, Maharashtra 400032',
    website: 'https://elphinstone.ac.in/'
  },
  {
    id: 17,
    name: 'Modern College of Arts, Science and Commerce, Pune',
    type: 'Science',
    address: 'Shivajinagar, Pune, Maharashtra 411005',
    website: 'https://moderncollegepune.edu.in/'
  },
  {
    id: 18,
    name: 'K. J. Somaiya College of Science and Commerce, Mumbai',
    type: 'Science',
    address: 'Vidyanagar, Vidyavihar (E), Mumbai, Maharashtra 400077',
    website: 'https://kjssc.somaiya.edu.in/'
  },
  {
    id: 19,
    name: 'Wilson College, Mumbai',
    type: 'Science',
    address: 'Chowpatty Seaface, Mumbai, Maharashtra 400007',
    website: 'https://www.wilsoncollege.edu/'
  },
  {
    id: 20,
    name: 'S.P. College, Pune',
    type: 'Science',
    address: 'Tilak Road, Pune, Maharashtra 411030',
    website: 'https://www.spcollegepune.ac.in/'
  },

  // Commerce Colleges
  {
    id: 21,
    name: 'Brihan Maharashtra College of Commerce (BMCC), Pune',
    type: 'Commerce',
    address: '845, Shivajinagar, Pune, Maharashtra 411004',
    website: 'https://www.bmcc.ac.in/'
  },
  {
    id: 22,
    name: 'Narsee Monjee College of Commerce and Economics, Mumbai',
    type: 'Commerce',
    address: 'Vile Parle (W), Mumbai, Maharashtra 400056',
    website: 'https://www.nmcollege.in/'
  },
  {
    id: 23,
    name: 'H.R. College of Commerce and Economics, Mumbai',
    type: 'Commerce',
    address: '123, Dinshaw Wachha Road, Churchgate, Mumbai, Maharashtra 400020',
    website: 'https://www.hrcollege.edu/'
  },
  {
    id: 24,
    name: 'Symbiosis College of Arts and Commerce, Pune',
    type: 'Commerce',
    address: 'Senapati Bapat Road, Pune, Maharashtra 411004',
    website: 'https://www.symbiosiscollege.edu.in/'
  },
  {
    id: 25,
    name: 'K. P. B. Hinduja College of Commerce, Mumbai',
    type: 'Commerce',
    address: '315, New Charni Road, Mumbai, Maharashtra 400004',
    website: 'https://www.hindujacollege.com/'
  },
  {
    id: 26,
    name: 'M. L. Dahanukar College of Commerce, Mumbai',
    type: 'Commerce',
    address: 'Dixit Road, Vile Parle (E), Mumbai, Maharashtra 400057',
    website: 'https://www.mldcc.com/'
  },
  {
    id: 27,
    name: 'Pillai College of Arts, Commerce and Science, Navi Mumbai',
    type: 'Commerce',
    address: 'Dr. K. M. Vasudevan Pillai Campus, Sector 16, New Panvel, Navi Mumbai, Maharashtra 410206',
    website: 'https://www.pcacs.ac.in/'
  },
  {
    id: 28,
    name: 'St. Andrew’s College of Arts, Science and Commerce, Mumbai',
    type: 'Commerce',
    address: 'St. Dominic Road, Bandra (W), Mumbai, Maharashtra 400050',
    website: 'https://standrewscollege.ac.in/'
  },
  {
    id: 29,
    name: 'Mithibai College of Arts, Chauhan Institute of Science & Amrutben Jivanlal College of Commerce and Economics, Mumbai',
    type: 'Commerce',
    address: 'Vile Parle (W), Mumbai, Maharashtra 400056',
    website: 'https://www.mithibai.ac.in/'
  },
  {
    id: 30,
    name: 'SIES College of Commerce and Economics, Mumbai',
    type: 'Commerce',
    address: 'Plot 71, Sion (E), Mumbai, Maharashtra 400022',
    website: 'https://www.siesce.edu.in/'
  },

  // Arts Colleges
  {
    id: 31,
    name: 'Sir J. J. School of Art, Mumbai',
    type: 'Arts',
    address: '78, Dr. D. N. Road, Fort, Mumbai, Maharashtra 400001',
    website: 'https://www.sirjjsoa.org/'
  },
  {
    id: 32,
    name: 'St. Xavier’s College, Mumbai',
    type: 'Arts',
    address: '5, Mahapalika Marg, Dhobi Talao, Mumbai, Maharashtra 400001',
    website: 'https://xaviers.edu/'
  },
  {
    id: 33,
    name: 'Fergusson College, Pune',
    type: 'Arts',
    address: 'Fergusson College Rd, Shivajinagar, Pune, Maharashtra 411004',
    website: 'https://www.fergusson.edu/'
  },
  {
    id: 34,
    name: 'Ramnarain Ruia Autonomous College, Mumbai',
    type: 'Arts',
    address: 'L. Nappu Road, Matunga, Mumbai, Maharashtra 400019',
    website: 'https://www.ruiacollege.edu/'
  },
  {
    id: 35,
    name: 'Sophia College for Women, Mumbai',
    type: 'Arts',
    address: 'Bhulabhai Desai Road, Mumbai, Maharashtra 400026',
    website: 'https://sophiacollegemumbai.com/'
  },
  {
    id: 36,
    name: 'Elphinstone College, Mumbai',
    type: 'Arts',
    address: '156, M.G. Road, Fort, Mumbai, Maharashtra 400032',
    website: 'https://elphinstone.ac.in/'
  },
  {
    id: 37,
    name: 'Wilson College, Mumbai',
    type: 'Arts',
    address: 'Chowpatty Seaface, Mumbai, Maharashtra 400007',
    website: 'https://www.wilsoncollege.edu/'
  },
  {
    id: 38,
    name: 'Modern College of Arts, Science and Commerce, Pune',
    type: 'Arts',
    address: 'Shivajinagar, Pune, Maharashtra 411005',
    website: 'https://moderncollegepune.edu.in/'
  },
  {
    id: 39,
    name: 'St. Mira’s College for Girls, Pune',
    type: 'Arts',
    address: '6, Koregaon Park Rd, Pune, Maharashtra 411001',
    website: 'https://www.stmirascollegepune.edu.in/'
  },
  {
    id: 40,
    name: 'K. J. Somaiya College of Arts and Commerce, Mumbai',
    type: 'Arts',
    address: 'Vidyanagar, Vidyavihar (E), Mumbai, Maharashtra 400077',
    website: 'https://kjsac.somaiya.edu.in/'
  },

  // India-wide notable colleges appended
  { id: 101, name: 'IIT Bombay', type: 'Engineering', address: 'Powai, Mumbai, Maharashtra 400076 (India)', website: 'https://www.iitb.ac.in/', placementsAvg: '20-24 LPA (approx.)', highestPackage: '1+ Cr LPA (approx.)', campusArea: '550 acres (approx.)', topRecruiters: ['Google','Microsoft','Amazon','NVIDIA'], examsAccepted: ['JEE Advanced'], cutoffNote: 'Top All India ranks needed' },
  { id: 102, name: 'IIT Delhi', type: 'Engineering', address: 'Hauz Khas, New Delhi 110016 (India)', website: 'https://home.iitd.ac.in/', placementsAvg: '20-25 LPA (approx.)', highestPackage: '1+ Cr LPA (approx.)', campusArea: '320 acres (approx.)', topRecruiters: ['Google','Apple','Meta','McKinsey'], examsAccepted: ['JEE Advanced'], cutoffNote: 'Top All India ranks needed' },
  { id: 103, name: 'IIT Madras', type: 'Engineering', address: 'Chennai, Tamil Nadu 600036 (India)', website: 'https://www.iitm.ac.in/', placementsAvg: '20-23 LPA (approx.)', highestPackage: '1+ Cr LPA (approx.)', campusArea: '617 acres (approx.)', topRecruiters: ['Qualcomm','Texas Instruments','Amazon'], examsAccepted: ['JEE Advanced'], cutoffNote: 'Top All India ranks needed' },
  { id: 105, name: 'BITS Pilani', type: 'Engineering', address: 'Pilani, Rajasthan 333031 (India)', website: 'https://www.bits-pilani.ac.in/', placementsAvg: '18-20 LPA (approx.)', highestPackage: '60+ LPA (approx.)', campusArea: '328 acres (approx.)', topRecruiters: ['Adobe','Flipkart','Sprinklr'], examsAccepted: ['BITSAT'], cutoffNote: 'High BITSAT score required' },
  { id: 106, name: 'IISc Bangalore', type: 'Science', address: 'CV Raman Rd, Bengaluru, Karnataka 560012 (India)', website: 'https://www.iisc.ac.in/', placementsAvg: '—', highestPackage: '—', campusArea: '372 acres (approx.)', topRecruiters: ['Research Labs','Deep Tech'], examsAccepted: ['JEE Main','JEE Advanced','NEET','IISER IAT'], cutoffNote: 'Varies by route' },
  { id: 110, name: 'SRCC, Delhi University', type: 'Commerce', address: 'Maurice Nagar, Delhi 110007 (India)', website: 'https://www.srcc.edu/', placementsAvg: '10-12 LPA (approx.)', highestPackage: '25+ LPA (approx.)', campusArea: '17 acres (approx.)', topRecruiters: ['EY','Deloitte','KPMG'], examsAccepted: ['CUET (UG)'], cutoffNote: 'High CUET percentile for Eco(H)/B.Com(H)' }
];

async function getAllInstitutes() {
  const defaultsByType = (type) => {
    const t = (type || '').toLowerCase();
    if (t === 'engineering') {
      return {
        placementsAvg: '6-10 LPA (typical)',
        highestPackage: '25-60 LPA (typical)',
        examsAccepted: ['JEE Main','State CET'],
      };
    }
    if (t === 'science') {
      return {
        placementsAvg: '—',
        highestPackage: '—',
        examsAccepted: ['CUET (UG)','NEET (medical)'],
      };
    }
    if (t === 'commerce') {
      return {
        placementsAvg: '4-8 LPA (typical)',
        highestPackage: '15-25 LPA (typical)',
        examsAccepted: ['CUET (UG)'],
      };
    }
    if (t === 'arts') {
      return {
        placementsAvg: '—',
        highestPackage: '—',
        examsAccepted: ['CUET (UG)','Design/Media (if applicable)'],
      };
    }
    return { placementsAvg: '—', highestPackage: '—', examsAccepted: ['—'] };
  };

  return institutes.map(i => ({
    placementsAvg: defaultsByType(i.type).placementsAvg,
    highestPackage: defaultsByType(i.type).highestPackage,
    campusArea: '—',
    topRecruiters: [],
    examsAccepted: defaultsByType(i.type).examsAccepted,
    cutoffNote: '—',
    ...i
  }));
}
async function addInstitute(institute) { institutes.push(institute); }
async function updateInstitute(id, update) {
  const idx = institutes.findIndex(i => i.id == id);
  if (idx === -1) return null;
  institutes[idx] = { ...institutes[idx], ...update };
  return institutes[idx];
}
async function deleteInstitute(id) {
  const idx = institutes.findIndex(i => i.id == id);
  if (idx === -1) return null;
  return institutes.splice(idx, 1)[0];
}

module.exports = { getAllInstitutes, addInstitute, updateInstitute, deleteInstitute } 