
import('./config/db.js').then(async (db) => {
    const result = await db.default.request().input('EventId', 4).execute('EV_GetEmailTemplate');
    let html = result.recordset[0].EmailTemplate;
    const values = {
        ResetDateTime: 'TEST_TIME',
        IPAddress: 'TEST_IP',
        Browser: 'TEST_BROWSER',
        Location: 'TEST_LOCATION'
    };
    Object.keys(values).forEach(key => {
        html = html.replace(
            new RegExp(\\\\\\\\\{\\\\\\\\{ \ \\\\\\\\}\\\\\\\\}\, 'g'),
            values[key] ?? ''
        ).replace(
            new RegExp(\\\\\\\\\{\\\\\\\\{ \\\\\\\\\}\\\\\\\\}\, 'g'),
            values[key] ?? ''
        ).replace(
            new RegExp(\\\\\\\\\{\\\\\\\\{\ \\\\\\\\}\\\\\\\\}\, 'g'),
            values[key] ?? ''
        ).replace(
            new RegExp(\\\\\\\\\{\\\\\\\\{\\\\\\\\\}\\\\\\\\}\, 'g'),
            values[key] ?? ''
        ).replace(
            new RegExp(\\\\\\\\\{\\\\\\\\\}\, 'g'),
            values[key] ?? ''
        );
    });
    console.log(html.includes('TEST_TIME') ? 'SUCCESS: Replaced' : 'FAILED: Not replaced');
});
