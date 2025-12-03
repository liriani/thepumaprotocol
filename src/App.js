import React, { useState, useEffect } from 'react';
import {
    Cat,
    Bed,
    Dog,
    Droplets,
    MapPin,
    Radio,
    CheckCircle2,
    AlertCircle,
    Terminal,
    Heart,
    ChevronRight,
    Utensils,
    Sun,
    Wind,
    ArrowLeft,
    Signal,
    Undo2,
    X,
    Trash2,
    Coffee,
    Sparkles,
    RefreshCw,
    Info,
    ShieldAlert,
    PenTool,
    Skull
} from 'lucide-react';

const MISSIONS = {
    LITTER: { id: 'litter', category: 'pets', title: 'Bio-Hazard (Monk Protocol)', icon: <Cat size={16} />, completed: false },
    WATER: { id: 'water', category: 'pets', title: 'Eco-Hydration (Priscilão)', icon: <Droplets size={16} />, completed: false },
    DOGFOOD: { id: 'dogfood', category: 'pets', title: 'K9 Sustenance (Puma)', icon: <Dog size={16} />, completed: false },
    SHEETS: { id: 'sheets', category: 'house', title: 'Fabric Reset (Cali Roll)', icon: <Bed size={16} />, completed: false },
    VACUUM: { id: 'vacuum', category: 'house', title: 'Debris Removal (Vacuum)', icon: <Wind size={16} />, completed: false },
    TRASH: { id: 'trash', category: 'house', title: 'Waste Extraction (Trash)', icon: <Trash2 size={16} />, completed: false },
    HYDRATE_SELF: { id: 'hydrate_self', category: 'self', title: 'Operator Fuel (Water)', icon: <Coffee size={16} />, completed: false },
    GRAPHIC_NOVEL: { id: 'graphic_novel', category: 'self', title: 'Creative Mode (Graphic Novel)', icon: <PenTool size={16} />, completed: false },
    SNACK: { id: 'snack', category: 'self', title: 'Dopamine Input (Snack)', icon: <Sparkles size={16} />, completed: false },
    SELFCARE: { id: 'selfcare', category: 'boss', title: 'FINAL BOSS: The Gauntlet', icon: <Skull size={16} />, completed: false },
};

const LOCATIONS = {
    HQ: { color: 'from-slate-900 to-slate-800', accent: 'text-cyan-400', border: 'border-cyan-500/50' },
    LONDON: { color: 'from-indigo-950 to-purple-900', accent: 'text-pink-400', border: 'border-pink-500/50' },
    BIO_ZONE: { color: 'from-emerald-950 to-teal-900', accent: 'text-emerald-400', border: 'border-emerald-500/50' },
    SLEEP_CHAMBER: { color: 'from-blue-950 to-indigo-900', accent: 'text-blue-400', border: 'border-blue-500/50' },
    KITCHEN: { color: 'from-orange-950 to-amber-900', accent: 'text-amber-400', border: 'border-amber-500/50' },
    OUTSIDE: { color: 'from-sky-900 to-cyan-800', accent: 'text-yellow-300', border: 'border-yellow-400/50' },
    SELF_ZONE: { color: 'from-pink-950 to-rose-900', accent: 'text-rose-400', border: 'border-rose-500/50' }
};

