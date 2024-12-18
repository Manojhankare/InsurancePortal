window.onload = function () {
    const policiesPerPage = 10; // Number of policies per page
    let currentPage = 1; // Starting page

    // Function to fetch policies for a given page
    function fetchPolicies(page, emailSearch = '') {
        let apiUrl = 'http://localhost:5555/restv2/insurance/getpolicybytypes?input=Vehicle Insurance';

        // If an email search is provided, update the API URL
        if (emailSearch) {
            apiUrl = `http://localhost:5555/restv2/insurance/searchbyemailmo?input=${emailSearch}`;
        }

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const policyList = data.results || data.searchByFieldOutput?.results || [];
            const totalPolicies = policyList.length;
            const totalPages = Math.ceil(totalPolicies / policiesPerPage);

            // Determine start and end index for this page
            const startIndex = (page - 1) * policiesPerPage;
            const endIndex = startIndex + policiesPerPage;

            // Slice the policies array to get the current page's data
            const currentPolicies = policyList.slice(startIndex, endIndex);

            const tbody = document.getElementById('policyList');
            tbody.innerHTML = ''; 
            
            currentPolicies.forEach((policy) => {
                const row = `
                <tr>
                    <td>${policy.POLICY_NO}</td>
                    <td>${policy.NAME}</td>
                    <td>${policy.EMAIL}</td>
                    <td>${policy.STATUS}</td>
                    <td>${policy.PREMIUM}</td>
                    <td>${policy.VEHICLE_NO}</td>
                    <td>${policy.CHASSIS}</td>
                    <td>${policy.VEHICLE_TYPE}</td>
                    <td>${policy.FROM_DATE}</td>
                    <td>${policy.TO_DATE}</td>
                    <td>${policy.DOB}</td>
                    <td>${policy.LIFE_ADDITIONAL_INFO || 'N/A'}</td>
                </tr>`;
                tbody.innerHTML += row;
            });

            // Update pagination controls
            document.getElementById('pageInfo').textContent = `Page ${page} of ${totalPages}`;
            document.getElementById('prevPage').disabled = page === 1;
            document.getElementById('nextPage').disabled = page === totalPages;
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
    // Function to validate and format the Policy No input (only allow numbers after "VI-")
    function validatePolicyNo() {
        const input = document.getElementById('policyNoSearch');
        let value = input.value;

        // Make sure the input always starts with "VI-"
        if (!value.startsWith('VI-')) {
            input.value = 'VI-';
        } else {
            // Allow only numbers after the "VI-" part
            const numericPart = value.slice(3).replace(/[^0-9]/g, ''); // Remove non-numeric characters
            input.value = 'VI-' + numericPart; // Reassign the value back to the input
        }
    }

    // Function to search policies by Policy No
    function searchPolicyByNo(policyNo) {
        if (!policyNo.startsWith('VI-') || policyNo.length <= 3) {
            alert('Please enter a valid policy number starting with "VI-" followed by digits.');
            return;
        }
        fetch(`http://localhost:5555/restv2/insurance/searchbypolicyno?input=${policyNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            const results = data.searchByFieldOutput.results;

            const tbody = document.getElementById('policyList');
            tbody.innerHTML = ''; // Clear existing data

            if (results.length > 0) {
                // Populate table with search results
                results.forEach((policy) => {
                    const row = `
                    <tr>
                        <td>${policy.POLICY_NO}</td>
                        <td>${policy.NAME}</td>
                        <td>${policy.EMAIL}</td>
                        <td>${policy.STATUS}</td>
                        <td>${policy.PREMIUM}</td>
                        <td>${policy.VEHICLE_NO}</td>
                        <td>${policy.CHASSIS}</td>
                        <td>${policy.VEHICLE_TYPE}</td>
                        <td>${policy.FROM_DATE}</td>
                        <td>${policy.TO_DATE}</td>
                        <td>${policy.DOB}</td>
                        <td>${policy.LIFE_ADDITIONAL_INFO || 'N/A'}</td>
                    </tr>`;
                    tbody.innerHTML += row;
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="10" class="text-center">No policies found for the given Policy No.</td></tr>';
            }
        })
        .catch((error) => {
            console.error('Error searching policy:', error);
            alert('Failed to search policy.');
        });
    }

    // Initial page load
    fetchPolicies(currentPage);

    // Handle pagination buttons
    document.getElementById('prevPage').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            fetchPolicies(currentPage);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function () {
        currentPage++;
        fetchPolicies(currentPage);
    });

    // Handle the Search button click for Policy No
    document.getElementById('searchPolicyBtn').addEventListener('click', function () {
        const policyNo = document.getElementById('policyNoSearch').value.trim();
        if (policyNo) {
            searchPolicyByNo(policyNo);
        } else {
            fetchPolicies(currentPage); // Show all policies if no search term is provided
        }
    });

    // Handle the Clear button click for Policy No
    document.getElementById('clearSearchBtn').addEventListener('click', function () {
        // Clear the search input field for Policy No
        document.getElementById('policyNoSearch').value = '';
    
        // Fetch all policies again (reset search)
        fetchPolicies(currentPage);
    });

    // Handle the Search button click for Email
    document.getElementById('searchEmailBtn').addEventListener('click', function () {
        const emailSearch = document.getElementById('emailSearch').value.trim();
        if (emailSearch) {
            fetchPolicies(currentPage, emailSearch); // Search by email
        } else {
            fetchPolicies(currentPage); // Show all policies if no email is provided
        }
    });

    // Handle the Clear button click for Email
    document.getElementById('clearEmailSearchBtn').addEventListener('click', function () {
        // Clear the search input field for Email
        document.getElementById('emailSearch').value = '';
    
        // Fetch all policies again (reset search)
        fetchPolicies(currentPage);
    });

    // Form Submission for New Policy
    // Form Submission for New Policy
    document.getElementById('vehicleInsuranceForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect Form Data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const dob = document.getElementById('dob').value.trim();
        const gender = document.getElementById('gender')?.value || 'Not Provided'; // Optional field
        const address = document.getElementById('address')?.value || 'Not Provided'; // Optional field
        const status = document.getElementById('statuss').value;
        const premium = document.getElementById('premium').value;
        const vehicle_no = document.getElementById('vehicle_no').value.trim();
        const chassis = document.getElementById('chassis').value.trim();
        const vehicle_type = document.getElementById('vehicle_type').value;
        const fromDate = document.getElementById('fromDate').value.trim();
        const toDate = document.getElementById('toDate').value.trim();
        const aadhar = document.getElementById('aadhar').value.trim();
        const additionalInfo = document.getElementById('additional_info').value.trim(); // Optional field

        // Validation checks (check if required fields are filled)
        if (!name || !email || !mobile || !dob || !status || !premium || !vehicle_no || !chassis || !vehicle_type || !fromDate || !toDate || !aadhar) {
            alert('Please fill all required fields.');
            return;
        }

        // Prepare Payload for API Request
        const policyData = {
            "POLICY_NO": "", // Will be auto-generated or provided
            "NAME": name,
            "EMAIL": email,
            "MOBILE": mobile,
            "DOB": dob,
            "GENDER": gender,
            "ADDRESS": address,
            "STATUS": status,
            "VEHICLE_NO": vehicle_no,
            "NOMINEE": "Self",
            "CHASSIS": chassis,
            "VEHICLE_TYPE": vehicle_type,
            "PREMIUM": premium,
            "FROM_DATE": fromDate,
            "TO_DATE": toDate,
            "AADHAR": aadhar,
            "LIFE_ADDITIONAL_INFO": additionalInfo,
        };

        // API Call to Add New Policy
        fetch('http://localhost:5555/restv2/insurance/insertvehicle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(policyData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to insert policy.');
            }
            return response.json();
        })
        .then((data) => {
            const successMessage = data.message || 'Policy added successfully!'; // Fallback message if 'message' key is missing
        
            alert(successMessage);
            fetchPolicies(currentPage);

            document.getElementById('vehicleInsuranceForm').reset();
            bootstrap.Modal.getInstance(document.getElementById('addPolicyModal')).hide();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to add policy.');
        });
    });
};
