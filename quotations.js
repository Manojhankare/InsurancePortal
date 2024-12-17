// quotations.js

window.onload = function () {
    // Function to fetch quotations based on the insurance type
    function fetchQuotations(insuranceType) {
        // Show loading spinner
        document.getElementById('loading').style.display = 'block';

        // Construct API URL based on selected insurance type
        const apiUrl = `http://localhost:5555/restv2/insurance/getquotesbytype?input=${insuranceType}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json', // Ensure server responds with JSON
                'Content-Type': 'application/json' // In case we send data in POST requests (not used here)
            }
        })
        .then(response => response.json())
        .then(data => {
            const results = data.getquotesbytypeOutput.results;
            const quotationsList = document.getElementById('quotations-list');

            // Clear the list before appending new data
            quotationsList.innerHTML = '';

            if (results.length > 0) {
                // Loop through the results and create cards
                results.forEach(policy => {
                    const card = createQuotationCard(policy);
                    quotationsList.appendChild(card);
                });
            } else {
                // Display a message if no quotations are available
                quotationsList.innerHTML = '<div class="col-12 text-center">No quotations available for this type.</div>';
            }

            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            document.getElementById('quotations-list').innerHTML = '<div class="col-12 text-center text-danger">Failed to load quotations. Please try again later.</div>';
            document.getElementById('loading').style.display = 'none';
        });
    }

    // Function to create a quotation card
    function createQuotationCard(policy) {
        const card = document.createElement('div');
        card.classList.add('col-md-3');
        card.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${policy.POLICY_NAME}</h5>
                    <p class="card-text"><strong>Premium:</strong> $${policy.PREMIUM}</p>
                    <p class="card-text"><strong>Benefits:</strong> ${policy.BENEFITS}</p>
                    <p class="card-text"><strong>Total Claim Amount:</strong> $${policy.TOTAL_CLAIM_AMOUNT}</p>
                    <p class="card-text"><strong>Payment Method:</strong> ${policy.PAYMENT_METHOD}</p>
                    <p class="card-text"><strong>Status:</strong> ${policy.POLICY_STATUS}</p>
                </div>
            </div>
        `;
        return card;
    }

    // Add event listener for the dropdown change to update the quotations based on selected insurance type
    document.getElementById('insuranceType').addEventListener('change', function () {
        const selectedType = this.value;
        fetchQuotations(selectedType); // Fetch quotations based on the selected insurance type
    });

    // Fetch initial quotations for the default type (Travel)
    fetchQuotations('Travel');
};
