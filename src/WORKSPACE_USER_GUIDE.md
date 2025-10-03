# Workspace User Guide

## Overview

The redesigned workspace is your central hub for security operations, providing five powerful modules accessible via tabs.

## 🔍 Overview Tab - Natural Language Search

### What It Does
Query your security data using plain English instead of complex query languages.

### How to Use

1. **Enter Your Query**
   ```
   Examples:
   - "Show me all failed login attempts from external IPs in the last 24 hours"
   - "What are the top threat indicators this week?"
   - "List all admin privilege escalations"
   - "Find unusual data access patterns"
   ```

2. **Select Datasets (Optional)**
   - Click "All Datasets" to search everything
   - Or select specific datasets like "Azure AD Sign-ins" or "AWS CloudTrail"
   - Multiple datasets can be selected

3. **Get AI-Powered Results**
   - Summary of findings
   - Key insights extracted from data
   - AI recommendations for action

### Example Workflow
```
1. Type: "Show authentication failures by user"
2. Select: "Azure AD Sign-ins" dataset
3. Click search or press Enter
4. Review: AI-generated insights and recommendations
5. Take action based on findings
```

## 📊 Canvas Tab - Analytics & Reports

### What It Does
Visualize your security posture with real-time dashboards and reports.

### Available Visualizations

#### 1. KPI Cards (Top Row)
- **Total Events** - All security events with trend
- **Active Threats** - Current threats requiring attention
- **Assets Monitored** - Total assets under surveillance
- **Avg Response Time** - Mean time to respond to incidents

#### 2. Security Events Trend
- 7-day area chart showing event volume
- Separate lines for total events vs. threats
- Identify patterns and anomalies

#### 3. Threat Distribution
- Pie chart showing threat categories
- Breakdown: Unauthorized Access, Malware, Phishing, etc.
- Helps prioritize security focus areas

#### 4. Assets by Type
- Bar chart of asset inventory
- Categories: Users, Devices, Applications, Cloud Resources
- Track asset growth and coverage

#### 5. Top Security Events
- Ranked list of most frequent events
- Shows count and percentage change
- Quick identification of trending issues

### How to Use
1. Navigate to Canvas tab
2. Review KPI cards for high-level metrics
3. Examine charts for detailed patterns
4. Export reports using the "Export" button in header
5. Share insights with "Share" button

## 🚨 Alerts Tab - Security Alerts

### What It Does
Display and manage alerts generated from your connected datasets.

### Alert Properties

Each alert shows:
- **Severity Badge** - Critical, High, Medium, or Low
- **Status Badge** - Open, Investigating, or Resolved
- **Title** - Brief description of the alert
- **Description** - Detailed explanation
- **Dataset** - Which data source triggered it
- **Timestamp** - When it was detected

### Severity Levels

| Severity | Color | Meaning |
|----------|-------|---------|
| Critical | Red | Immediate action required |
| High | Orange | Urgent attention needed |
| Medium | Yellow | Review when possible |
| Low | Blue | Informational |

### Status States

| Status | Icon | Meaning |
|--------|------|---------|
| Open | ⚠️ | New, awaiting review |
| Investigating | 👁️ | Under active investigation |
| Resolved | ✅ | Closed/mitigated |

### How to Use

1. **View All Alerts**
   - Default view shows all alerts

2. **Filter Alerts**
   - Click filter badges: "All", "Critical", "Open"
   - Combine filters as needed

3. **Review Alert Details**
   - Click on an alert card to view full details
   - See associated dataset and timeline

4. **Take Action**
   - Mark as investigating
   - Escalate if needed
   - Resolve when complete

5. **Create Alert Rules**
   - Click "Create Alert Rule" button
   - Define conditions that trigger alerts
   - Set notification preferences

### Example Alerts

**Critical Alert:**
```
Title: Suspicious Login from Unusual Location
Description: User account accessed from IP in Russia, 
             outside normal geolocation pattern
Dataset: Azure AD Sign-ins
Action: Investigate immediately, consider account lockdown
```

