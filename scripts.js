document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Enhanced project data with more details
    const projects = [
        {
            title: 'Trip to Abuja For Masscom Students',
            description: 'An educational trip for all Masscom students for required exposure.',
            goal: 500000,
            raised: 325000,
            contributors: 214,
            endDate: '2024-12-30',
            fundingBreakdown: [
                { category: 'Transportation', amount: 200000 },
                { category: 'Accommodation', amount: 150000 },
                { category: 'Meals', amount: 100000 },
                { category: 'Miscellaneous', amount: 50000 }
            ],
            donationHistory: [
                { donor: 'Anonymous', amount: 50000 },
                { donor: 'Alumni Association', amount: 100000 },
                { donor: 'Student Council', amount: 75000 }
            ]
        },
        {
            title: 'Prototype For ResoBrigde',
            description: 'A software to create an entire student support ecosystem.',
            goal: 1500000,
            raised: 725000,
            contributors: 350,
            endDate: '2025-12-30',
            fundingBreakdown: [
                { category: 'Technical', amount: 500000 },
                { category: 'Advertisement', amount: 300000 },
                { category: 'Launching', amount: 300000 },
                { category: 'Miscellaneous', amount: 50000 }
            ],
            donationHistory: [
                { donor: 'Anonymous', amount: 70000 },
                { donor: 'Alumni Association', amount: 100000 },
                { donor: 'Student Council', amount: 500000 }
            ]
        },
        {
            title: 'Scholarship For Best Student',
            description: 'All around paid expenses for the best Graduating Student',
            goal: 500000,
            raised: 325000,
            contributors: 114,
            endDate: '2025-02-05',
            fundingBreakdown: [
                { category: 'Transportation', amount: 200000 },
                { category: 'Accommodation', amount: 150000 },
                { category: 'Meals', amount: 100000 },
                { category: 'Miscellaneous', amount: 50000 }
            ],
            donationHistory: [
                { donor: 'Anonymous', amount: 50000 },
                { donor: 'Alumni Association', amount: 100000 },
                { donor: 'Student Council', amount: 75000 }
            ]
        },
        // ... other projects (unchanged)
    ];

    const featuredProjectsContainer = document.getElementById('featuredProjects');

    function createProjectCards() {
        featuredProjectsContainer.innerHTML = ''; // Clear existing cards
        projects.forEach((project, index) => {
            const progressPercentage = (project.raised / project.goal) * 100;
            const endDate = new Date(project.endDate);
            const timeRemaining = calculateTimeRemaining(endDate);

            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');
            projectCard.innerHTML = `
                <div class="project-image" style="background-color: #f0f0f0; height: 200px;"></div>
                <div class="project-details" style="padding: 15px;">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="timer">${timeRemaining}</div>
                    <div class="progress-bar" style="width: 100%; background-color: #e0e0e0; height: 10px; border-radius: 5px; margin: 10px 0;">
                        <div style="width: ${progressPercentage}%; background-color: #d1697e; height: 100%; border-radius: 5px;"></div>
                    </div>
                    <div class="project-stats">
                        <div>Raised: ₦${project.raised.toLocaleString()} of ₦${project.goal.toLocaleString()}</div>
                        <div>Contributors: ${project.contributors}</div>
                    </div>
                    <button onclick="showProjectDetails(${index})" 
                        style="width: 100%; padding: 10px; background-color: #d1697e; color: white; border: none; border-radius: 4px; margin-top: 10px;">
                        View Campaign Details
                    </button>
                </div>
            `;
            featuredProjectsContainer.appendChild(projectCard);
        });
    }

    function calculateTimeRemaining(endDate) {
        const now = new Date();
        const timeLeft = endDate - now;
        
        if (timeLeft <= 0) return 'Campaign Ended';
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        return `${days} days, ${hours} hours left`;
    }

    window.showProjectDetails = function(index) {
        const project = projects[index];
        const detailsModal = document.getElementById('projectDetailsModal');
        
        detailsModal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                
                <h3>Funding Goal: ₦${project.goal.toLocaleString()}</h3>
                
                <div class="funding-breakdown">
                    <h4>Funding Breakdown</h4>
                    ${project.fundingBreakdown.map(item => 
                        `<div>${item.category}: ₦${item.amount.toLocaleString()}</div>`
                    ).join('')}
                </div>
                
                 <div class="donation-options">
                    <h3>Donate Now</h3>
                    <div class="preset-amounts">
                        <button onclick="makeDonation(${index}, 1000)">₦1,000</button>
                        <button onclick="makeDonation(${index}, 5000)">₦5,000</button>
                        <button onclick="makeDonation(${index}, 10000)">₦10,000</button>
                    </div>
                    <input type="number" id="customDonationAmount" placeholder="Custom Amount">
                    <button class="donate-btn" onclick="makeDonation(${index}, null)">Contribute</button>
                </div>
                
                <div class="donation-history">
                    <h4>Recent Donations</h4>
                    ${project.donationHistory.map(donation => 
                        `<div>${donation.donor}: ₦${donation.amount.toLocaleString()}</div>`
                    ).join('')}
                </div>
            </div>
        `;
        
        detailsModal.style.display = 'block';
        
        const closeBtn = detailsModal.querySelector('.close-btn');
        closeBtn.onclick = () => {
            detailsModal.style.display = 'none';
        };
    }

   // Update the existing makeDonation function
window.makeDonation = function(projectIndex, amount) {
    const customAmount = document.getElementById('customDonationAmount')?.value;
    const donationAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

    if (donationAmount > 0) {
        showPaymentForm(projectIndex, donationAmount);
    } else {
        alert('Please enter a valid donation amount.');
    }
}


// Add this function to handle the payment processing
function processPayment(projectIndex, amount) {
    const project = projects[projectIndex];
    project.raised += amount;
    project.contributors += 1;
    project.donationHistory.unshift({ donor: 'Anonymous', amount: amount });

    createProjectCards();
    document.getElementById('projectDetailsModal').style.display = 'none';
    alert('Thank you for your donation! Your payment has been processed successfully.');
}

    createProjectCards();

    const newCampaignForm = document.getElementById('newCampaignForm');
    newCampaignForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const newProject = {
            title: this.querySelector('input[name="title"]').value,
            description: this.querySelector('textarea[name="description"]').value,
            goal: parseFloat(this.querySelector('input[name="goal"]').value),
            raised: 0,
            contributors: 0,
            endDate: this.querySelector('input[name="endDate"]').value,
            fundingBreakdown: [
                { category: 'General', amount: parseFloat(this.querySelector('input[name="goal"]').value) }
            ],
            donationHistory: []
        };

        projects.push(newProject);
        createProjectCards();
        this.reset();

        document.getElementById('explore-projects').scrollIntoView({
            behavior: 'smooth'
        });

        alert('Campaign created successfully!');
    });
});

console.log('Scripts loaded successfully!');

// Add this to your scripts.js file

function showPaymentForm(projectIndex, amount) {
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    projectDetailsModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Payment Details</h2>
            <p>Amount to be donated: ₦${amount.toLocaleString()}</p>
            
            <form id="paymentForm" class="payment-form">
                <div class="form-group">
                    <label for="cardName">Cardholder Name</label>
                    <input type="text" id="cardName" required placeholder="Enter cardholder name">
                </div>
                
                <div class="form-group">
                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" required placeholder="1234 5678 9012 3456" 
                           maxlength="19" onkeyup="formatCardNumber(this)">
                </div>
                
                <div class="form-row">
                    <div class="form-group half">
                        <label for="expiryDate">Expiry Date</label>
                        <input type="text" id="expiryDate" required placeholder="MM/YY" 
                               maxlength="5" onkeyup="formatExpiryDate(this)">
                    </div>
                    
                    <div class="form-group half">
                        <label for="cvv">CVV</label>
                        <input type="text" id="cvv" required placeholder="123" 
                               maxlength="3" onkeyup="validateNumeric(this)">
                    </div>
                </div>
                
                <button type="submit" class="payment-submit-btn">Complete Donation</button>
            </form>
        </div>
    `;

    // Add event listeners for the payment form
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would normally integrate with a payment gateway
        // For now, we'll just simulate a successful payment
        processPayment(projectIndex, amount);
    });

    const closeBtn = projectDetailsModal.querySelector('.close-btn');
    closeBtn.onclick = () => {
        projectDetailsModal.style.display = 'none';
    };
}

// Helper functions for form formatting
function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    input.value = formattedValue;
}

function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    input.value = value;
}

function validateNumeric(input) {
    input.value = input.value.replace(/\D/g, '');
}

// Update the existing makeDonation function
window.makeDonation = function(projectIndex, amount) {
    const customAmount = document.getElementById('customDonationAmount')?.value;
    const donationAmount = amount || (customAmount ? parseFloat(customAmount) : 0);

    if (donationAmount > 0) {
        showPaymentForm(projectIndex, donationAmount);
    } else {
        alert('Please enter a valid donation amount.');
    }
}

// Add this function to handle the payment processing
function processPayment(projectIndex, amount) {
    const project = projects[projectIndex];
    project.raised += amount;
    project.contributors += 1;
    project.donationHistory.unshift({ donor: 'Anonymous', amount: amount });

    createProjectCards();
    document.getElementById('projectDetailsModal').style.display = 'none';
    alert('Thank you for your donation! Your payment has been processed successfully.');
}