const SCRIPT = {
    START: {
        id: 'START',
        speaker: 'SYSTEM',
        text: "INCOMING TRANSMISSION FROM SECTOR [LONDON]. ENCRYPTED CHANNEL DETECTED.",
        location: 'HQ',
        choices: [
            { text: "Accept Transmission (Standard)", next: 'INTRO_1' },
            { text: "Hack Frequency: Is this a prank?", next: 'START_FUN' }
        ]
    },
    START_FUN: {
        id: 'START_FUN',
        speaker: 'Operator (London)',
        text: "Access Granted. No prank, Agent. Just me trying to make chores epic so you don't die of boredom. Also, I love you. Now, back to business.",
        location: 'LONDON',
        choices: [
            { text: "Love you too. Proceed.", next: 'INTRO_1' }
        ]
    },
    INTRO_1: {
        id: 'INTRO_1',
        speaker: 'Operator (London)',
        text: "Control here. I've been monitoring the apartment status. The entropy levels are rising. We need to restore order before the pets take over.",
        location: 'LONDON',
        choices: [
            { text: "Standing by for orders.", next: 'INTRO_2' },
            { text: "Puma misses you.", next: 'INTRO_PUMA_LIE' }
        ]
    },
    INTRO_PUMA_LIE: {
        id: 'INTRO_PUMA_LIE',
        speaker: 'Operator (London)',
        text: "Agent, we both know she is a liar. That black dog has personality. She doesn't miss *me*, she misses her premium service provider.",
        location: 'LONDON',
        choices: [
            { text: "True. She just wants things done HER way.", next: 'INTRO_PUMA_TRUTH' }
        ]
    },
    INTRO_PUMA_TRUTH: {
        id: 'INTRO_PUMA_TRUTH',
        speaker: 'Operator (London)',
        text: "Exactly. Tell her I'll be back to scratch her ears soon. But first, we need to ensure her habitat is optimal. And yours.",
        location: 'LONDON',
        choices: [
            { text: "Copy that. Let's work.", next: 'HUB_SELECT' }
        ]
    },
    INTRO_2: {
        id: 'INTRO_2',
        speaker: 'Operator (London)',
        text: "Directives include sand redistribution, plant hydration, and a critical solar recharge for you. I've split them into batches.",
        location: 'LONDON',
        choices: [
            { text: "Accessing Mission Log.", next: 'HUB_SELECT' }
        ]
    },
    HUB_SELECT: {
        id: 'HUB_SELECT',
        speaker: 'AI Assistant',
        text: "Main Menu. Select a Reality Channel to synchronize.",
        location: 'HQ',
        choices: [
            { text: "Priority Alpha: BIOLOGICAL ASSETS (Pets)", action: 'SET_HUB_PETS' },
            { text: "Priority Beta: HABITAT CONTROL (House)", action: 'SET_HUB_HOUSE' },
            { text: "Priority Gamma: OPERATOR BUFFS (You)", action: 'SET_HUB_SELF' },
            { text: "Priority Omega: THE OUTLANDS (Danger)", action: 'SET_HUB_BOSS' }
        ]
    },
    HUB: {
        id: 'HUB',
        speaker: 'AI Assistant',
        text: "Placeholder text - this will be replaced dynamically.",
        location: 'HQ',
        isHub: true
    },
    LITTER_START: {
        id: 'LITTER_START',
        speaker: 'Operator (London)',
        text: "Objective Alpha: The Sand Exchange. This is a multi-stage operation. First, neutralize the existing threat.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Approaching containment unit.", next: 'LITTER_SCOOP' }
        ]
    },
    LITTER_SCOOP: {
        id: 'LITTER_SCOOP',
        speaker: 'Instruction Manual',
        text: "STEP 1: Retrieval. Use the scoop. Remove solid waste clumps. Bag them immediately. Do NOT establish eye contact.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Solids removed. Eyes averted. (Standard)", next: 'LITTER_LOGISTICS' },
            { text: "Scan for Monk's Toxic Residue.", next: 'LITTER_MONK' },
            { text: "Hold breath and Gag dramatically.", next: 'LITTER_DRAMA' }
        ]
    },
    LITTER_DRAMA: {
        id: 'LITTER_DRAMA',
        speaker: 'Operator (London)',
        text: "Drama detected. It is just organic waste processed by a cute creature. Stop gagging and finish the job, soldier.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Roger that. Resuming operation.", next: 'LITTER_LOGISTICS' }
        ]
    },
    LITTER_MONK: {
        id: 'LITTER_MONK',
        speaker: 'Operator (London)',
        text: "Scanning... WARNING. Radioactive isotopes detected. That little cat is a nuclear reactor. Ensure NO toxic remnants remain.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Sector decontaminated.", next: 'LITTER_LOGISTICS' }
        ]
    },
    LITTER_LOGISTICS: {
        id: 'LITTER_LOGISTICS',
        speaker: 'Operator (London)',
        text: "Excellent. Now for the logistics. I left half a packet of sand. Do NOT put it in the small box.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Understood. What is the procedure?", next: 'LITTER_TRANSFER_1' }
        ]
    },
    LITTER_TRANSFER_1: {
        id: 'LITTER_TRANSFER_1',
        speaker: 'Operator (London)',
        text: "STEP 2: Consolidation. Take the remaining clean sand from the LARGE box and pour it into the SMALL box.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Transfer complete. Large box is empty.", next: 'LITTER_TRANSFER_2' }
        ]
    },
    LITTER_TRANSFER_2: {
        id: 'LITTER_TRANSFER_2',
        speaker: 'Instruction Manual',
        text: "STEP 3: The Fresh Supply. Take the new half-packet of sand. Pour the ENTIRE contents into the now-empty LARGE box.",
        location: 'BIO_ZONE',
        choices: [
            { text: "Fresh sand deployed to Large Box.", next: 'LITTER_COMPLETE' }
        ]
    },
    LITTER_COMPLETE: {
        id: 'LITTER_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Sand rotation complete. Monk's throne is restored.",
        location: 'BIO_ZONE',
        action: 'COMPLETE_LITTER',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    VACUUM_START: {
        id: 'VACUUM_START',
        speaker: 'Operator (London)',
        text: "Objective Epsilon: Floor Integrity. Fur levels are rising. Deploy the Vacuum Unit.",
        location: 'HQ',
        choices: [
            { text: "Initiating suction sequence.", next: 'VACUUM_ACTION' }
        ]
    },
    VACUUM_ACTION: {
        id: 'VACUUM_ACTION',
        speaker: 'Instruction Manual',
        text: "Sectors: Focus on Puma's bed area (even though she's Frozen and steals our bed). Also, the living room rug—Monk is smuggling sand there like a tiny criminal.",
        location: 'HQ',
        choices: [
            { text: "Sectors cleared.", next: 'VACUUM_COMPLETE' },
            { text: "Found a lost cat toy!", next: 'VACUUM_TOY' }
        ]
    },
    VACUUM_TOY: {
        id: 'VACUUM_TOY',
        speaker: 'Operator (London)',
        text: "A relic from the past! Rescue it immediately. Do not vacuum the artifact.",
        location: 'HQ',
        choices: [
            { text: "Toy rescued. Floors stabilized.", next: 'VACUUM_COMPLETE' }
        ]
    },
    VACUUM_COMPLETE: {
        id: 'VACUUM_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Air quality improved.",
        location: 'HQ',
        action: 'COMPLETE_VACUUM',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    TRASH_START: {
        id: 'TRASH_START',
        speaker: 'Operator (London)',
        text: "Objective Zeta: Waste Extraction. The bin is reaching critical capacity.",
        location: 'KITCHEN',
        choices: [
            { text: "Sealing the bag.", next: 'TRASH_ACTION' }
        ]
    },
    TRASH_ACTION: {
        id: 'TRASH_ACTION',
        speaker: 'Instruction Manual',
        text: "Tie it tight. Do not let it leak. Transport it to the external containment unit (the big bin outside).",
        location: 'KITCHEN',
        choices: [
            { text: "Waste extracted (Standard Walk).", next: 'TRASH_COMPLETE' },
            { text: "Attempt 'Kobe Bryant' Throw.", next: 'TRASH_KOBE' }
        ]
    },
    TRASH_KOBE: {
        id: 'TRASH_KOBE',
        speaker: 'System',
        text: "CALCULATION: Wind speed ignored. Trajectory failed. You missed the bin.",
        location: 'KITCHEN',
        choices: [
            { text: "Sigh. Pick it up and do it right.", next: 'TRASH_COMPLETE' }
        ]
    },
    TRASH_COMPLETE: {
        id: 'TRASH_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Environment sanitized.",
        location: 'KITCHEN',
        action: 'COMPLETE_TRASH',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    SHEETS_START: {
        id: 'SHEETS_START',
        speaker: 'Operator (London)',
        text: "Objective Beta: The Duvet. We are using the 'California Roll' method. It is logical and requires zero fighting with ghosts.",
        location: 'SLEEP_CHAMBER',
        choices: [
            { text: "Step 1: Preparation.", next: 'SHEETS_ROLL_1' }
        ]
    },
    SHEETS_ROLL_1: {
        id: 'SHEETS_ROLL_1',
        speaker: 'Instruction Manual',
        text: "ACTION: Take the fresh duvet cover. Turn it INSIDE OUT. Lay it completely flat on the bed. The opening should be at the foot of the bed.",
        location: 'SLEEP_CHAMBER',
        choices: [
            { text: "Cover is flat and inside-out.", next: 'SHEETS_ROLL_2' }
        ]
    },
    SHEETS_ROLL_2: {
        id: 'SHEETS_ROLL_2',
        speaker: 'Instruction Manual',
        text: "ACTION: Take the duvet (the thick part). Lay it directly ON TOP of the flat cover. Match all four corners perfectly.",
        location: 'SLEEP_CHAMBER',
        choices: [
            { text: "Duvet is aligned on top.", next: 'SHEETS_ROLL_3' }
        ]
    },
    SHEETS_ROLL_3: {
        id: 'SHEETS_ROLL_3',
        speaker: 'Instruction Manual',
        text: "ACTION: Start at the HEAD of the bed (closed side). Roll both the duvet and cover together towards the foot of the bed. Like rolling a burrito.",
        location: 'SLEEP_CHAMBER',
        choices: [
            { text: "It is now a long sausage.", next: 'SHEETS_ROLL_4' }
        ]
    },
    SHEETS_ROLL_4: {
        id: 'SHEETS_ROLL_4',
        speaker: 'Instruction Manual',
        text: "ACTION: Reach into the opening of the roll. Grab the roll and FLIP the cover over the ends. Then, simply unroll it back towards the head of the bed.",
        location: 'SLEEP_CHAMBER',
        choices: [
            { text: "Unrolling... It worked!", next: 'SHEETS_COMPLETE' },
            { text: "Magic. Pure magic.", next: 'SHEETS_COMPLETE' }
        ]
    },
    SHEETS_COMPLETE: {
        id: 'SHEETS_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Bed is crisp. Logic prevailed.",
        location: 'SLEEP_CHAMBER',
        action: 'COMPLETE_SHEETS',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    WATER_START: {
        id: 'WATER_START',
        speaker: 'Operator (London)',
        text: "Objective Gamma: Hydration Recycling. We need to change the pet water, but we are not wasting resources.",
        location: 'KITCHEN',
        choices: [
            { text: "Approaching bowls.", next: 'WATER_STEP_1' }
        ]
    },
    WATER_STEP_1: {
        id: 'WATER_STEP_1',
        speaker: 'Operator (London)',
        text: "PROTOCOL: Do not dump the old water in the sink. Pour the old pet water into the plant pots. **Especially Priscilão.** She is thirsty.",
        location: 'KITCHEN',
        choices: [
            { text: "Priscilão watered. Bowls empty.", next: 'WATER_STEP_2' },
            { text: "Talk to Priscilão (The Plant).", next: 'WATER_TALK' }
        ]
    },
    WATER_TALK: {
        id: 'WATER_TALK',
        speaker: 'Priscilão (The Plant)',
        text: "... (She appreciates the water. She judges you silently for not doing this sooner).",
        location: 'KITCHEN',
        choices: [
            { text: "Sorry, Priscilão. Proceeding.", next: 'WATER_STEP_2' }
        ]
    },
    WATER_STEP_2: {
        id: 'WATER_STEP_2',
        speaker: 'Instruction Manual',
        text: "Clean the bowls to remove slime. Refill with cold, fresh water for the squad.",
        location: 'KITCHEN',
        choices: [
            { text: "Refill complete.", next: 'WATER_COMPLETE' }
        ]
    },
    WATER_COMPLETE: {
        id: 'WATER_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Double hydration achieved (Fauna + Priscilão).",
        location: 'KITCHEN',
        action: 'COMPLETE_WATER',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    SELFCARE_START: {
        id: 'SELFCARE_START',
        speaker: 'System',
        text: "WARNING: CLASS 5 BOSS FIGHT DETECTED. Mission: 'The Gauntlet'. Parameters: Survival.",
        location: 'OUTSIDE',
        choices: [
            { text: "Equip Leash. Check Radar.", next: 'SELFCARE_ELEVATOR' },
            { text: "ABORT: It's too dangerous.", next: 'SELFCARE_ABORT' }
        ]
    },
    SELFCARE_ELEVATOR: {
        id: 'SELFCARE_ELEVATOR',
        speaker: 'Operator (London)',
        text: "Stage 1: The Vertical Transport. Praying for zero neighbors in the elevator. Maintain stealth.",
        location: 'OUTSIDE',
        choices: [
            { text: "Coast is clear. Exiting lobby.", next: 'SELFCARE_WEATHER' },
            { text: "ABORT: Someone is coming! RUN!", next: 'SELFCARE_ABORT' }
        ]
    },
    SELFCARE_WEATHER: {
        id: 'SELFCARE_WEATHER',
        speaker: 'System',
        text: "Stage 2: Environmental Check. Is it raining? If water touches the asset, mission failure is imminent.",
        location: 'OUTSIDE',
        choices: [
            { text: "Sky is clear. Proceed.", next: 'SELFCARE_ENEMIES' },
            { text: "It's drizzling. ABORT.", next: 'SELFCARE_ABORT' }
        ]
    },
    SELFCARE_ENEMIES: {
        id: 'SELFCARE_ENEMIES',
        speaker: 'Puma (The Dog)',
        text: "*Ears perked* *Growling low* TARGET ACQUIRED: The Archenemy (A huge black dog she hates. Definitely her nemesis).",
        location: 'OUTSIDE',
        choices: [
            { text: "Evasive maneuvers! Cross the street!", next: 'SELFCARE_VICTORY' },
            { text: "ABORT: Tactical Retreat!", next: 'SELFCARE_ABORT' }
        ]
    },
    SELFCARE_VICTORY: {
        id: 'SELFCARE_VICTORY',
        speaker: 'Operator (London)',
        text: "Threat evaded. You survived the gauntlet. Now she is refusing to walk back home because she wants to sniff a leaf.",
        location: 'OUTSIDE',
        choices: [
            { text: "Mission Accomplished (Barely).", next: 'SELFCARE_COMPLETE' }
        ]
    },
    SELFCARE_ABORT: {
        id: 'SELFCARE_ABORT',
        speaker: 'System',
        text: "MISSION ABORTED. Returning to base. Safety first. We try again later.",
        location: 'OUTSIDE',
        action: 'ABORT_SELFCARE',
        choices: [
            { text: "Teleport to Safety.", next: 'HUB' }
        ]
    },
    SELFCARE_COMPLETE: {
        id: 'SELFCARE_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Boss defeated. Asset returned to containment.",
        location: 'OUTSIDE',
        action: 'COMPLETE_SELFCARE',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    GRAPHIC_NOVEL_START: {
        id: 'GRAPHIC_NOVEL_START',
        speaker: 'Operator (London)',
        text: "Objective Psi: Creative Flow. I checked the forecast. The weather in Barcelona is optimal for 'Relax Mode'.",
        location: 'SELF_ZONE',
        choices: [
            { text: "Initiate Art Protocol.", next: 'GRAPHIC_NOVEL_ACTION' }
        ]
    },
    GRAPHIC_NOVEL_ACTION: {
        id: 'GRAPHIC_NOVEL_ACTION',
        speaker: 'Instruction Manual',
        text: "Sit down. Get comfortable. Work on your Graphic Novel. No pressure, just flow. You are brilliant.",
        location: 'SELF_ZONE',
        choices: [
            { text: "Pages produced. Mind relaxed.", next: 'GRAPHIC_NOVEL_COMPLETE' }
        ]
    },
    GRAPHIC_NOVEL_COMPLETE: {
        id: 'GRAPHIC_NOVEL_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Masterpiece in progress.",
        location: 'SELF_ZONE',
        action: 'COMPLETE_GRAPHIC_NOVEL',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    HYDRATE_SELF_START: {
        id: 'HYDRATE_SELF_START',
        speaker: 'Operator (London)',
        text: "Objective Sigma: Operator Hydration. You've watered the pets. You've watered Priscilão. Have you watered yourself?",
        location: 'SELF_ZONE',
        choices: [
            { text: "Checking internal levels... low.", next: 'HYDRATE_SELF_ACTION' }
        ]
    },
    HYDRATE_SELF_ACTION: {
        id: 'HYDRATE_SELF_ACTION',
        speaker: 'Instruction Manual',
        text: "Drink one full glass of water. Not cocoa. Not soda. Water. H2O.",
        location: 'SELF_ZONE',
        choices: [
            { text: "Consumed.", next: 'HYDRATE_SELF_COMPLETE' }
        ]
    },
    HYDRATE_SELF_COMPLETE: {
        id: 'HYDRATE_SELF_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Brain function optimized.",
        location: 'SELF_ZONE',
        action: 'COMPLETE_HYDRATE_SELF',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    SNACK_START: {
        id: 'SNACK_START',
        speaker: 'Operator (London)',
        text: "Objective Tau: Fuel Injection. You need energy. And maybe a little treat.",
        location: 'SELF_ZONE',
        choices: [
            { text: "Scanning pantry.", next: 'SNACK_ACTION' }
        ]
    },
    SNACK_ACTION: {
        id: 'SNACK_ACTION',
        speaker: 'Instruction Manual',
        text: "Eat something. A real snack. Enjoy it. Do not look at screens while eating. Just taste the food.",
        location: 'SELF_ZONE',
        choices: [
            { text: "Dopamine acquired.", next: 'SNACK_COMPLETE' }
        ]
    },
    SNACK_COMPLETE: {
        id: 'SNACK_COMPLETE',
        speaker: 'System',
        text: "MISSION SUCCESS. Mood elevated.",
        location: 'SELF_ZONE',
        action: 'COMPLETE_SNACK',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    DOGFOOD_START: {
        id: 'DOGFOOD_START',
        speaker: 'Operator (London)',
        text: "Objective Delta: Puma's Lunch. Verify hunger levels. WARNING: Subject is highly manipulative.",
        location: 'KITCHEN',
        choices: [
            { text: "Inspect Bowl Visuals", next: 'DOGFOOD_CHECK' },
            { text: "Analyze Audio (The Whine)", next: 'DOGFOOD_WHINE' },
            { text: "Analyze Visuals (The Stare)", next: 'DOGFOOD_STARE' }
        ]
    },
    DOGFOOD_WHINE: {
        id: 'DOGFOOD_WHINE',
        speaker: 'System',
        text: "AUDIO DETECTED: High-frequency 'fininho' cry. Intentional modulation to induce guilt.",
        location: 'KITCHEN',
        choices: [
            { text: "It's a trap. Check the bowl.", next: 'DOGFOOD_CHECK' }
        ]
    },
    DOGFOOD_STARE: {
        id: 'DOGFOOD_STARE',
        speaker: 'System',
        text: "VISUAL DETECTED: Subject is sitting. Unblinking stare. She is burning a hole in your soul waiting for something better than kibble.",
        location: 'KITCHEN',
        choices: [
            { text: "Stay strong. Check the bowl.", next: 'DOGFOOD_CHECK' }
        ]
    },
    DOGFOOD_CHECK: {
        id: 'DOGFOOD_CHECK',
        speaker: 'System',
        text: "STATUS: Inspecting bowl contents.",
        location: 'KITCHEN',
        choices: [
            { text: "It is empty.", next: 'DOGFOOD_FILL' },
            { text: "Food remains. She just wants the 'good stuff'.", next: 'DOGFOOD_FULL' }
        ]
    },
    DOGFOOD_FULL: {
        id: 'DOGFOOD_FULL',
        speaker: 'Operator (London)',
        text: "She's bluffing. Do NOT overfeed. Abort dispensing sequence. She will survive the tragedy of having slightly old kibble.",
        location: 'KITCHEN',
        choices: [
            { text: "Log Observation: The Drama continues.", next: 'DOGFOOD_ABORT_LOG' }
        ]
    },
    DOGFOOD_ABORT_LOG: {
        id: 'DOGFOOD_ABORT_LOG',
        speaker: 'System',
        text: "OBSERVATION LOGGED. Verification complete. Note: Success in this sector feels like failure, but it is necessary work. The cycle continues.",
        location: 'KITCHEN',
        action: 'COMPLETE_DOGFOOD',
        choices: [
            { text: "Warp back to Base.", next: 'HUB' }
        ]
    },
    DOGFOOD_FILL: {
        id: 'DOGFOOD_FILL',
        speaker: 'Instruction Manual',
        text: "Dispense one scoop. Ensure Puma sits nicely first.",
        location: 'KITCHEN',
        choices: [
            { text: "Served.", next: 'DOGFOOD_HESITATION' }
        ]
    },
    DOGFOOD_HESITATION: {
        id: 'DOGFOOD_HESITATION',
        speaker: 'Puma (The Dog)',
        text: "*Sniffs bowl* ... *Looks at you* ... *Sighs* ... Is this it? Do you not have cheese?",
        location: 'KITCHEN',
        choices: [
            { text: "Yes, that's it. Eat your dinner.", next: 'DOGFOOD_FILL_COMPLETE' },
            { text: "Add 'Magic Dust' (pretend to add seasoning)", next: 'DOGFOOD_MAGIC' }
        ]
    },
    DOGFOOD_MAGIC: {
        id: 'DOGFOOD_MAGIC',
        speaker: 'Puma (The Dog)',
        text: "*Tail Wag* Ah, finally. Gourmet.",
        location: 'KITCHEN',
        choices: [
            { text: "Mission Complete.", next: 'DOGFOOD_FILL_COMPLETE' }
        ]
    },
    DOGFOOD_FILL_COMPLETE: {
        id: 'DOGFOOD_FILL_COMPLETE',
        speaker: 'System',
        text: "Puma is fueled, though she remains unimpressed. Do you want to try again? (Because honestly, she probably wants more).",
        location: 'KITCHEN',
        action: 'COMPLETE_DOGFOOD',
        choices: [
            { text: "Restart Loop: Attempt to please her again.", next: 'DOGFOOD_START' },
            { text: "Accept Defeat: Return to Hub.", next: 'HUB' }
        ]
    },
    ALL_COMPLETE: {
        id: 'ALL_COMPLETE',
        speaker: 'Operator (London)',
        text: "Mission Report: Survival achieved. Distance conquered. We survived the entropy together, even 1150km apart.",
        location: 'LONDON',
        choices: [
            { text: "I love our little family.", next: 'REWARD_2' }
        ]
    },
    REWARD_2: {
        id: 'REWARD_2',
        speaker: 'Operator (London)',
        text: "Next objective: CHRISTMAS PROTOCOL & REVEILLON. I'll be there in person next week. Get ready for the best holiday season of our lives. I love you, Player 1.",
        location: 'LONDON',
        choices: [
            { text: "End Transmission. See you soon.", next: 'CREDITS' }
        ]
    },
    CREDITS: {
        id: 'CREDITS',
        speaker: 'SYSTEM',
        text: "UPLINK TERMINATED. SYSTEM STANDBY.",
        location: 'HQ',
        choices: [
            { text: "Replay Transmission", action: 'RESTART_GAME' }
        ]
    }
};


const Typewriter = ({ text, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText('');
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
        return () => clearInterval(timer);
    }, [text, speed]);

    return <span>{displayedText}</span>;
};

const Scanlines = () => (
    <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
);

const ProgressBar = ({ current, total }) => (
    <div className="flex items-center gap-2 w-32">
        <div className="h-2 flex-1 bg-slate-700 rounded-full overflow-hidden">
            <div
                className="h-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${(current / total) * 100}%` }}
            />
        </div>
        <span className="text-xs text-cyan-400 font-mono">{current}/{total}</span>
    </div>
);

const CoverScreen = ({ onStart, onInfo }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-slate-950/50 p-6 relative z-10">
            <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse"></div>
                <Dog size={120} className="text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 tracking-tighter mb-4 text-center">
                THE PUMA PROTOCOL
            </h1>

            <div className="flex flex-col items-center gap-2 mb-12 text-center">
                <p className="text-slate-400 text-sm md:text-base tracking-[0.2em] animate-pulse">
                    BIO-SIGNATURE DETECTED: <span className="text-pink-400 font-bold">THE VOID</span>
                </p>
                <div className="flex gap-4 text-[10px] text-slate-600 font-mono mt-2">
                    <span>SASS: 100%</span>
                    <span>HUNGER: ∞</span>
                    <span>LOVE: HIDDEN</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button
                    onClick={onStart}
                    className="group relative px-6 py-4 bg-slate-900 border border-cyan-500/30 hover:border-pink-500 text-cyan-400 hover:text-pink-400 font-bold tracking-widest uppercase transition-all duration-300 overflow-hidden w-full"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        <Terminal size={18} />
                        Initialize Handler
                    </span>
                    <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-pink-500/10 transition-colors"></div>
                </button>

                <button
                    onClick={onInfo}
                    className="group relative px-6 py-3 bg-transparent border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-cyan-400 font-medium tracking-widest uppercase transition-all duration-300 w-full text-xs"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        <Info size={14} />
                        Mission Briefing
                    </span>
                </button>
            </div>


        </div>
    );
};

export default function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [currentNodeId, setCurrentNodeId] = useState('START');
    const [missionStatus, setMissionStatus] = useState(MISSIONS);
    const [textComplete, setTextComplete] = useState(false);
    const [hubView, setHubView] = useState(null);
    const [showComfort, setShowComfort] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const [history, setHistory] = useState([]);

    const currentNode = SCRIPT[currentNodeId];
    const currentLocation = LOCATIONS[currentNode.location] || LOCATIONS.HQ;

    const containerLocation = !gameStarted ? LOCATIONS.HQ : currentLocation;

    const getFooterStatus = () => {
        if (!gameStarted) return "AUTH_REQUIRED";
        if (showComfort) return "LOVE_OVERLOAD // DENGO_ACTIVE";
        switch(currentNode.location) {
            case 'HQ': return "SYSTEM_ONLINE // AWAITING_INPUT";
            case 'LONDON': return "UPLINK_STABLE // DISTANCE_IGNORED";
            case 'BIO_ZONE': return "HAZARD_DETECTED // POOP_PATROL";
            case 'KITCHEN': return "HUNGER_LEVELS_CRITICAL // SNACK_TIME";
            case 'OUTSIDE': return "BOSS_FIGHT // PUMA_JUDGMENT";
            case 'SELF_ZONE': return "SELF_CARE_OPTIMIZED // RELAX_MODE";
            case 'SLEEP_CHAMBER': return "COMFORT_MAXIMIZED // NAP_INCOMING";
            default: return "PUMA_PROTOCOL // ACTIVE";
        }
    };

    const getHubMessage = () => {
        const messages = [
            "Systems ready. The apartment is holding its breath.",
            "Puma is watching you from the shadows. Choose a mission.",
            "Entropy levels rising. Intervention required.",
            "The void (Puma) demands tribute. Or maybe just food.",
            "London Uplink active. I miss you. Now get to work.",
            "Select a sector to stabilize. Good luck, Handler."
        ];
        return messages[Math.floor(Date.now() / 10000) % messages.length];
    };

    const pushHistory = (nodeId) => {
        setHistory(prev => [...prev, nodeId]);
    };

    const handleChoice = (choice) => {
        if (choice.action === 'RESTART_GAME') {
            setCurrentNodeId('START');
            setMissionStatus(MISSIONS);
            setHubView(null);
            setHistory([]);
            return;
        }
        if (choice.action === 'SET_HUB_PETS') { setHubView('pets'); pushHistory(currentNodeId); setCurrentNodeId('HUB'); return; }
        if (choice.action === 'SET_HUB_HOUSE') { setHubView('house'); pushHistory(currentNodeId); setCurrentNodeId('HUB'); return; }
        if (choice.action === 'SET_HUB_SELF') { setHubView('self'); pushHistory(currentNodeId); setCurrentNodeId('HUB'); return; }
        if (choice.action === 'SET_HUB_BOSS') { setHubView('boss'); pushHistory(currentNodeId); setCurrentNodeId('HUB'); return; }
        if (choice.action === 'BACK_TO_SELECT') { setHubView(null); pushHistory(currentNodeId); setCurrentNodeId('HUB_SELECT'); return; }

        setTextComplete(false);

        if (currentNode.action === 'COMPLETE_LITTER') { setMissionStatus(prev => ({ ...prev, LITTER: { ...prev.LITTER, completed: true } })); }
        if (currentNode.action === 'COMPLETE_SHEETS') { setMissionStatus(prev => ({ ...prev, SHEETS: { ...prev.SHEETS, completed: true } })); }
        if (currentNode.action === 'COMPLETE_WATER') { setMissionStatus(prev => ({ ...prev, WATER: { ...prev.WATER, completed: true } })); }
        if (currentNode.action === 'COMPLETE_DOGFOOD') { setMissionStatus(prev => ({ ...prev, DOGFOOD: { ...prev.DOGFOOD, completed: true } })); }
        if (currentNode.action === 'COMPLETE_VACUUM') { setMissionStatus(prev => ({ ...prev, VACUUM: { ...prev.VACUUM, completed: true } })); }
        if (currentNode.action === 'COMPLETE_TRASH') { setMissionStatus(prev => ({ ...prev, TRASH: { ...prev.TRASH, completed: true } })); }
        if (currentNode.action === 'COMPLETE_SELFCARE') { setMissionStatus(prev => ({ ...prev, SELFCARE: { ...prev.SELFCARE, completed: true } })); }
        if (currentNode.action === 'COMPLETE_HYDRATE_SELF') { setMissionStatus(prev => ({ ...prev, HYDRATE_SELF: { ...prev.HYDRATE_SELF, completed: true } })); }
        if (currentNode.action === 'COMPLETE_GRAPHIC_NOVEL') { setMissionStatus(prev => ({ ...prev, GRAPHIC_NOVEL: { ...prev.GRAPHIC_NOVEL, completed: true } })); }
        if (currentNode.action === 'COMPLETE_SNACK') { setMissionStatus(prev => ({ ...prev, SNACK: { ...prev.SNACK, completed: true } })); }

        pushHistory(currentNodeId);
        setCurrentNodeId(choice.next);
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prevNodeId = history[history.length - 1];
            setHistory(prev => prev.slice(0, -1));
            setCurrentNodeId(prevNodeId);
            setTextComplete(true);
            if (prevNodeId === 'HUB_SELECT') setHubView(null);
        }
    };

    useEffect(() => {
        setTextComplete(false);
        const timer = setTimeout(() => { setTextComplete(true); }, (currentNode.isHub ? getHubMessage().length : currentNode.text.length) * 20 + 500);
        return () => clearTimeout(timer);
    }, [currentNodeId]);

    const isAllMissionsComplete = Object.values(missionStatus).every(m => m.completed);

    const getChoices = () => {
        if (SCRIPT[currentNodeId].isHub) {
            if (isAllMissionsComplete) {
                return [{ text: "Report to London: All Tasks Complete", next: 'ALL_COMPLETE' }];
            }
            if (!hubView) return [{ text: "Return to Selection", next: 'HUB_SELECT' }];
            const missions = Object.values(missionStatus);
            const visibleMissions = missions.filter(m => m.category === hubView && !m.completed);
            return visibleMissions.map(m => {
                const map = {
                    litter: 'LITTER_START', water: 'WATER_START', dogfood: 'DOGFOOD_START', sheets: 'SHEETS_START', vacuum: 'VACUUM_START', trash: 'TRASH_START', selfcare: 'SELFCARE_START', hydrate_self: 'HYDRATE_SELF_START', graphic_novel: 'GRAPHIC_NOVEL_START', snack: 'SNACK_START'
                };
                return { text: m.title, next: map[m.id] || 'HUB' };
            });
        }
        return SCRIPT[currentNodeId].choices;
    };

    const currentChoices = getChoices();
    const currentViewMissions = Object.values(missionStatus).filter(m => m.category === hubView);
    const currentViewCompleted = currentViewMissions.filter(m => m.completed).length;
    const currentViewTotal = currentViewMissions.length;

    return (
        <div className="min-h-screen bg-black text-slate-200 font-mono flex items-center justify-center p-4 overflow-hidden relative selection:bg-cyan-500 selection:text-black">
            <Scanlines />
            {showComfort && (
                <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900 border-2 border-pink-500 rounded-lg p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(236,72,153,0.4)] text-center">
                        <button onClick={() => setShowComfort(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <div className="flex justify-center mb-6">
                            <Heart size={80} className="text-pink-500 animate-pulse fill-pink-500/20" />
                        </div>
                        <h2 className="text-2xl font-black text-pink-300 uppercase tracking-widest mb-2">Protocol: Dengo</h2>
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-6"></div>
                        <div className="space-y-4 text-pink-100/90 leading-relaxed font-medium">
                            <p>Sending long-distance <b>conchinha</b> signal...</p>
                            <p>Transferring digital <b>kisses</b> to forehead...</p>
                            <p>Deploying emergency <b>hugs</b>...</p>
                            <p className="text-sm text-pink-400 mt-4 italic">"I love you more than Puma loves cheese."</p>
                        </div>
                        <button onClick={() => setShowComfort(false)} className="mt-8 px-8 py-3 bg-pink-500 hover:bg-pink-400 text-black font-bold uppercase tracking-widest rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(236,72,153,0.5)]">Accept Love</button>
                    </div>
                </div>
            )}
            {showBriefing && (
                <div className="absolute inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-slate-900 border-2 border-cyan-500 rounded-lg p-8 max-w-md w-full relative shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                        <button onClick={() => setShowBriefing(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                            <X size={24} />
                        </button>
                        <div className="flex items-center gap-3 mb-4 text-cyan-400">
                            <Info size={24} />
                            <h2 className="text-xl font-bold uppercase tracking-widest">Handler Orientation</h2>
                        </div>
                        <div className="space-y-4 text-slate-300 text-sm leading-relaxed border-t border-slate-700 pt-4">
                            <p><strong className="text-white">Flexibility:</strong> These protocols are distributed for your comfort. Do them at your own pace while I am away. There is no penalty for delay.</p>
                            <p><strong className="text-white">Priority Override:</strong> <span className="text-pink-400">PUMA ALWAYS COMES FIRST.</span> If she wants attention, the chores wait. If she wants to sleep on your legs, you are legally forbidden to move.</p>
                            <p><strong className="text-white">Operator Status:</strong> Your well-being is critical to mission success. Do not skip meals. Do not skip hydration.</p>
                        </div>
                        <button onClick={() => setShowBriefing(false)} className="mt-6 w-full py-2 bg-cyan-900/30 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-300 uppercase tracking-widest text-xs transition-colors">Acknowledge</button>
                    </div>
                </div>
            )}
            <div className={`w-full max-w-4xl bg-gradient-to-br ${containerLocation.color} border-2 ${containerLocation.border} rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col h-[90vh]`}>
                {!gameStarted ? (
                    <CoverScreen onStart={() => setGameStarted(true)} onInfo={() => setShowBriefing(true)} />
                ) : (
                    <>
                        <div className="h-12 border-b border-slate-700/50 bg-black/40 flex items-center justify-between px-4 z-10 backdrop-blur-sm shrink-0">
                            <div className="flex items-center gap-2 text-xs md:text-sm">
                                <Radio className={`animate-pulse ${SCRIPT[currentNodeId].location === 'LONDON' ? 'text-pink-500' : 'text-emerald-500'}`} size={16} />
                                <span className="uppercase tracking-widest text-slate-400">UPLINK: {SCRIPT[currentNodeId].location === 'LONDON' ? 'REMOTE' : 'LOCAL'}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-slate-400">
                                    <Signal size={14} className="text-red-500 animate-pulse" />
                                    <span>DISTANCE: 1150km (STABILIZING)</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs text-pink-300">
                                    <Heart size={14} className="animate-pulse" />
                                    <span>SAUDADE: 100%</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 relative p-4 md:p-8 flex items-center justify-center min-h-0">
                            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
                            <div className={`transition-all duration-1000 transform ${textComplete ? 'scale-100 opacity-100' : 'scale-95 opacity-80'}`}>
                                {SCRIPT[currentNodeId].location === 'HQ' && <Terminal size={100} className="text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />}
                                {SCRIPT[currentNodeId].location === 'LONDON' && <MapPin size={100} className="text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />}
                                {SCRIPT[currentNodeId].location === 'BIO_ZONE' && <Cat size={100} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />}
                                {SCRIPT[currentNodeId].location === 'SLEEP_CHAMBER' && <Bed size={100} className="text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />}
                                {SCRIPT[currentNodeId].location === 'KITCHEN' && <Utensils size={100} className="text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />}
                                {SCRIPT[currentNodeId].location === 'OUTSIDE' && <ShieldAlert size={100} className="text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.6)] animate-pulse" />}
                                {SCRIPT[currentNodeId].location === 'SELF_ZONE' && <Heart size={100} className="text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.6)]" />}
                            </div>
                            {SCRIPT[currentNodeId].isHub && hubView && (
                                <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-black/80 border border-slate-700 p-4 rounded backdrop-blur-md w-64 md:w-72 shadow-xl z-20 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                                    <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
                                        <h3 className="text-xs uppercase tracking-wider text-slate-400">{hubView === 'pets' ? 'Priority Alpha' : hubView === 'house' ? 'Priority Beta' : hubView === 'boss' ? 'Priority Omega' : 'Priority Gamma'}</h3>
                                        <div className="flex gap-1"><span className={`text-[10px] ${hubView === 'pets' ? 'text-emerald-400' : hubView === 'house' ? 'text-amber-400' : hubView === 'boss' ? 'text-red-500' : 'text-rose-400'}`}>{hubView.toUpperCase()}</span></div>
                                    </div>
                                    <div className="space-y-3">
                                        {currentViewMissions.map(mission => (
                                            <div key={mission.id} className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={mission.completed ? 'text-emerald-400' : 'text-slate-400'}>{mission.icon}</span>
                                                    <span className={`text-[10px] md:text-xs ${mission.completed ? 'text-slate-500 line-through decoration-emerald-500' : 'text-slate-200'}`}>{mission.title}</span>
                                                </div>
                                                {mission.completed ? <CheckCircle2 size={12} className="text-emerald-400" /> : <AlertCircle size={12} className="text-amber-400" />}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-2 border-t border-slate-700 flex justify-between items-center">
                                        <span className="text-xs text-slate-500">SECTOR STATUS</span>
                                        <ProgressBar current={currentViewCompleted} total={currentViewTotal} />
                                    </div>
                                </div>
                            )}
                            <button onClick={() => setShowComfort(true)} className="absolute bottom-6 right-6 z-50 bg-slate-900 border-2 border-slate-700 text-slate-400 p-3 rounded-full hover:border-pink-500 hover:text-pink-500 hover:bg-pink-500/20 transition-all shadow-lg group hover:scale-110" title="Emergency Love Protocol">
                                <Heart size={28} className="text-pink-500 animate-pulse fill-pink-500/40" />
                            </button>
                        </div>
                        <div className="min-h-[35%] max-h-[50%] bg-slate-950/90 border-t-2 border-slate-700 p-4 md:p-6 relative z-20 flex flex-col md:flex-row gap-4 md:gap-6 backdrop-blur-xl shrink-0">
                            {history.length > 0 && (
                                <button onClick={handleBack} className="absolute top-4 right-4 text-slate-600 hover:text-cyan-400 transition-colors z-30" title="Go Back">
                                    <Undo2 size={20} />
                                </button>
                            )}
                            <div className="hidden md:flex flex-col items-center gap-2 w-32 shrink-0">
                                <div className={`w-24 h-24 border-2 ${currentLocation.border} rounded bg-slate-900 flex items-center justify-center overflow-hidden relative group shadow-lg`}>
                                    {currentNode.speaker.includes("Operator") ? (
                                        <Heart className="text-pink-500 animate-pulse" size={40} />
                                    ) : currentNode.speaker.includes("Cat") ? (
                                        <Cat className="text-emerald-500" size={40} />
                                    ) : currentNode.speaker.includes("Puma") ? (
                                        <Dog className="text-yellow-400 animate-bounce" size={40} />
                                    ) : currentNode.speaker.includes("Instruction") ? (
                                        <Terminal className="text-cyan-500" size={40} />
                                    ) : currentNode.speaker.includes("System") ? (
                                        <ShieldAlert className="text-red-500 animate-pulse" size={40} />
                                    ) : (
                                        <Radio className="text-slate-400" size={40} />
                                    )}
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider text-center ${currentLocation.accent}`}>{currentNode.speaker}</span>
                            </div>
                            <div className="flex-1 flex flex-col justify-between overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent pr-2">
                                <div className="mb-4 md:mb-6 relative">
                                    <div className={`md:hidden text-xs font-bold uppercase tracking-wider mb-2 ${currentLocation.accent}`}>{currentNode.speaker}</div>
                                    <p className="text-base md:text-xl leading-relaxed text-slate-100 min-h-[4rem] font-medium drop-shadow-sm pr-8">
                                        <Typewriter text={SCRIPT[currentNodeId].isHub ? getHubMessage() : SCRIPT[currentNodeId].text} speed={20} />
                                        {!textComplete && <span className="animate-pulse inline-block w-2 h-5 bg-cyan-400 ml-1 align-middle" />}
                                    </p>
                                </div>
                                <div className={`grid gap-2 md:gap-3 transition-opacity duration-300 ${textComplete ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${SCRIPT[currentNodeId].isHub && hubView ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                    {currentChoices && currentChoices.map((choice, idx) => (
                                        <button key={idx} onClick={() => handleChoice(choice)} className={`group flex items-center gap-3 p-2 md:p-3 rounded border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-cyan-500/50 transition-all text-left ${choice.action && choice.action.includes('SET_HUB') ? 'border-cyan-500/30 bg-cyan-900/10' : ''} ${choice.text.includes('ABORT') ? 'border-red-500/50 bg-red-900/20 hover:bg-red-900/40' : ''}`}>
                                            {choice.action ? (
                                                choice.text.includes("Alpha") ? <Cat className="text-emerald-400" size={20} /> :
                                                choice.text.includes("Beta") ? <Sun className="text-yellow-400" size={20} /> :
                                                choice.text.includes("Gamma") ? <Heart className="text-rose-400" size={20} /> :
                                                choice.text.includes("Omega") ? <Skull className="text-red-500" size={20} /> :
                                                choice.text.includes("Restart") ? <RefreshCw className="text-pink-400" size={16} /> :
                                                choice.text.includes("Briefing") ? <Info className="text-cyan-400" size={16} /> :
                                                <ArrowLeft className="text-cyan-400" size={16} />
                                            ) : (
                                                choice.text.includes('ABORT') ? <ShieldAlert size={16} className="text-red-500" /> :
                                                <ChevronRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                                            )}
                                            <span className={`text-sm md:text-base ${choice.action ? 'text-cyan-300 font-bold' : choice.text.includes('ABORT') ? 'text-red-400 font-bold' : 'text-slate-300'} group-hover:text-white`}>{choice.text}</span>
                                        </button>
                                    ))}
                                    {(!currentChoices || currentChoices.length === 0) && currentNodeId !== 'CREDITS' && (
                                        <div className="text-xs text-slate-500 uppercase tracking-widest animate-pulse">End of simulation line.</div>
                                    )}
                                </div>
                                {SCRIPT[currentNodeId].isHub && hubView && (
                                    <div className="mt-4 pt-4 border-t border-slate-800">
                                        <button onClick={() => handleChoice({ action: 'BACK_TO_SELECT' })} className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
                                            <ArrowLeft size={14} />
                                            Return to Categories
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="absolute bottom-2 text-[10px] text-slate-600 font-mono">{getFooterStatus()}</div>
        </div>
    );
}