**High Alert:**
```
Title: Multiple Failed Authentication Attempts
Description: 15 failed login attempts for admin account 
             in last 5 minutes
Dataset: Azure AD Sign-ins
Action: Check for brute force attack, reset password if needed
```

## ⚙️ Workflows Tab - Automation

### What It Does
Manage automated security workflows that respond to events without manual intervention.

### Pre-Built Workflows

#### 1. Incident Response Automation
- **Trigger:** Critical alerts detected
- **Actions:** 5 automated steps
- **Purpose:** Triage and respond to incidents
- **Status:** Active, 142 total runs

#### 2. User Provisioning & Deprovisioning
- **Trigger:** HR system events
- **Actions:** 8 automated steps
- **Purpose:** Manage user lifecycle
- **Status:** Active, 89 total runs

#### 3. Threat Intelligence Enrichment
- **Trigger:** New IOCs detected
- **Actions:** 3 automated steps
- **Purpose:** Enrich alerts with threat data
- **Status:** Paused, 256 total runs

#### 4. Compliance Audit Workflow
- **Trigger:** Daily schedule
- **Actions:** 6 automated steps
- **Purpose:** Automated compliance checks
- **Status:** Active, 34 total runs

### Workflow Properties

Each workflow card shows:
- **Name** - Descriptive title
- **Description** - What it does
- **Status Badge** - Active (▶️) or Paused (⏸️)
- **Trigger** - What starts the workflow
- **Actions** - Number of steps
- **Total Runs** - Execution count

### How to Use

1. **View Workflows**
   - All workflows displayed as cards
   - Active workflows have green badge

2. **Edit Workflow**
   - Click "Edit" button
   - Modify triggers or actions
   - Save changes

3. **View Runs**
   - Click "View Runs" button
   - See execution history
   - Review successes/failures

4. **Create New Workflow**
   - Click "Create Workflow" button
   - Choose template or start from scratch
   - Define triggers and actions

5. **Pause/Resume**
   - Click status badge to toggle
   - Paused workflows won't execute

### Workflow Best Practices

1. **Start Simple** - Begin with pre-built templates
2. **Test Thoroughly** - Use test mode before activating
3. **Monitor Runs** - Regularly check execution logs
4. **Update Regularly** - Adjust as threats evolve
5. **Document Changes** - Track workflow modifications

## 💾 Datasets Tab - Data Sources

### What It Does
Shows all data sources connected to this workspace and their status.

### Connected Datasets

#### 1. Azure AD Sign-ins
- **Type:** Identity
- **Records:** 125,000
- **Last Updated:** 5 min ago
- **Status:** Active ✅

#### 2. AWS CloudTrail
- **Type:** Cloud
- **Records:** 450,000
- **Last Updated:** 2 min ago
- **Status:** Active ✅

#### 3. CrowdStrike EDR
- **Type:** Endpoint
- **Records:** 89,000
- **Last Updated:** 10 min ago
- **Status:** Active ✅

#### 4. Splunk SIEM
- **Type:** SIEM
- **Records:** 2,100,000
- **Last Updated:** 1 min ago
- **Status:** Active ✅

### Dataset Properties

Each dataset card shows:
- **Icon** - Visual identifier
- **Name** - Dataset display name
- **Type Badge** - Category (Identity, Cloud, Endpoint, etc.)
- **Status Badge** - Connection status
- **Record Count** - Total records ingested
- **Last Updated** - Most recent data sync

### How to Use

1. **View Dataset Details**
   - Click on dataset card
   - See configuration and statistics

2. **Configure Dataset**
   - Click "Configure" button
   - Adjust sync settings
   - Update credentials if needed

3. **View Data**
   - Click "View Data" button
   - Preview records
   - Validate data quality

4. **Add New Dataset**
   - Click "Add Dataset" button
   - Select data source type
   - Configure connection
   - Test and save

5. **Monitor Health**
   - Check status badges regularly
   - Review last updated times
   - Ensure consistent data flow

### Dataset Status Indicators

