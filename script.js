
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');
const totalCountEl = document.getElementById('totalCount');
const jobContainer = document.getElementById('jobContainer');
const jobNumber = document.getElementById('jobNumber');
const emptyState = document.getElementById('emptyState');


const allTab = document.getElementById('allTab');
const interviewTab = document.getElementById('interview');
const rejectedTab = document.getElementById('rejected');


let interviewCount = 0;
let rejectedCount = 0;


jobContainer.addEventListener('click', function(e) {
    const card = e.target.closest('.job-card');
    if (!card) return;

    const statusSpan = card.querySelector('.statu');

    if (e.target.classList.contains('interview-btn')) {
        if (card.dataset.status !== 'interview') {
            if (card.dataset.status === 'rejected') rejectedCount--;
            interviewCount++;
            card.dataset.status = 'interview';
            updateUI(card, statusSpan, 'INTERVIEW', 'bg-green-100', 'text-green-700');
        }
    }


    else if (e.target.classList.contains('rejected-btn')) {
        if (card.dataset.status !== 'rejected') {
            if (card.dataset.status === 'interview') interviewCount--;
            rejectedCount++;
            card.dataset.status = 'rejected';
            updateUI(card, statusSpan, 'REJECTED', 'bg-red-100', 'text-red-700');
        }
    }

  
    else if (e.target.closest('.delete-btn')) {
        if (card.dataset.status === 'interview') interviewCount--;
        if (card.dataset.status === 'rejected') rejectedCount--;
        card.remove();
        updateDashboard();
        updateJobTotal();
    }
});


const tabs = [allTab, interviewTab, rejectedTab];

tabs.forEach(tab => {
    tab.addEventListener('click', function() {

        document.querySelector('.tab-active').classList.remove('tab-active');
        this.classList.add('tab-active');
        const filter = this.id === 'allTab' ? 'all' : (this.id === 'interview' ? 'interview' : 'rejected');
        filterJobs(filter);
    });
});

function filterJobs(status) {
    const cards = document.querySelectorAll('.job-card');
    let visibleCount = 0;
    cards.forEach(card => {
        if (status === 'all' || card.dataset.status === status) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}


function updateUI(card, span, text, bgClass, textClass) {
    span.innerText = text;
    span.className = `statu px-5 py-3 rounded-lg font-semibold ${bgClass} ${textClass}`;
    updateDashboard();
}

function updateDashboard() {
    interviewCountEl.innerText = interviewCount;
    rejectedCountEl.innerText = rejectedCount;
}

function updateJobTotal() {
    const remainingCards = document.querySelectorAll('.job-card').length;
    jobNumber.innerText = `${remainingCards} Jobs`;
    totalCountEl.innerText = remainingCards;
    
    if (remainingCards === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}