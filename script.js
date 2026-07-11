// Select the elements from the HTML
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');
const totalCountEl = document.getElementById('totalCount');
const jobContainer = document.getElementById('jobContainer');
const jobNumber = document.getElementById('jobNumber');
const emptyState = document.getElementById('emptyState');

// Initialize the counters
let interviewCount = 0;
let rejectedCount = 0;

// Job card button click handler 
jobContainer.addEventListener('click', function(event) {
    const target = event.target;
    const card = target.closest('.job-card');

    if (!card) return; 

    const statusSpan = card.querySelector('.statu');

    // 1. Handling Interview Button
    if (target.classList.contains('interview-btn')) {
        if (card.dataset.status !== 'interview') {
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

    // 2. Handling Rejected Button
    else if (target.classList.contains('rejected-btn')) {
        if (card.dataset.status !== 'rejected') {
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

    // 3. Handling Delete Button
    else if (target.closest('.delete-btn')) {
        if (card.dataset.status === 'interview') interviewCount = interviewCount - 1;
        if (card.dataset.status === 'rejected') rejectedCount = rejectedCount - 1;
        
        card.remove(); // Remove the element
        updateDashboard();
        updateTotalJobs();
    }
});

// Update the Dashboard Numbers
function updateDashboard() {
    interviewCountEl.innerText = interviewCount;
    rejectedCountEl.innerText = rejectedCount;
}

// Update the total jobs counts and check for the empty state
function updateTotalJobs() {
    const allCards = document.querySelectorAll('.job-card');
    const total = allCards.length;
    
    jobNumber.innerText = total + " Jobs";
    totalCountEl.innerText = total;
    
    if (total === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

// Tab Filtering Logic
const allTab = document.getElementById('allTab');
const interviewTab = document.getElementById('interview');
const rejectedTab = document.getElementById('rejected');

function filterJobs(status) {
    const cards = document.querySelectorAll('.job-card');
    let visibleCount = 0;

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Show/Hide based on status
        if (status === 'all' || card.dataset.status === status) {
            card.classList.remove('hidden');
            visibleCount = visibleCount + 1;
        } else {
            card.classList.add('hidden');
        }
    }
    if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

allTab.addEventListener('click', function() {
    filterJobs('all');
});

interviewTab.addEventListener('click', function() {
    filterJobs('interview');
});

rejectedTab.addEventListener('click', function() {
    filterJobs('rejected');
});