| Status | Icon | Color | Meaning |
|--------|------|-------|---------|
| Active | 📡 | Green | Receiving data normally |
| Syncing | 🔄 | Blue | Currently updating |
| Error | ❌ | Red | Connection issue |
| Paused | ⏸️ | Gray | Manually disabled |

## 🎯 Common Workflows

### Investigating a Security Incident

1. **Start in Alerts Tab**
   - Find the critical alert
   - Note the dataset and timestamp

2. **Search in Overview Tab**
   - Query: "Show all events related to [IP/user/resource] in last 24 hours"
   - Select relevant dataset
   - Review AI insights

3. **Analyze in Canvas Tab**
   - Check if incident is part of larger trend
   - Review threat distribution
   - Look for correlated events

4. **Check Workflows Tab**
   - Verify if automation triggered
   - Review workflow execution logs
   - Adjust workflows if needed

### Setting Up New Monitoring

1. **Add Dataset (Datasets Tab)**
   - Connect new data source
   - Configure sync schedule
   - Validate data ingestion

2. **Create Alert Rules (Alerts Tab)**
   - Define conditions for alerts
   - Set severity thresholds
   - Configure notifications

3. **Build Workflow (Workflows Tab)**
   - Create automation for responses
   - Test with sample data
   - Activate when ready

4. **Monitor Results (Canvas Tab)**
   - Track new metrics
   - Verify data quality
   - Adjust as needed

## 💡 Tips & Tricks

### Natural Language Search
- Be specific: "failed logins" vs "authentication issues"
- Include timeframes: "last 24 hours", "this week"
- Use comparisons: "more than 10 attempts"
- Reference entities: usernames, IPs, resources

### Dashboard Optimization
- Regularly review KPI trends
- Export reports for stakeholders
- Share interesting findings
- Set up scheduled exports

### Alert Management
- Triage by severity first
- Use filters to focus on active threats
- Document resolution steps
- Create workflows for common responses

### Workflow Efficiency
- Start with templates
- Keep workflows simple and focused
- Test before deploying to production
- Monitor execution success rates

### Dataset Health
- Check sync times daily
- Investigate stale datasets immediately
- Ensure adequate retention periods
- Balance volume vs. storage costs

## 🆘 Troubleshooting

### Search Not Returning Results
1. Check dataset selection
2. Verify query syntax
3. Ensure datasets are actively syncing
4. Try broader search terms

### Charts Not Loading
1. Refresh the page
2. Check dataset connections
3. Verify date ranges
4. Clear browser cache

### Alerts Not Appearing
1. Check alert rule configuration
2. Verify dataset is sending data
3. Review severity thresholds
4. Check notification settings

### Workflow Not Running
1. Verify workflow is active (not paused)
2. Check trigger conditions
3. Review execution logs
4. Test with sample data

### Dataset Connection Issues
1. Click "Configure" on dataset
2. Verify credentials
3. Test connection
4. Check network/firewall settings
5. Review API quotas/limits

## 📈 Best Practices

### Daily Routine
1. Check Alerts tab for new critical/high alerts
2. Review Canvas tab for anomalies in trends
3. Verify dataset sync times in Datasets tab
4. Monitor workflow execution in Workflows tab

### Weekly Review
1. Use Overview search to identify patterns
2. Export Canvas reports for documentation
3. Review and close resolved alerts
4. Optimize workflows based on execution data
5. Audit dataset health metrics

### Monthly Audit
1. Review all alert rules for relevance
2. Analyze Canvas trends for long-term patterns
3. Clean up old/unused workflows
4. Evaluate dataset utility and costs
5. Document improvements and changes

## 🚀 Getting Started Checklist

- [ ] Explore each tab to understand layout
- [ ] Try example natural language queries in Overview
- [ ] Review all visualizations in Canvas
- [ ] Check current alerts in Alerts tab
- [ ] Examine pre-built workflows
- [ ] Verify all datasets are connected
- [ ] Create your first custom alert rule
- [ ] Build your first workflow
- [ ] Share a Canvas report with your team
- [ ] Set up daily monitoring routine

---

**Need Help?** 
- Check inline tooltips (hover over icons)
- Review example queries and workflows
- Contact support for advanced assistance