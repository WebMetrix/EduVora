import pool, { sql } from '../config/db.js';
import logger from '../utils/logger.js';
import { sendEmail } from '../services/emailService.js';
import EmailEvents from '../utils/emailEvents.js';

export const getMyEarnings = async (req, res) => {
    // #swagger.tags = ['Earnings']
    try {
        const uuid = req.user.id;

        const request = pool.request();

        // Mapped strictly to Tb_User.UUID (varchar(36))
        request.input('UUID', sql.VarChar(36), uuid);

        const result = await request.execute('dbo.EV_GetMyEarnings');

        // Mssql returns multiple result sets as an array of arrays in `result.recordsets`

        // 1. Wallet & Summary Stats (Top Cards)
        const summary = result.recordsets[0] && result.recordsets[0].length > 0
            ? result.recordsets[0][0]
            : null;

        // 2. Timeframe Dashboard Stats (Monthly/Quarterly/Yearly totals and growth %)
        const periodStats = result.recordsets[1] || [];

        // 3. Earnings Overview Chart (Time series grouped by Day/Month)
        const chartData = result.recordsets[2] || [];

        // 4. Earnings By Level (Doughnut Chart data for current month)
        const levelStats = result.recordsets[3] || [];

        // 5. Commission History Table (Deep list with user details)
        const commissions = result.recordsets[4] || [];

        // 6. Wallet Transactions Table (Credits, Withdrawals, Pending)
        const transactions = result.recordsets[5] || [];

        res.status(200).json({
            summary,
            periodStats,
            chartData,
            levelStats,
            commissions,
            transactions
        });

    } catch (error) {
        logger.error('Error fetching earnings details:', error);
        res.status(500).json({ message: 'Failed to retrieve earnings details', error: error.message });
    }
};

export const withdrawWallet = async (req, res) => {
    // #swagger.tags = ['Earnings']
    try {
        const uuid = req.user.id;
        const { amount } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid withdrawal amount' });
        }

        const request = pool.request();
        request.input('Action', sql.Int, 1); // 1 = Initiate
        request.input('UUID', sql.VarChar(36), uuid);
        request.input('Amount', sql.Decimal(18,2), amount);

        const result = await request.execute('dbo.EV_ProcessWalletWithdrawal');
        
        const dbRes = result.recordset[0];
        
        if (!dbRes || dbRes.Success === -1) {
            return res.status(400).json({ success: false, message: dbRes?.Message || 'Withdrawal failed in database' });
        }

        const { TransactionId, AccountNumber, IFSCCode, AccountHolderName, EmailAddress, MobileNumber } = dbRes;
        const userEmail = EmailAddress || req.user.email;
        const recipientName = dbRes.FullName || AccountHolderName || req.user.name || 'Valued Member';
        const formattedAmount = `₹${Number(amount).toLocaleString('en-IN')}`;
        const withdrawalId = `WD_${TransactionId}`;
        const currentDateTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // Trigger WITHDRAWAL_REQUESTED (Event 28)
        if (userEmail) {
            sendEmail({
                eventId: EmailEvents.WITHDRAWAL_REQUESTED,
                to: userEmail,
                replacements: {
                    FullName: recipientName,
                    WithdrawalId: withdrawalId,
                    WithdrawalAmount: formattedAmount,
                    WithdrawalRequestedDateTime: currentDateTime,
                    WithdrawalMethod: 'Bank Transfer (IMPS)'
                }
            }).catch(err => logger.error(`Failed to send Withdrawal Requested email: ${err.message}`));
        }

        if (!AccountNumber || !IFSCCode) {
             // Refund because no bank details
             await pool.request()
                .input('Action', sql.Int, 2)
                .input('UUID', sql.VarChar(36), uuid)
                .input('TransactionId', sql.Int, TransactionId)
                .input('StatusId', sql.Int, 3) // Failed
                .execute('dbo.EV_ProcessWalletWithdrawal');

            // Trigger WITHDRAWAL_REJECTED (Event 30)
            if (userEmail) {
                sendEmail({
                    eventId: EmailEvents.WITHDRAWAL_REJECTED,
                    to: userEmail,
                    replacements: {
                        FullName: recipientName,
                        WithdrawalId: withdrawalId,
                        WithdrawalAmount: formattedAmount,
                        WithdrawalRejectedDateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                        WithdrawalRejectionReason: 'Bank account details are missing or incomplete. Please update your profile with valid bank information.'
                    }
                }).catch(err => logger.error(`Failed to send Withdrawal Rejected email: ${err.message}`));
            }
                
            return res.status(400).json({ success: false, message: 'Bank details not found. Please update your profile.' });
        }

        // Cashfree Payouts logic (Requires Payout Client/Secret, which are different from PG)
        // In Production, use: https://payout-api.cashfree.com/payout/v1.2/requestTransfer
        const CF_URL = "https://payout-gamma.cashfree.com/payout/v1.2/requestTransfer";

        const cfPayload = {
            beneId: uuid.substring(0, 20),
            amount: amount,
            transferId: `WD_${TransactionId}`,
            transferMode: "imps", // IMPS, NEFT, RTGS, UPI
            beneDetails: {
                beneName: AccountHolderName,
                email: EmailAddress,
                phone: MobileNumber,
                bankAccount: AccountNumber,
                ifsc: IFSCCode,
                address1: "Eduvora User"
            }
        };

        // TODO: The actual Cashfree Payouts API requires a Bearer token generated by '/payout/v1/authorize'.
        // Because we do not have valid Payout keys currently configured in .env,
        // we'll simulate a successful transfer here. 
        // When you have the Payout keys, replace this with the fetch API calls.

        const gatewayRef = `CF_SIM_${Date.now()}`;
        
        // Update DB as Success
        await pool.request()
            .input('Action', sql.Int, 2)
            .input('UUID', sql.VarChar(36), uuid)
            .input('TransactionId', sql.Int, TransactionId)
            .input('StatusId', sql.Int, 2) // Success
            .input('GatewayRef', sql.VarChar(100), gatewayRef)
            .execute('dbo.EV_ProcessWalletWithdrawal');

        // Trigger WITHDRAWAL_PROCESSED (Event 31)
        if (userEmail) {
            sendEmail({
                eventId: EmailEvents.WITHDRAWAL_PROCESSED,
                to: userEmail,
                replacements: {
                    FullName: recipientName,
                    WithdrawalAmount: formattedAmount,
                    WithdrawalId: withdrawalId,
                    WithdrawalTransactionId: withdrawalId,
                    WithdrawalProcessedDateTime: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
                    WithdrawalMethod: 'Bank Transfer (IMPS)',
                    PaymentReference: gatewayRef
                }
            }).catch(err => logger.error(`Failed to send Withdrawal Processed email: ${err.message}`));
        }

        return res.status(200).json({ 
            success: true, 
            message: 'Withdrawal processed successfully',
            transactionId: TransactionId 
        });

    } catch (error) {
        logger.error(`Error processing withdrawal for UUID: ${req.user.id}: ${error.message}`);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};
