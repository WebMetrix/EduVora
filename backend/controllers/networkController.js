import pool, { sql } from "../config/db.js";
import logger from '../utils/logger.js';
import { t } from '../utils/translation.js';

// Get Dynamic Network Tree
export const getNetworkTree = async (req, res) => {
    try {
        const uuid = req.user.id;

        // 1. Get the Root UserID from the UUID via profile SP
        const userReq = pool.request();
        userReq.input('UUID', sql.VarChar(36), uuid);
        const userRes = await userReq.execute('dbo.EV_GetUserProfile');
        
        if (userRes.recordset.length === 0) {
            return res.status(404).json({ message: t('api.profile.notFound') });
        }
        
        const rootUserId = userRes.recordset[0].UserID;

        // 2. Fetch the flat network hierarchy
        const networkReq = pool.request();
        networkReq.input('RootUserID', sql.NVarChar(100), rootUserId);
        const networkRes = await networkReq.execute('dbo.EV_GetMyNetwork');

        const flatData = networkRes.recordset;

        if (!flatData || flatData.length === 0) {
            return res.status(200).json(null); // Return null if no network found
        }

        // 3. Helper to format a DB row into the exact JSON format expected by React UI
        const mapToNode = (row) => {
            // Reconstruct full avatar path if it exists
            const avatarUrl = row.ProfilePicturePath ? `${process.env.APP_URL}/avatars/${row.ProfilePicturePath}` : null;
            
            // Format Joining Date (e.g., "20 May 2025")
            let joiningDateStr = '';
            if (row.JoiningDate) {
                const dateObj = new Date(row.JoiningDate);
                joiningDateStr = dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            }

            return {
                id: row.UserID,               // Used for UI key and selection
                name: row.FullName,
                package: row.PackageName,
                status: row.AccountStatus,
                userId: row.UserID,
                sponsor: row.SponsorName,
                joiningDate: joiningDateStr,
                childrenCount: row.ChildrenCount,
                avatar: avatarUrl,
                children: [],                 // Crucial: initialize empty array for nesting
                _sponsorId: row.SponsorID,    // Temporary field for tree building
                _level: row.RelativeLevel     // Temporary field for tree building
            };
        };

        // 4. Construct the Nested Hierarchy from Flat Array
        const nodeMap = new Map();
        let rootNode = null;

        // First Pass: Create UI node objects for unique UserIDs (ignores LEFT JOIN duplicates)
        flatData.forEach(row => {
            if (!nodeMap.has(row.UserID)) {
                nodeMap.set(row.UserID, mapToNode(row));
            }
        });

        // Second Pass: Link children to their respective parents
        nodeMap.forEach(currentNode => {
            if (currentNode._level === 0) {
                // This is the anchor ("You")
                rootNode = currentNode;
            } else if (currentNode._sponsorId) {
                // This is a downline node. Find its parent and nest it.
                const parentNode = nodeMap.get(currentNode._sponsorId);
                // Prevent self-referencing circle
                if (parentNode && parentNode.id !== currentNode.id) {
                    parentNode.children.push(currentNode);
                }
            }
            
            // Clean up temporary fields before sending to UI
            delete currentNode._sponsorId;
            delete currentNode._level;
        });

        res.status(200).json(rootNode);

    } catch (err) {
        logger.error(`GET NETWORK ERROR: ${err.message}`, { stack: err.stack });
        res.status(500).json({ message: 'Error fetching network data' });
    }
};
