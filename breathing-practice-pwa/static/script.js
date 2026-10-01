const TECHNIQUES = {
    diaphragmatic: {
        name: "Slow Diaphragmatic Breathing",
        description: "Breathe in gently through your nose. Let your abdomen expand rather than lifting your chest. Exhale slowly.",
        phases: [
            { action: "Inhale", seconds: 4, instruction: "Breathe in gently through your nose • abdomen expands" },
            { action: "Exhale", seconds: 6, instruction: "Exhale slowly and completely" }
        ],
        tip: "Keep breaths comfortable and quiet. Slightly longer exhalation helps calm the body."
    },
    resonance: {
        name: "Resonance / Equal Breathing",
        description: "Slow, rhythmic equal breathing (also called coherent or sama vritti). Around 5–6 breaths per minute.",
        phases: [
            { action: "Inhale", seconds: 5, instruction: "Inhale gently through the nose" },
            { action: "Exhale", seconds: 5, instruction: "Exhale slowly through the nose or mouth" }
        ],
        tip: "Aim for smooth, even breaths. Comfort over exact timing."
    },
    extended: {
        name: "Extended-Exhale Breathing",
        description: "Slightly longer exhale to help settle physical arousal.",
        phases: [
            { action: "Inhale", seconds: 4, instruction: "Inhale gently through the nose" },
            { action: "Exhale", seconds: 7, instruction: "Exhale slowly and fully" }
        ],
        tip: "If you feel air hunger or dizziness, shorten the counts."
    },
    box: {
        name: "Box Breathing",
        description: "Equal inhale, hold, exhale, hold. Gives a clear structure to focus on.",
        phases: [
            { action: "Inhale", seconds: 4, instruction: "Inhale through the nose" },
            { action: "Hold", seconds: 4, instruction: "Hold gently (no strain)" },
            { action: "Exhale", seconds: 4, instruction: "Exhale slowly" },
            { action: "Hold", seconds: 4, instruction: "Hold empty (relaxed)" }
        ],
        tip: "If holding feels uncomfortable, switch to ordinary slow breathing."
    },
    four78: {
        name: "4-7-8 Breathing",
        description: "Inhale for 4, hold for 7, exhale for 8. A strong calming pattern, especially useful before sleep or when anxiety is high.",
        phases: [
            { action: "Inhale", seconds: 4, instruction: "Inhale quietly through the nose" },
            { action: "Hold", seconds: 7, instruction: "Hold the breath (relaxed, no strain)" },
            { action: "Exhale", seconds: 8, instruction: "Exhale completely through the mouth (whooshing sound)" }
        ],
        tip: "Do 4 cycles at first. Can feel strong — stop if you feel light-headed."
    },
    physiological_sigh: {
        name: "Physiological Sigh",
        description: "A short, powerful technique for moments when stress rises. Double inhale + long exhale.",
        phases: [
            { action: "Inhale", seconds: 2, instruction: "Normal inhale through the nose" },
            { action: "Inhale", seconds: 1, instruction: "Second smaller inhale on top" },
            { action: "Exhale", seconds: 6, instruction: "Slow, full exhale through the mouth" }
        ],
        tip: "Usually do 1–3 rounds, then return to normal breathing. Great as a quick reset."
    }
};

const selectEl = document.getElementById("technique");
const nameEl = document.getElementById("tech-name");
const descEl = document.getElementById("tech-desc");
const tipEl = document.getElementById("tech-tip");
const playBtn = document.getElementById("play-btn");
const stopBtn = document.getElementById("stop-btn");
const phaseAction = document.getElementById("phase-action");
const phaseInstr = document.getElementById("phase-instruction");
const progressBar = document.getElementById("progress-bar");
const phaseCount = document.getElementById("phase-countdown");
const elapsedEl = document.getElementById("elapsed");

let currentTech = null;
let isRunning = false;
let phaseIndex = 0;
let phaseStart = null;
let totalStart = null;
let rafId = null;

function populateTechniques() {
    for (const [key, tech] of Object.entries(TECHNIQUES)) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = tech.name;
        selectEl.appendChild(option);
    }
}

function updateInfo() {
    currentTech = TECHNIQUES[selectEl.value];
    nameEl.textContent = currentTech.name;
    descEl.textContent = currentTech.description;
    tipEl.textContent = currentTech.tip;
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function resetUI() {
    phaseAction.textContent = "Ready";
    phaseInstr.textContent = "Select a technique and press Play";
    progressBar.style.width = "0%";
    phaseCount.textContent = "–";
    elapsedEl.textContent = "00:00";
}

function stop() {
    isRunning = false;
    if (rafId) cancelAnimationFrame(rafId);
    playBtn.disabled = false;
    stopBtn.disabled = true;
    selectEl.disabled = false;
    resetUI();
}

function start() {
    if (!currentTech) return;

    isRunning = true;
    phaseIndex = 0;

    const now = performance.now();
    totalStart = now;
    phaseStart = now;

    playBtn.disabled = true;
    stopBtn.disabled = false;
    selectEl.disabled = true;

    rafId = requestAnimationFrame(tick);
}

function tick(now) {
    if (!isRunning) return;

    const phases = currentTech.phases;
    const phase = phases[phaseIndex];
    const elapsedPhase = (now - phaseStart) / 1000;
    const totalElapsed = (now - totalStart) / 1000;

    elapsedEl.textContent = formatTime(totalElapsed);
    phaseAction.textContent = phase.action;
    phaseInstr.textContent = phase.instruction;

    const progress = Math.min(elapsedPhase / phase.seconds, 1);
    progressBar.style.width = `${progress * 100}%`;

    const remaining = Math.max(0, Math.ceil(phase.seconds - elapsedPhase));
    phaseCount.textContent = `${remaining}s`;

    if (elapsedPhase >= phase.seconds) {
        phaseIndex = (phaseIndex + 1) % phases.length;
        phaseStart = now;
        progressBar.style.width = "0%";
    }

    rafId = requestAnimationFrame(tick);
}

selectEl.addEventListener("change", () => {
    updateInfo();
    if (!isRunning) resetUI();
});

playBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

populateTechniques();
updateInfo();
resetUI();
