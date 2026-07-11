// Step 1: Selecting elements from the HTML
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');
const totalCountEl = document.getElementById('totalCount');
const jobContainer = document.getElementById('jobContainer');
const jobNumber = document.getElementById('jobNumber');
const emptyState = document.getElementById('emptyState');

// Variables for counting
let interviewCount = 0;
let rejectedCount = 0;

// Step 2: Handling button clicks
jobContainer.addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.job-card');
    if (!card) return;
    const statusSpan = card.querySelector('.statu');

    // Logic for Interview button
    if (target.classList.contains('interview-btn')) {
        if (card.dataset.status !== 'interview') {
            // Adjust counters if switching status
            if (card.dataset.status === 'rejected') {
                rejectedCount = rejectedCount - 1;
            }
            interviewCount = interviewCount + 1;
            
            card.dataset.status = 'interview';
            statusSpan.innerText = 'INTERVIEW';
            statusSpan.className = 'statu px-5 py-3 rounded-lg font-semibold bg-green-100 text-green-700';
            
            updateDashboard();
        }
    }

    // Logic for Rejected button
    else if (target.classList.contains('rejected-btn')) {
        if (card.dataset.status !== 'rejected') {
            // Adjust counters if switching status
            if (card.dataset.status === 'interview') {
                interviewCount = interviewCount - 1;
            }
            rejectedCount = rejectedCount + 1;

            card.dataset.status = 'rejected';
            statusSpan.innerText = 'REJECTED';
            statusSpan.className = 'statu px-5 py-3 rounded-lg font-semibold bg-red-100 text-red-700';
            
            updateDashboard();
        }
    }

    // Logic for Delete button
    else if (target.closest('.delete-btn')) {
        // Reduce counts before removing
        if (card.dataset.status === 'interview') interviewCount = interviewCount - 1;
        if (card.dataset.status === 'rejected') rejectedCount = rejectedCount - 1;
        
        card.remove(); // Removing the card
        
        updateDashboard();
        updateTotalJobs();
    }
});

// Step 3: Functions to update 
function updateDashboard() {
    interviewCountEl.innerText = interviewCount;
    rejectedCountEl.innerText = rejectedCount;
}

function updateTotalJobs() {
    const allCards = document.querySelectorAll('.job-card');
    const total = allCards.length;
    
    // Update label
    jobNumber.innerText = total + " Jobs";
    totalCountEl.innerText = total;
    
    // Check if any jobs are left
    if (total === 0) {
        emptyState.classList.remove('hidden');
    }
}

// Step 4: Tab Filtering Logic
const allTab = document.getElementById('allTab');
const interviewTab = document.getElementById('interview');
const rejectedTab = document.getElementById('rejected');

// Function to handle tab clicks
function handleTabClick(status) {
    const cards = document.querySelectorAll('.job-card');
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        if (status === 'all') {
            card.classList.remove('hidden');
        } 
        else if (card.dataset.status === status) {
            card.classList.remove('hidden');
        } 
        else {
            card.classList.add('hidden');
        }
    }
}

allTab.addEventListener('click', function() {
    handleTabClick('all');
});
interviewTab.addEventListener('click', function() {
    handleTabClick('interview');
});
rejectedTab.addEventListener('click', function() {
    handleTabClick('rejected');
});