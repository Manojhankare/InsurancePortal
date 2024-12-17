window.onload = function() {
    // Fetch API call for Travel Insurance, setting the correct headers to accept JSON
    fetch('http://localhost:5555/restv2/insurance/getpolicybytypes?input=Travel Insurance', {
        method: 'GET',  // Using GET request to fetch data
        headers: {
            'Accept': 'application/json', // Accept JSON response
            'Content-Type': 'application/json' // Sending JSON data (if needed)
        }
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        const policyList = data.getPolicyByTypesOutput.results; // Access the policy results
        const tbody = document.getElementById('policyList');
        
        // Loop through the data and display it in the table
        policyList.forEach(policy => {
            let row = `
                <tr>
                    <td>${policy.POLICY_NO}</td>
                    <td>${policy.NAME}</td>
                    <td>${policy.EMAIL}</td>
                    <td>${policy.STATUS}</td>
                    <td>${policy.FROM_DATE}</td>
                    <td>${policy.TO_DATE}</td>
                </tr>
            `;
            tbody.innerHTML += row; // Append row to the table
        });
    })
    .catch(error => console.error('Error fetching data:', error));  // Handle any errors
};
