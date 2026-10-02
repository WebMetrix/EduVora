# Activity Feed Implementation Guide

This document outlines the metadata-driven architecture for the Recent Activities feed. By decoupling the database from UI presentation logic, we ensure that text formats, themes, and translations can be updated without altering database schemas or transaction records.

## 1. Architecture Overview

1.  **Database (SQL Server):** The `EV_GetRecentActivities` stored procedure aggregates events across multiple tables (`Tb_Referral`, `Tb_CommissionLedger`, etc.). It returns a standardized `ActivityCode`, a dynamic variable (`Param1`), and a pre-calculated `TimeAgoText`.
2.  **Configuration (XML):** The `activities.xml` file maps each `ActivityCode` to its UI representation (Template text, Badge label, and CSS Theme).
3.  **Application Layer (Node.js):** The backend executes the stored procedure, reads the XML file, injects `Param1` into the Template, and serves a fully formatted JSON array.
4.  **Presentation (React):** The frontend receives clean, ready-to-render objects.

## 2. Setting Up the XML Configuration

Place the `activities.xml` file in your Node.js project directory (e.g., `src/config/activities.xml`). 

If you need to add a new notification type in the future (e.g., `PROFILE_UPDATED`):
1.  Add the new `UNION ALL` block to the SQL stored procedure to return the new code.
2.  Add a corresponding `<Activity>` block to this XML file. No React or backend logic changes are required.

## 3. Backend Implementation (Node.js / Express)

You will need an XML parser like `fast-xml-parser` or `xml2js` to read the configuration file. Below is a standard implementation pattern for your controller.

```javascript
const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const db = require('../db'); // Your database connection module

// Load and parse the XML file once at startup (recommended for performance)
const xmlFile = fs.readFileSync('./config/activities.xml', 'utf8');
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
const parsedXml = parser.parse(xmlFile);

// Create a lookup dictionary for O(1) access
const activityMetadata = {};
parsedXml.Activities.Activity.forEach(act => {
    activityMetadata[act.code] = {
        template: act.Template,
        badgeText: act.BadgeText,
        badgeTheme: act.BadgeTheme
    };
});

exports.getRecentActivities = async (req, res) => {
    try {
        const { uuid } = req.user; // Assuming authenticated user UUID
        const pageNumber = req.query.page || 1;
        const pageSize = req.query.limit || 5;

        // 1. Execute the Stored Procedure
        const result = await db.execute('EV_GetRecentActivities', {
            UUID: uuid,
            PageNumber: pageNumber,
            PageSize: pageSize
        });

        // 2. Map the SQL results to the XML metadata
        const formattedActivities = result.recordset.map(row => {
            const meta = activityMetadata[row.ActivityCode];
            
            // Fallback if an unknown code is returned
            if (!meta) {
                return {
                    ActivityText: `Unknown Activity: ${row.Param1}`,
                    BadgeText: "System",
                    BadgeTheme: "Secondary",
                    TimeAgoText: row.TimeAgoText
                };
            }

            return {
                // Inject the dynamic parameter into the XML template
                ActivityText: meta.template.replace('{0}', row.Param1 || ''),
                BadgeText: meta.badgeText,
                BadgeTheme: meta.badgeTheme,
                TimeAgoText: row.TimeAgoText
            };
        });

        // 3. Send to React
        res.status(200).json({
            success: true,
            data: formattedActivities
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

import React, { useEffect, useState } from 'react';

const ActivityFeed = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch from the Node.js endpoint defined above
        fetch('/api/users/activities?page=1&limit=5')
            .then(res => res.json())
            .then(json => setActivities(json.data));
    }, []);

    // Map the XML themes to Tailwind CSS classes
    const themeStyles = {
        Success: 'bg-green-100 text-green-700',
        Primary: 'bg-blue-100 text-blue-700',
        Warning: 'bg-yellow-100 text-yellow-700',
        Secondary: 'bg-gray-100 text-gray-700'
    };

    return (
        <div className="activity-widget">
            <h3>Recent Activities</h3>
            <ul>
                {activities.map((activity, index) => (
                    <li key={index} className="flex justify-between items-center p-3 border-b">
                        <div>
                            <p className="font-medium text-gray-800">{activity.ActivityText}</p>
                            <span className="text-sm text-gray-500">{activity.TimeAgoText}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${themeStyles[activity.BadgeTheme]}`}>
                            {activity.BadgeText}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;