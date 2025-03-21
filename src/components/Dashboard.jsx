import React, { useState } from "react";
import { Bell } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "./Card";
import { Table } from "./Table";
import { Modal, Button } from "react-bootstrap"; // Importing Bootstrap components

const Dashboard = () => {
  const [alerts, setAlerts] = useState(2);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const buildData = [
    { timeframe: "Last 24h", running: 4, failed: 2, completed: 10, errored: 1 },
    { timeframe: "Last 7d", running: 20, failed: 5, completed: 50, errored: 3 },
    { timeframe: "Last 30d", running: 90, failed: 10, completed: 200, errored: 8 },
  ];
  const applicationHealthSummary = [
    { application: "App-A", status: "🟢 Healthy", successRate: "98%", issues: "None" },
    { application: "App-B", status: "🟠 Minor Issues", successRate: "85%", issues: "Slow Build" },
    { application: "App-C", status: "🔴 Failing", successRate: "60%", issues: "Deployment Errors" },
    { application: "App-D", status: "🟢 Healthy", successRate: "97%", issues: "None" },
    { application: "App-E", status: "🔴 Failing", successRate: "50%", issues: "Outdated Dependencies" },
  ];

  const serviceLevelBreakdownData = {
    "App-A": [
      { service: "Auth Service", status: "🟢 Healthy", issues: "None" },
      { service: "Payment Service", status: "🟢 Healthy", issues: "None" },
      { service: "User Service", status: "🟠 Minor Issues", issues: "Slow Response" },
    ],
    "App-B": [
      { service: "Auth Service", status: "🟢 Healthy", issues: "None" },
      { service: "Payment Service", status: "🟠 Minor Issues", issues: "Slow Response" },
      { service: "User Service", status: "🔴 Failing", issues: "API Failures" },
    ],
    "App-C": [
      { service: "Auth Service", status: "🔴 Failing", issues: "Authentication Errors" },
      { service: "Payment Service", status: "🟠 Minor Issues", issues: "Timeouts" },
      { service: "User Service", status: "🟡 Under Maintenance", issues: "Scheduled Downtime" },
    ],
    "App-D": [
      { service: "Auth Service", status: "🟢 Healthy", issues: "None" },
      { service: "Payment Service", status: "🟠 Minor Issues", issues: "Slow Response" },
      { service: "User Service", status: "🔴 Failing", issues: "API Failures" },
    ],
    "App-E": [
      { service: "Auth Service", status: "🔴 Failing", issues: "Authentication Errors" },
      { service: "Payment Service", status: "🟠 Minor Issues", issues: "Timeouts" },
      { service: "User Service", status: "🟡 Under Maintenance", issues: "Scheduled Downtime" },
    ],
  };

  // Service-Level Metrics (for Modal)
  const buildMetrics = [
    { metric: "Running Builds", value: 3, status: "🟠" },
    { metric: "Successful Builds", value: 40, status: "🟢" },
    { metric: "Failed Builds", value: 5, status: "🔴" },
    { metric: "Errored Builds", value: 2, status: "🔴" },
    { metric: "Avg. Build Time", value: "12 mins", status: "🟢" },
  ];
  const chartData = [
    { name: '24h', builds: 20, errors: 5 },
    { name: '7d', builds: 50, errors: 10 },
    { name: '30d', builds: 200, errors: 20 }
  ];

  const deploymentMetrics = [
    { deployment: "Deployment-101", status: "🟢 Success", duration: "10 mins", failureReason: "N/A" },
    { deployment: "Deployment-102", status: "🔴 Failed", duration: "15 mins", failureReason: "Timeout" },
    { deployment: "Deployment-103", status: "🟠 Partial", duration: "12 mins", failureReason: "DB Sync Issue" },
    { deployment: "Deployment-104", status: "🟢 Success", duration: "8 mins", failureReason: "N/A" },
    { deployment: "Deployment-105", status: "🔴 Failed", duration: "18 mins", failureReason: "Permission Issue" },
  ];

  const mrExecutionStatus = [
    { mrId: "MR-001", status: "🟢 Merged", reviewer: "Alice", timeToMerge: "2h" },
    { mrId: "MR-002", status: "🔴 Failed", reviewer: "Bob", timeToMerge: "-" },
    { mrId: "MR-003", status: "🟠 In Review", reviewer: "Charlie", timeToMerge: "-" },
    { mrId: "MR-004", status: "🟢 Merged", reviewer: "David", timeToMerge: "3h" },
    { mrId: "MR-005", status: "🟢 Merged", reviewer: "Emily", timeToMerge: "1h" },
  ];

  const buildTrendsData = [
    { date: 'Feb 14', success: 14, failed: 3, errored: 1, total: 18, successRate: 77.78, failureRate: 16.67 },
    { date: 'Feb 15', success: 16, failed: 1, errored: 0, total: 17, successRate: 94.12, failureRate: 5.88 },
    { date: 'Feb 16', success: 18, failed: 2, errored: 0, total: 20, successRate: 90.00, failureRate: 10.00 },
    { date: 'Feb 17', success: 13, failed: 4, errored: 1, total: 18, successRate: 72.22, failureRate: 22.22 },
    { date: 'Feb 18', success: 12, failed: 2, errored: 1, total: 15, successRate: 80.00, failureRate: 13.33 },
    { date: 'Feb 19', success: 10, failed: 3, errored: 2, total: 15, successRate: 66.67, failureRate: 20.00 },
    { date: 'Feb 20', success: 15, failed: 1, errored: 1, total: 17, successRate: 88.24, failureRate: 5.88 },
    { date: 'Feb 21', success: 11, failed: 4, errored: 0, total: 15, successRate: 73.33, failureRate: 26.67 },
    { date: 'Feb 22', success: 13, failed: 2, errored: 0, total: 15, successRate: 86.67, failureRate: 13.33 },
    { date: 'Feb 23', success: 17, failed: 3, errored: 1, total: 21, successRate: 80.95, failureRate: 14.29 },
    { date: 'Feb 24', success: 14, failed: 2, errored: 1, total: 17, successRate: 82.35, failureRate: 11.76 },
    { date: 'Feb 25', success: 20, failed: 1, errored: 0, total: 21, successRate: 95.24, failureRate: 4.76 },
    { date: 'Feb 26', success: 19, failed: 2, errored: 0, total: 21, successRate: 90.48, failureRate: 9.52 },
    { date: 'Feb 27', success: 22, failed: 1, errored: 0, total: 23, successRate: 95.65, failureRate: 4.35 },
  ];

  const jenkinsStatusData = [
    { metric: "Total Controllers", value: 5, status: "🟢" },
    { metric: "Active Controllers", value: 3, status: "🟢" },
    { metric: "Degraded Controllers", value: 1, status: "🟠" },
    { metric: "Offline Controllers", value: 1, status: "🔴" },
    { metric: "Total Nodes", value: 10, status: "🟢" },
    { metric: "Available Nodes", value: 7, status: "🟢" },
    { metric: "In Use Nodes", value: 2, status: "🟠" },
    { metric: "Offline Nodes", value: 1, status: "🔴" },
  ];

  const offlineNodeAlerts = [
    { nodeName: "Node-01", status: "🔴", lastDowntime: "2h ago", reason: "Disk Full" },
    { nodeName: "Node-03", status: "🟠", lastDowntime: "1h ago", reason: "High CPU Usage" },
    { nodeName: "Node-05", status: "🔴", lastDowntime: "30m ago", reason: "Connection Lost" },
    { nodeName: "Node-08", status: "🟢", lastDowntime: "-", reason: "N/A" },
    { nodeName: "Node-10", status: "🟢", lastDowntime: "-", reason: "N/A" },
  ];


  const handleAppClick = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedApp(null);
  };

  return (
    <div className="container py-4">
    {/* Header Section */}
    <Card className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="h3">CI/CD Pipeline Dashboard</h1>
        <div className="d-flex gap-3 align-items-center">
          {/* Date Range Dropdown */}
          <select className="form-select w-auto">
            <option>Date Range</option>
          </select>
  
          {/* VSAD Dropdown */}
          <select className="form-select w-auto">
            <option>VSAD</option>
          </select>
  
          {/* Bell Icon */}
          <div className="position-relative">
            <Bell className="cursor-pointer" />
            {alerts > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {alerts}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  
<strong>1. Jenkins Status Overview</strong>
      {/* Jenkins Status Overview */}
      <div className="row">
        <div className="col-lg-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Jenkins Status Overview</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jenkinsStatusData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.metric}</td>
                    <td>{row.value}</td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>

        {/* Node Offline Alerts */}
        <div className="col-lg-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Offline Node Alerts</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Node Name</th>
                  <th>Status</th>
                  <th>Last Downtime</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {offlineNodeAlerts.map((row, index) => (
                  <tr key={index}>
                    <td>{row.nodeName}</td>
                    <td>{row.status}</td>
                    <td>{row.lastDowntime}</td>
                    <td>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>

      <strong>2. Application Health Summary</strong>
      {/* Application Health Summary */}
      <div className="row">
        <div className="col-lg-12">
          <Card className="mb-4">
            <h2 className="h5"><strong>Application Health Summary</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Status</th>
                  <th>Success Rate (%)</th>
                  <th>Issues</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicationHealthSummary.map((row, index) => (
                  <tr key={index}>
                    <td>{row.application}</td>
                    <td>{row.status}</td>
                    <td>{row.successRate}</td>
                    <td>{row.issues}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleAppClick(row.application)}
                      >
                        View Services
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
      </div>

      {/* Modal for Service-Level Breakdown */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Service-Level Breakdown - {selectedApp}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApp && (
            <>
              <h5>Services</h5>
              <Table className="mb-4">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceLevelBreakdownData[selectedApp]?.map((service, index) => (
                    <tr key={index}>
                      <td>{service.service}</td>
                      <td>{service.status}</td>
                      <td>{service.issues}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Build, Deployment Metrics, and Trends stacked vertically */}
              <Card className="mb-4">
                <h5>Build Metrics</h5>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildMetrics.map((row, index) => (
                      <tr key={index}>
                        <td>{row.metric}</td>
                        <td>{row.value}</td>
                        <td>{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>

              <Card className="mb-4">
                <h5>Deployment Metrics</h5>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>Deployment</th>
                      <th>Status</th>
                      <th>Duration</th>
                      <th>Failure Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deploymentMetrics.map((row, index) => (
                      <tr key={index}>
                        <td>{row.deployment}</td>
                        <td>{row.status}</td>
                        <td>{row.duration}</td>
                        <td>{row.failureReason}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>

              <Card className="mb-4">
                <h5>Build Trends (Last 14 Days)</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={buildTrendsData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="success" stroke="#4caf50" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="failed" stroke="#f44336" strokeWidth={2} />
                <Line type="monotone" dataKey="errored" stroke="#ff9800" strokeWidth={2} />
                <Line type="monotone" dataKey="total" stroke="#2196f3" strokeWidth={2} />
                <Line type="monotone" dataKey="successRate" stroke="#4caf50" strokeWidth={2} />
                <Line type="monotone" dataKey="failureRate" stroke="#f44336" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      
<strong>3. Merge Request (MR) Status</strong>
      {/* Merge Request Execution Status */}
      <div className="row">
        <div className="col-lg-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅PR/MR Execution Status</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>MR ID</th>
                  <th>Status</th>
                  <th>Reviewer</th>
                  <th>Time to Merge</th>
                </tr>
              </thead>
              <tbody>
                {mrExecutionStatus.map((row, index) => (
                  <tr key={index}>
                    <td>{row.mrId}</td>
                    <td>{row.status}</td>
                    <td>{row.reviewer}</td>
                    <td>{row.timeToMerge}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </div>
        <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Open vs Merged PRs</strong></h2>
      <ul>
        <li><strong>Open PRs:</strong> 8</li>
        <li><strong>Merged PRs:</strong> 15</li>
        <li><strong>Longest Open PR:</strong> 3 days</li>
        <li><strong>Avg PR Review Time:</strong> 2.5h</li>
      </ul>
    </Card>
  </div>
      </div>

 

 

 <strong>4. Base Image Updates</strong>
<div className="row">
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Base Image Compliance</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Application</th>
            <th>Status</th>
            <th>Last Updated</th>
            <th>Compliance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>App-A</td>
            <td>🟢 Updated</td>
            <td>3 days ago</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>App-B</td>
            <td>🔴 Outdated</td>
            <td>20 days ago</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>App-C</td>
            <td>🟠 Pending</td>
            <td>7 days ago</td>
            <td>❌</td>
          </tr>
          <tr>
            <td>App-D</td>
            <td>🟢 Updated</td>
            <td>2 days ago</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>App-E</td>
            <td>🔴 Outdated</td>
            <td>30 days ago</td>
            <td>❌</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>
  
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Pending Base Image Updates</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Current Version</th>
            <th>New Version</th>
            <th>Compliance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Auth Service</td>
            <td>v1.2.3</td>
            <td>v1.3.0</td>
            <td>🟢</td>
          </tr>
          <tr>
            <td>Payment Service</td>
            <td>v2.1.0</td>
            <td>v2.1.5</td>
            <td>🟢</td>
          </tr>
          <tr>
            <td>User Service</td>
            <td>v3.0.1</td>
            <td>v3.1.0</td>
            <td>🟠</td>
          </tr>
          <tr>
            <td>Notification Service</td>
            <td>v1.1.5</td>
            <td>v1.2.0</td>
            <td>🔴</td>
          </tr>
          <tr>
            <td>Logging Service</td>
            <td>v2.0.2</td>
            <td>v2.0.8</td>
            <td>🔴</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>
</div>



 <strong>5. Branch Lock Status Tables</strong>
<div className="row">
  {/* Locked Branches Table */}
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Locked Branches</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Branch</th>
            <th>Status</th>
            <th>Locked By</th>
            <th>Lock Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>main</td>
            <td>🔴 Locked</td>
            <td>Alice</td>
            <td>Release Lock</td>
          </tr>
          <tr>
            <td>dev</td>
            <td>🟢 Unlocked</td>
            <td>Bob</td>
            <td>-</td>
          </tr>
          <tr>
            <td>feature-1</td>
            <td>🔴 Locked</td>
            <td>Charlie</td>
            <td>Security Fix</td>
          </tr>
          <tr>
            <td>hotfix-2</td>
            <td>🟠 Restricted</td>
            <td>David</td>
            <td>Review Pending</td>
          </tr>
          <tr>
            <td>staging</td>
            <td>🔴 Locked</td>
            <td>Emily</td>
            <td>Compliance Check</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>

  {/* Who Locked/Unlocked & When Table */}
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Who Locked/Unlocked & When</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Branch</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alice</td>
            <td>Locked</td>
            <td>main</td>
            <td>Feb 22, 10:00 AM</td>
          </tr>
          <tr>
            <td>Bob</td>
            <td>Unlocked</td>
            <td>dev</td>
            <td>Feb 22, 11:30 AM</td>
          </tr>
          <tr>
            <td>Charlie</td>
            <td>Locked</td>
            <td>feature-1</td>
            <td>Feb 21, 3:00 PM</td>
          </tr>
          <tr>
            <td>David</td>
            <td>Restricted</td>
            <td>hotfix-2</td>
            <td>Feb 20, 2:00 PM</td>
          </tr>
          <tr>
            <td>Emily</td>
            <td>Locked</td>
            <td>staging</td>
            <td>Feb 19, 1:00 PM</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>
</div>
<strong>6.Jenkins Nodes Availability Tables</strong>
<div className="row">
  {/* Availability Metrics Table */}
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Availability Metrics</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Available Nodes</td>
            <td>7</td>
            <td>🟢</td>
          </tr>
          <tr>
            <td>Offline Nodes</td>
            <td>3</td>
            <td>🔴</td>
          </tr>
          <tr>
            <td>Nodes in Auto-Scaling</td>
            <td>2</td>
            <td>🟠</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>

  {/* Recent Node Failures Table */}
  <div className="col-md-6">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Recent Node Failures</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Node</th>
            <th>Status</th>
            <th>Last Failure</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Node-01</td>
            <td>🔴</td>
            <td>2h ago</td>
            <td>Disk Full</td>
          </tr>
          <tr>
            <td>Node-02</td>
            <td>🟢</td>
            <td>-</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Node-05</td>
            <td>🔴</td>
            <td>30m ago</td>
            <td>Connection Lost</td>
          </tr>
          <tr>
            <td>Node-07</td>
            <td>🟠</td>
            <td>1h ago</td>
            <td>High CPU Usage</td>
          </tr>
          <tr>
            <td>Node-09</td>
            <td>🟢</td>
            <td>-</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>
</div>

{/* Historical Uptime Trends Table */}
<div className="row">
  <div className="col-md-12">
    <Card className="mb-4">
      <h2 className="h5"><strong>✅Historical Uptime Trends</strong></h2>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Uptime (%)</th>
            <th>Downtime (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Feb 18</td>
            <td>99%</td>
            <td>1%</td>
          </tr>
          <tr>
            <td>Feb 19</td>
            <td>95%</td>
            <td>5%</td>
          </tr>
          <tr>
            <td>Feb 20</td>
            <td>92%</td>
            <td>8%</td>
          </tr>
          <tr>
            <td>Feb 21</td>
            <td>98%</td>
            <td>2%</td>
          </tr>
          <tr>
            <td>Feb 22</td>
            <td>97%</td>
            <td>3%</td>
          </tr>
        </tbody>
      </Table>
    </Card>
  </div>
</div>
<strong>7. Sonar Status</strong>
 {/* Sonar Status by Service Table */}
 

 <div className="row">
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Sonar Scan Status</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>App-01</td>
                  <td>🟢 Passed</td>
                </tr>
                <tr>
                  <td>App-02</td>
                  <td>🔴 Failed</td>
                </tr>
                <tr>
                  <td>App-03</td>
                  <td>🟠 In Progress</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Sonar Status (Service Wise)</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Total</th>
                  <th>Pass</th>
                  <th>Fail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service-01</td>
                  <td>30</td>
                  <td>25</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Service-02</td>
                  <td>20</td>
                  <td>15</td>
                  <td>5</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
        </div>


      <strong>8. Blackduck Scan Status</strong>
{/* Blackduck Scan Status Table */}
<div className="row">
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Blackduck Scan Status</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>App-01</td>
                  <td>🟢 Passed</td>
                </tr>
                <tr>
                  <td>App-02</td>
                  <td>🔴 Failed</td>
                </tr>
                <tr>
                  <td>App-03</td>
                  <td>🟠 In Progress</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>

        {/* Blackduck Scan Status by Service Table */}
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Blackduck Scan Status (Service Wise)</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service-01</td>
                  <td>🟢 Passed</td>
                </tr>
                <tr>
                  <td>Service-02</td>
                  <td>🔴 Failed</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
       <strong>9. Build Issues Count</strong> 
      </div>
      {/* Build Issues Count Table */}
      <div className="row">
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Build Issues Count</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>App-01</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>App-02</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>App-03</td>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>

        {/* Build Issues Count by Service Table */}
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Build Issues Count (Service Wise)</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service-01</td> 
                  <td>1</td>
                </tr>
                <tr>
                  <td>Service-02</td>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
      <strong>10. Deploy Issues Count</strong>
        {/* Deploy Issues Count Table */}
        <div className="row">
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Deploy Issues Count</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Application</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>App-01</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>App-02</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>App-03</td>
                  <td>1</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>

        {/* Deploy Issues Count by Service Table */}
        <div className="col-md-6">
          <Card className="mb-4">
            <h2 className="h5"><strong>✅Deploy Issues Count (Service Wise)</strong></h2>
            <Table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Service-01</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>Service-02</td>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
