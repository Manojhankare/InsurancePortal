let currentInsuranceType = '';
let policies = [];

function changeInsuranceType(type) {
    currentInsuranceType = type;
    document.getElementById('searchPolicyNo').value = '';  // Clear search on type change
    fetchPoliciesByType(type);
}

function fetchPoliciesByType(type) {
    // Call the appropriate API based on the insurance type
    fetch(`http://localhost:5555/restv2/insurance/getpolicybytypes?input=${type}`)
        .then(response => response.json())
        .then(data => {
            policies = data.getPolicyByTypesOutput.results;
            renderPolicyTable(policies);
        })
        .catch(error => console.error('Error fetching policies:', error));
}

function searchPolicyByNo() {
    const searchTerm = document.getElementById('searchPolicyNo').value;
    fetch(`http://localhost:5555/restv2/insurance/searchbypolicyno?input=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            policies = data.searchByFieldOutput.results;
            renderPolicyTable(policies);
        })
        .catch(error => console.error('Error searching policies:', error));
}

function renderPolicyTable(policies) {
    const tbody = document.getElementById('policyList');
    const tableHeader = document.getElementById('tableHeader');
    
    tbody.innerHTML = '';  // Clear previous rows

    policies.forEach(policy => {
        let row = `
            <tr>
                <td>${policy.POLICY_NO}</td>
                <td>${policy.NAME}</td>
                <td>${policy.EMAIL}</td>
                <td>${policy.MOBILE}</td>
                <td>${policy.DOB}</td>
                <td>${policy.GENDER}</td>
                <td>${policy.ADDRESS}</td>
                <td>${policy.NOMINEE}</td>
                <td>${policy.FROM_DATE}</td>
                <td>${policy.TO_DATE}</td>
                <td>${policy.AADHAR}</td>
                <td>${policy.STATUS}</td>
        `;

        // Dynamically add fields based on insurance type
        if (currentInsuranceType === 'Vehicle Insurance') {
            row += `
                <td>${policy.CHASSIS || 'N/A'}</td>
                <td>${policy.VEHICLE_TYPE || 'N/A'}</td>
            `;
        } else if (currentInsuranceType === 'Life Insurance') {
            row += `
                <td>${policy.LIFE_ADDITIONAL_INFO || 'N/A'}</td>
            `;
        }

        row += '</tr>';
        tbody.innerHTML += row;
    });
}

// Initialize with Life Insurance by default
changeInsuranceType('Life Insurance');
