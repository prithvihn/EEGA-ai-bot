export interface GuidanceStep {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface NearbyCenter {
  name: string;
  type: string;
  distance: string;
  eta: string;
  lat: number;
  lng: number;
}

export interface EmergencyNumber {
  label: string;
  number: string;
}

export interface MockEmergencyResult {
  type: string;
  confidence: number;
  steps: GuidanceStep[];
  nearbyCenters: NearbyCenter[];
  emergencyNumbers: EmergencyNumber[];
  source: string;
}

const NEARBY_CENTERS: NearbyCenter[] = [
  { name: 'Apollo Hospitals', type: 'Hospital', distance: '1.2 km', eta: '4 min', lat: 17.4485, lng: 78.3908 },
  { name: 'Yashoda Hospital', type: 'Hospital', distance: '2.8 km', eta: '9 min', lat: 17.4389, lng: 78.3922 },
  { name: 'Fire Station Secunderabad', type: 'Fire Station', distance: '3.1 km', eta: '10 min', lat: 17.4399, lng: 78.5022 },
  { name: 'Police Station Begumpet', type: 'Police', distance: '1.5 km', eta: '5 min', lat: 17.4432, lng: 78.4738 },
  { name: 'Govt. General Hospital', type: 'Hospital', distance: '4.2 km', eta: '12 min', lat: 17.4100, lng: 78.4700 },
  { name: 'Apollo Pharmacy 24/7', type: 'Pharmacy', distance: '0.8 km', eta: '3 min', lat: 17.4520, lng: 78.3850 },
];

const EMERGENCY_NUMBERS: EmergencyNumber[] = [
  { label: 'Ambulance', number: '108' },
  { label: 'Fire', number: '101' },
  { label: 'Police', number: '100' },
  { label: 'Disaster Management', number: '1070' },
  { label: 'Women Helpline', number: '1091' },
];

export const MOCK_EMERGENCY_RESULT: MockEmergencyResult = {
  type: 'CARDIAC ARREST',
  confidence: 94,
  steps: [
    { id: 1, icon: '📞', title: 'Call Emergency Services Immediately', description: 'Dial 108 (Ambulance) or 112 (Emergency). State clearly: cardiac arrest, your location, and that CPR is in progress.' },
    { id: 2, icon: '🫀', title: 'Start CPR - Chest Compressions', description: 'Place heel of hand on center of chest. Push hard and fast: 100-120 compressions per minute, 2 inches deep. Allow full chest recoil between compressions.' },
    { id: 3, icon: '💨', title: 'Rescue Breaths (If Trained)', description: 'After 30 compressions, tilt head back, lift chin, pinch nose. Give 2 breaths (1 second each). Continue 30:2 cycle until help arrives.' },
    { id: 4, icon: '⚡', title: 'Use AED If Available', description: 'Turn on AED, follow voice prompts. Apply pads as shown. Ensure no one touches victim during analysis. Deliver shock if advised.' },
  ],
  nearbyCenters: NEARBY_CENTERS,
  emergencyNumbers: EMERGENCY_NUMBERS.slice(0, 3),
  source: 'Protocol from: WHO First Aid Guidelines 2023',
};

export const SCENARIO_MOCK_DATA: Record<number, MockEmergencyResult> = {
  1: {
    type: 'FIRE/EXPLOSION',
    confidence: 96,
    steps: [
      { id: 1, icon: '🚨', title: 'Evacuate Immediately', description: 'Get everyone out of the building. Do not stop for belongings. Stay low to avoid smoke inhalation. Cover your mouth with a wet cloth if possible.' },
      { id: 2, icon: '📞', title: 'Call Fire Brigade (101)', description: 'Call 101 from a safe location. Give your exact address, what is burning, and if anyone is trapped inside.' },
      { id: 3, icon: '🚫', title: 'Do NOT Use Elevators', description: 'Use stairs only. Elevators can trap you if power fails. If exits are blocked, go to a room with a window and signal for help.' },
      { id: 4, icon: '🔄', title: 'Check for Burns', description: 'If someone has burns, cool under running water for 20 minutes. Cover with cling film or clean cloth. Do not burst blisters.' },
    ],
    nearbyCenters: [NEARBY_CENTERS[2], NEARBY_CENTERS[0], NEARBY_CENTERS[1]],
    emergencyNumbers: [{ label: 'Fire', number: '101' }, { label: 'Ambulance', number: '108' }, { label: 'Police', number: '100' }],
    source: 'National Disaster Management Authority Guidelines',
  },
  2: {
    type: 'SNAKE BITE',
    confidence: 92,
    steps: [
      { id: 1, icon: '🛑', title: 'Keep Victim Still', description: 'Movement spreads venom faster. Have the person lie down and stay calm. Immobilize the bitten limb with a splint.' },
      { id: 2, icon: '📞', title: 'Call 108 Ambulance Immediately', description: 'Give exact location. Note the time of bite. If possible, describe the snake (or take a photo from a safe distance).' },
      { id: 3, icon: '🧹', title: 'Remove Jewelry/Tight Clothing', description: 'Swelling will occur. Remove rings, watches, bracelets from the bitten limb before swelling worsens.' },
      { id: 4, icon: '❌', title: 'Do NOT: Tourniquet, Cut, or Suck', description: 'Never use a tourniquet, cut the wound, or try to suck venom. Apply a broad pressure bandage if trained. Keep the limb at heart level.' },
    ],
    nearbyCenters: NEARBY_CENTERS.filter((c) => c.type === 'Hospital'),
    emergencyNumbers: [{ label: 'Ambulance', number: '108' }, { label: 'Poison Control', number: '1800-116-117' }],
    source: 'Indian Red Cross First Aid Protocol',
  },
  3: {
    type: 'CARDIAC ARREST',
    confidence: 94,
    steps: [
      { id: 1, icon: '📞', title: 'Call Emergency Services Immediately', description: 'Dial 108 (Ambulance) or 112 (Emergency). State clearly: cardiac arrest, your location, and that CPR is in progress.' },
      { id: 2, icon: '🫀', title: 'Start CPR - Chest Compressions', description: 'Place heel of hand on center of chest. Push hard and fast: 100-120 compressions per minute, 2 inches deep. Allow full chest recoil between compressions.' },
      { id: 3, icon: '💨', title: 'Rescue Breaths (If Trained)', description: 'After 30 compressions, tilt head back, lift chin, pinch nose. Give 2 breaths (1 second each). Continue 30:2 cycle until help arrives.' },
      { id: 4, icon: '⚡', title: 'Use AED If Available', description: 'Turn on AED, follow voice prompts. Apply pads as shown. Ensure no one touches victim during analysis. Deliver shock if advised.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: EMERGENCY_NUMBERS.slice(0, 3),
    source: 'Protocol from: WHO First Aid Guidelines 2023',
  },
  4: {
    type: 'ROAD ACCIDENT',
    confidence: 95,
    steps: [
      { id: 1, icon: '🛑', title: 'Secure the Scene', description: 'Park your vehicle safely. Turn on hazard lights. Use triangles/warning signs to alert other vehicles. Ensure your own safety first.' },
      { id: 2, icon: '📞', title: 'Call 108 Ambulance & 100 Police', description: 'Give exact location (use landmarks, km markers). Report number of injured, vehicle types involved. Do not hang up until instructed.' },
      { id: 3, icon: '⚠️', title: 'Do NOT Move Injured Unless Necessary', description: 'Only move victims if there is immediate danger (fire, risk of another crash). Moving spine-injured victims can cause paralysis.' },
      { id: 4, icon: '🩹', title: 'Stop Severe Bleeding', description: 'Apply direct pressure with a clean cloth. If bone is visible, do not try to realign. Keep the person warm and conscious.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Ambulance', number: '108' }, { label: 'Police', number: '100' }, { label: 'Highway Helpline', number: '1033' }],
    source: 'Ministry of Road Transport Guidelines',
  },
  5: {
    type: 'FLOODING',
    confidence: 91,
    steps: [
      { id: 1, icon: '⬆️', title: 'Move to Higher Ground', description: 'Evacuate to the highest floor or rooftop if trapped. Do not walk or drive through floodwater — 6 inches can knock you down.' },
      { id: 2, icon: '📞', title: 'Call 108 / Disaster Helpline 1070', description: 'Report your location and number of people. Stay on the line for instructions. Use SMS if network is weak.' },
      { id: 3, icon: '⚡', title: 'Avoid Electrical Hazards', description: 'Do not touch electrical equipment if wet or standing in water. Turn off main power if safe to do so before water enters.' },
      { id: 4, icon: '💧', title: 'Boil Drinking Water', description: 'Flood water is contaminated. Use only boiled or bottled water. Watch for signs of infection if exposed to floodwater.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Disaster Management', number: '1070' }, { label: 'Ambulance', number: '108' }, { label: 'Police', number: '100' }],
    source: 'NDMA Flood Preparedness Protocol',
  },
  6: {
    type: 'ELECTRIC SHOCK',
    confidence: 93,
    steps: [
      { id: 1, icon: '⚡', title: 'Do NOT Touch the Victim', description: 'The person may still be in contact with the power source. Turn off the power at the mains or use a non-conductive object (wood, plastic) to move the victim away.' },
      { id: 2, icon: '📞', title: 'Call 108 Ambulance', description: 'Electric shock can cause internal burns and heart rhythm problems. Professional care is essential. Give exact location.' },
      { id: 3, icon: '🫀', title: 'Check Breathing and Pulse', description: 'If unresponsive and not breathing, start CPR immediately. Use an AED if available.' },
      { id: 4, icon: '🩹', title: 'Treat Burns', description: 'Cool any burns with running water. Cover with a sterile dressing. Do not apply ice, ointments, or break blisters.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: EMERGENCY_NUMBERS.slice(0, 3),
    source: 'St. John Ambulance First Aid',
  },
  7: {
    type: 'DROWNING',
    confidence: 97,
    steps: [
      { id: 1, icon: '🆘', title: 'Get Victim Out of Water Safely', description: 'Reach or throw, do not go in unless trained. Use a rope, pole, or lifebuoy. Call for help from others.' },
      { id: 2, icon: '📞', title: 'Call 108 Immediately', description: 'Start rescue while someone else calls. Drowning victims need oxygen fast. Every second counts.' },
      { id: 3, icon: '💨', title: 'Start Rescue Breaths if Not Breathing', description: 'Open airway, pinch nose, give 5 rescue breaths. Then 30 chest compressions, 2 breaths. Continue until help arrives.' },
      { id: 4, icon: '🧥', title: 'Treat Hypothermia', description: 'Remove wet clothing. Cover with dry blankets. Do not give food or drink. Keep the person still and warm.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Ambulance', number: '108' }, { label: 'Coast Guard', number: '1554' }],
    source: 'WHO Drowning Prevention Guidelines',
  },
  8: {
    type: 'HEAD INJURY',
    confidence: 90,
    steps: [
      { id: 1, icon: '🛑', title: 'Keep Person Still', description: 'Support head and neck. Do not move unless necessary. Movement can worsen spinal or brain injury.' },
      { id: 2, icon: '📞', title: 'Call 108 Ambulance', description: 'Describe the injury and how it happened. Note if the person lost consciousness, is confused, or vomiting.' },
      { id: 3, icon: '🩹', title: 'Control Bleeding', description: 'Apply gentle pressure with a clean cloth. Do not press hard if you suspect skull fracture. Cover wound loosely.' },
      { id: 4, icon: '👁️', title: 'Monitor Consciousness', description: 'Do not let them sleep for the first hour. Watch for unequal pupils, slurred speech, or seizures. These need urgent care.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: EMERGENCY_NUMBERS.slice(0, 3),
    source: 'National Institute of Mental Health Protocol',
  },
  9: {
    type: 'STABBING/BLEEDING',
    confidence: 96,
    steps: [
      { id: 1, icon: '🩹', title: 'Apply Direct Pressure', description: 'Use a clean cloth, gauze, or your hands. Press firmly on the wound for at least 10 minutes. Do not remove blood-soaked dressings — add more on top.' },
      { id: 2, icon: '📞', title: 'Call 108 Ambulance', description: 'Severe bleeding can cause shock and death in minutes. Keep pressure on while calling. Elevate the limb if possible and no fracture.' },
      { id: 3, icon: '🔄', title: 'If Object Is Embedded', description: 'Do NOT remove the object. Apply pressure around it. Bandage to secure it in place. Removing it can cause more bleeding.' },
      { id: 4, icon: '😌', title: 'Treat for Shock', description: 'Lie the person down. Raise legs if possible. Keep warm. Reassure them. Do not give food or drink.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Ambulance', number: '108' }, { label: 'Police', number: '100' }],
    source: 'British Red Cross Bleeding Control',
  },
  10: {
    type: 'POISONING',
    confidence: 89,
    steps: [
      { id: 1, icon: '📞', title: 'Call Poison Control 1800-116-117', description: 'Or call 108. Have the substance container ready. Do not induce vomiting unless directed — some poisons cause more damage coming up.' },
      { id: 2, icon: '🚫', title: 'Do NOT Give Milk or Water (Unless Advised)', description: 'Old advice said milk — this can accelerate absorption. Only give if Poison Control instructs. Never give activated charcoal unless prescribed.' },
      { id: 3, icon: '📦', title: 'Save the Substance', description: 'Keep the container, labels, and any vomit in a bag for medical staff. This helps identify the poison and correct treatment.' },
      { id: 4, icon: '🫀', title: 'CPR If Unresponsive', description: 'If the person stops breathing, start CPR. Protect yourself from contact with poison on their skin or mouth. Use a face shield if available.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Poison Control', number: '1800-116-117' }, { label: 'Ambulance', number: '108' }],
    source: 'National Poison Information Centre India',
  },
  11: {
    type: 'EARTHQUAKE',
    confidence: 94,
    steps: [
      { id: 1, icon: '🛡️', title: 'Drop, Cover, Hold On', description: 'Drop to the ground. Take cover under a sturdy table or against an interior wall. Hold on until shaking stops.' },
      { id: 2, icon: '🚪', title: 'Stay Away from Windows & Exterior Walls', description: 'Do not run outside during shaking. Glass and falling debris are major hazards. Wait for shaking to stop before evacuating.' },
      { id: 3, icon: '📞', title: 'Call 108 / 1070 After Shaking Stops', description: 'Check for injuries. Report trapped people. Use SMS if lines are busy. Avoid using phones unless necessary to preserve network.' },
      { id: 4, icon: '🔍', title: 'Check for Gas Leaks & Downed Wires', description: 'Smell for gas. Do not use lighters or switches. Evacuate if you suspect a leak. Watch for fallen power lines.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: [{ label: 'Disaster Management', number: '1070' }, { label: 'Ambulance', number: '108' }, { label: 'Police', number: '100' }],
    source: 'NDMA Earthquake Safety Protocol',
  },
  12: {
    type: 'CHOKING',
    confidence: 98,
    steps: [
      { id: 1, icon: '🤔', title: 'Assess: Can They Cough or Speak?', description: 'If they can cough or make sounds, encourage them to keep coughing. Do not slap their back. If they cannot breathe, act fast.' },
      { id: 2, icon: '✊', title: 'Heimlich Maneuver (Adults/Children)', description: 'Stand behind, wrap arms around waist. Make a fist above navel, thrust upward sharply 5 times. Repeat until object is dislodged.' },
      { id: 3, icon: '👶', title: 'Infants: Back Blows + Chest Thrusts', description: 'Place face-down on forearm, support head. Give 5 back blows between shoulder blades. Flip over, give 5 chest thrusts. Alternate until clear.' },
      { id: 4, icon: '📞', title: 'Call 108 If Unconscious', description: 'If they collapse, start CPR. Chest compressions can dislodge the object. Continue until help arrives.' },
    ],
    nearbyCenters: NEARBY_CENTERS,
    emergencyNumbers: EMERGENCY_NUMBERS.slice(0, 3),
    source: 'American Red Cross Choking Protocol',
  },
};

export const MOCK_SCENARIOS = [
  { id: 1, name: 'Fire/Explosion', icon: '🔥' },
  { id: 2, name: 'Snake Bite', icon: '🐍' },
  { id: 3, name: 'Cardiac Arrest', icon: '❤️' },
  { id: 4, name: 'Road Accident', icon: '🚗' },
  { id: 5, name: 'Flooding', icon: '🌊' },
  { id: 6, name: 'Electric Shock', icon: '⚡' },
  { id: 7, name: 'Drowning', icon: '🏊' },
  { id: 8, name: 'Head Injury', icon: '🤕' },
  { id: 9, name: 'Stabbing/Bleeding', icon: '🔪' },
  { id: 10, name: 'Poisoning', icon: '🧪' },
  { id: 11, name: 'Earthquake', icon: '🌪️' },
  { id: 12, name: 'Choking', icon: '😮‍💨' },
];

export const HOW_IT_WORKS_STEPS = [
  { id: 1, title: 'Location captured', description: 'Your GPS coordinates are secured for nearby help' },
  { id: 2, title: 'Emergency described', description: 'You type or speak your emergency' },
  { id: 3, title: 'AI classification (Gemini Pro)', description: 'AI identifies the emergency type and severity' },
  { id: 4, title: 'RAG protocol retrieval', description: 'Verified medical/emergency protocols are fetched' },
  { id: 5, title: 'Google Places search', description: 'Nearest hospitals, fire stations, police are found' },
  { id: 6, title: 'Route calculated', description: 'Optimal routes to help centers are computed' },
  { id: 7, title: 'Structured response assembled', description: 'Step-by-step guidance is compiled' },
  { id: 8, title: 'Map + guidance rendered', description: 'You see protocols and nearby help on screen' },
  { id: 9, title: 'SMS alert sent', description: 'Optional: Contacts are notified via SMS' },
];
