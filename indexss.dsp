<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insurance Policies</title>
    <!-- Bootstrap CSS for responsive design and styling -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        body {
            background-color: #f4f4f4;
            font-family: 'Arial', sans-serif;
        }
        .container {
            margin-top: 30px;
        }
        h1 {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #333;
        }
        h2 {
            font-size: 2em;
            margin-bottom: 20px;
            color: #0056b3;
        }
        .list-group-item {
            cursor: pointer;
        }
        .table th, .table td {
            text-align: center;
        }
        .table {
            margin-top: 20px;
            background-color: white;
            border-radius: 8px;
        }
        .table th {
            background-color: #f8f9fa;
            color: #0056b3;
        }
        .table tbody tr:hover {
            background-color: #f1f1f1;
        }
        .sidebar {
            padding-right: 20px;
        }
        .sidebar a {
            padding: 15px;
            background-color: #007bff;
            color: white;
            text-align: center;
            font-size: 1.2em;
            border-radius: 5px;
        }
        .sidebar a:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center">Insurance Policies</h1>
        <div class="row">
            <!-- Sidebar Navigation -->
            <div class="col-md-3 sidebar">
                <div class="list-group">
                    <a href="?input=Life Insurance" class="list-group-item">Life Insurance</a>
                    <a href="?input=Vehicle Insurance" class="list-group-item">Vehicle Insurance</a>
                    <a href="?input=Travel Insurance" class="list-group-item">Travel Insurance</a>
                </div>
            </div>
            <!-- Main Content Area -->
            <div class="col-md-9">
                <h2 id="policyTypeHeader">
                    Policies
                </h2>
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Policy No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>From Date</th>
                            <th>To Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Invoke WebMethods Service -->
                        <invoke name="InsuranceAPI.services:getPolicyByTypes">
                            <input name="input" value="%type%" />
                            <loop name="getPolicyByTypesOutput/results">
                                <tr>
                                    <td><value name="getPolicyByTypesOutput/results/POLICY_NO" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/NAME" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/EMAIL" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/MOBILE" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/FROM_DATE" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/TO_DATE" /></td>
                                    <td><value name="getPolicyByTypesOutput/results/STATUS" /></td>
                                </tr>
                            </loop>
                        </invoke>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- Bootstrap JS for responsive interactions -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
