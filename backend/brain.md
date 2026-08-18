# Database Schema & Stored Procedures (QADevEduvora)

**CRITICAL RULE: NO DIRECT QUERIES SHOULD BE USED IN THE CODING OF THIS BACKEND. ALL DATABASE INTERACTIONS MUST BE HANDLED VIA STORED PROCEDURES AND NO DATABASE CHANGE WITHOUT ASKING PERMISSION.**

This document serves as a reference for the database tables and stored procedures used in the EDUVORA backend application.

## Tables

### 1. `Tb_AuditLogInfo`
Tracks user login and logout sessions.
| Column Name | Data Type    | Allow Nulls | Notes       |
|-------------|--------------|-------------|-------------|
| ID          | int          | No          | Primary Key |
| UUID        | varchar(36)  | No          |             |
| SessionId   | varchar(100) | No          |             |
| MacID       | varchar(50)  | Yes         |             |
| LogInAt     | datetime     | No          |             |
| LogOutAt    | datetime     | Yes         |             |

### 2. `Tb_BankInfo`
Stores user bank account details for transactions.
| Column Name       | Data Type    | Allow Nulls | Notes       |
|-------------------|--------------|-------------|-------------|
| UUID              | varchar(36)  | No          | Primary Key |
| AccountHolderName | varchar(100) | No          |             |
| AccountNumber     | varchar(50)  | No          |             |
| BankName          | varchar(100) | No          |             |
| BranchName        | varchar(100) | No          |             |
| IFSCCode          | varchar(20)  | No          |             |
| AccountType       | varchar(50)  | No          |             |
| CreatedBy         | varchar(100) | No          |             |
| CreatedDate       | datetime     | No          |             |
| ModifiedBy        | varchar(100) | Yes         |             |
| ModifiedDate      | datetime     | Yes         |             |
| SessionId         | varchar(100) | No          |             |
| AdditionalBankNotes | varchar(200) | Yes         |             |

### 3. `Tb_Cities`
Master table for cities, mapped to states and countries.
| Column Name | Data Type    | Allow Nulls | Notes       |
|-------------|--------------|-------------|-------------|
| CityID      | int          | No          | Primary Key |
| CityName    | varchar(100) | No          |             |
| StateName   | varchar(100) | No          |             |
| CountryCode | varchar(10)  | Yes         |             |
| IsActive    | bit          | Yes         |             |

### 4. `Tb_GenderMaster`
Master table for genders.
| Column Name | Data Type   | Allow Nulls | Notes       |
|-------------|-------------|-------------|-------------|
| GenderID    | int         | No          | Primary Key |
| GenderName  | varchar(50) | No          |             |
| IsActive    | bit         | No          |             |

### 5. `Tb_AccountTypeMaster`
Master table for bank account types (Savings, Current, etc.).
| Column Name     | Data Type   | Allow Nulls | Notes       |
|-----------------|-------------|-------------|-------------|
| AccountTypeID   | int         | No          | Primary Key |
| AccountTypeName | varchar(50) | No          |             |
| IsActive        | bit         | Yes         |             |

### 6. `Tb_EventMaster`
Master table for system events and their email templates.
| Column Name   | Data Type     | Allow Nulls | Notes       |
|---------------|---------------|-------------|-------------|
| EventId       | int           | No          | Primary Key |
| EventName     | varchar(100)  | No          |             |
| EmailSubject  | nvarchar(255) | No          |             |
| EmailTemplate | nvarchar(MAX) | No          |             |
| IsActive      | bit           | No          |             |
| CreatedDate   | datetime      | No          |             |

### 7. `Tb_FileRepositoryMaster`
Maps document types to their storage repository paths.
| Column Name    | Data Type     | Allow Nulls | Notes       |
|----------------|---------------|-------------|-------------|
| Id             | int           | No          | Primary Key |
| DocumentType   | varchar(100)  | No          |             |
| RepositoryPath | nvarchar(MAX) | No          |             |
| IsActive       | bit           | No          |             |
| CreatedDate    | datetime      | No          |             |
| UpdatedDate    | datetime      | Yes         |             |

### 8. `Tb_Package`
Stores the course packages and their prices.
| Column Name | Data Type      | Allow Nulls | Notes       |
|-------------|----------------|-------------|-------------|
| PackageId   | int            | No          | Primary Key |
| PackageName | varchar(100)   | No          |             |
| Price       | decimal(18,2)  | No          |             |
| Description | nvarchar(MAX)  | Yes         |             |
| IsActive    | bit            | No          |             |
| DescriptionDialog | nvarchar(MAX)  | Yes         |             |

### 9. `Tb_RankMaster`
Defines ranks and the required minimum business logic.
| Column Name     | Data Type      | Allow Nulls | Notes       |
|-----------------|----------------|-------------|-------------|
| RankId          | int            | No          | Primary Key |
| RankName        | varchar(100)   | No          |             |
| MinimumBusiness | decimal(18,2)  | No          |             |
| Color           | varchar(20)    | Yes         |             |
| IconPath        | nvarchar(MAX)  | Yes         |             |
| IsActive        | bit            | No          |             |
| CreatedDate     | datetime       | No          |             |

### 10. `Tb_Referral`
Tracks referrals, sponsors, and their status.
| Column Name      | Data Type    | Allow Nulls | Notes       |
|------------------|--------------|-------------|-------------|
| ReferralId       | int          | No          | Primary Key |
| SponsorUUId      | varchar(36)  | No          |             |
| ReferredUserId   | varchar(100) | No          |             |
| ReferralCode     | varchar(50)  | Yes         |             |
| ReferralLevel    | int          | No          |             |
| StatusId         | int          | No          |             |
| RegistrationDate | datetime     | No          |             |

### 11. `Tb_ReferralStatusMaster`
Master table for referral statuses.
| Column Name | Data Type   | Allow Nulls | Notes       |
|-------------|-------------|-------------|-------------|
| StatusId    | int         | No          | Primary Key |
| StatusName  | varchar(50) | No          |             |
| IsActive    | bit         | No          |             |

### 12. `Tb_RoleTypeDesc`
Master table for user roles.
| Column Name | Data Type   | Allow Nulls | Notes       |
|-------------|-------------|-------------|-------------|
| RoleID      | int         | No          | Primary Key |
| RoleName    | varchar(50) | No          |             |
| IsActive    | bit         | Yes         |             |

### 13. `Tb_SignUpMethodMaster`
Master table for signup methods (e.g., standard, Google).
| Column Name | Data Type   | Allow Nulls | Notes       |
|-------------|-------------|-------------|-------------|
| MethodID    | int         | No          | Primary Key |
| MethodName  | varchar(50) | No          |             |
| IsActive    | bit         | No          |             |

### 14. `Tb_User`
Core table for user authentication and basic info.
| Column Name     | Data Type    | Allow Nulls | Notes       |
|-----------------|--------------|-------------|-------------|
| UUID            | varchar(36)  | No          | Primary Key |
| FullName        | varchar(100) | No          |             |
| EmailAddress    | varchar(150) | No          |             |
| MobileNumber    | varchar(20)  | Yes         |             |
| Password        | varchar(255) | No          |             |
| ReferralCode    | varchar(50)  | Yes         |             |
| IsEmailVerified | bit          | Yes         |             |
| SignupMethod    | varchar(50)  | Yes         |             |
| CreatedDate     | datetime     | Yes         |             |
| IsActive        | bit          | Yes         |             |
| SessionId       | varchar(255) | No          |             |

### 15. `Tb_UserDesc`
Detailed profile information for users.
| Column Name        | Data Type    | Allow Nulls | Notes       |
|--------------------|--------------|-------------|-------------|
| UUID               | varchar(36)  | No          | Primary Key |
| UserID             | varchar(100) | No          |             |
| RoleID             | int          | No          |             |
| FullName           | varchar(100) | No          |             |
| Username           | varchar(50)  | No          |             |
| DateOfBirth        | date         | Yes         |             |
| Gender             | varchar(20)  | Yes         |             |
| Nationality        | varchar(50)  | Yes         |             |
| ProfilePicturePath | varchar(500) | Yes         |             |
| EmailAddress       | varchar(150) | No          |             |
| MobileNumber       | varchar(20)  | Yes         |             |
| WhatsAppNumber     | varchar(20)  | Yes         |             |
| AddressLine1       | varchar(255) | Yes         |             |
| AddressLine2       | varchar(255) | Yes         |             |
| Country            | varchar(100) | Yes         |             |
| State              | varchar(100) | Yes         |             |
| City               | varchar(100) | Yes         |             |
| Pincode            | varchar(20)  | Yes         |             |
| CreatedBy          | varchar(100) | Yes         |             |
| CreatedDate        | datetime     | Yes         |             |
| ModifiedBy         | varchar(100) | Yes         |             |
| ModifiedDate       | datetime     | Yes         |             |
| SessionId          | varchar(100) | Yes         |             |
| isActive           | bit          | Yes         |             |
| AboutNotes         | varchar(200) | Yes         |             |

### 16. `Tb_UserPackage`
Maps users to the packages they have purchased.
| Column Name   | Data Type   | Allow Nulls | Notes       |
|---------------|-------------|-------------|-------------|
| UserPackageId | int         | No          | Primary Key |
| UUID          | varchar(36) | No          |             |
| PackageId     | int         | No          |             |
| PurchaseDate  | datetime    | No          |             |
| IsActive      | bit         | No          |             |

### 17. `Tb_UserRank`
Tracks rank progression and history for users.
| Column Name   | Data Type    | Allow Nulls | Notes       |
|---------------|--------------|-------------|-------------|
| UserRankId    | int          | No          | Primary Key |
| UserId        | varchar(100) | No          |             |
| RankId        | int          | No          |             |
| AchievedDate  | datetime     | No          |             |
| CurrentStatus | varchar(50)  | No          |             |

### 18. `Tb_UserRelationship`
Tracks hierarchical relationships between users (e.g. referrals/sponsors).
| Column Name    | Data Type    | Allow Nulls | Notes       |
|----------------|--------------|-------------|-------------|
| RelationshipId | int          | No          | Primary Key |
| ParentUserId   | varchar(100) | No          |             |
| ChildUserId    | varchar(100) | No          |             |
| Level          | int          | No          |             |
| CreatedDate    | datetime     | No          |             |

### 19. `Tb_Courses`
Stores the courses available in the system.
| Column Name | Data Type     | Allow Nulls | Notes       |
|-------------|---------------|-------------|-------------|
| CourseId    | int           | No          | Primary Key |
| PackageId   | int           | No          |             |
| CourseName  | nvarchar(255) | No          |             |
| CourseDescr | nvarchar(MAX) | Yes         |             |
| IsActive    | bit           | No          |             |
| CreatedDate | datetime      | No          |             |

### 20. `Tb_CommissionLedger`
Tracks individual commission entries generated from orders.
| Column Name      | Data Type      | Allow Nulls | Notes       |
|------------------|----------------|-------------|-------------|
| Id               | int            | No          | Primary Key |
| UUID             | varchar(36)    | No          |             |
| FromUUID         | varchar(36)    | No          |             |
| OrderId          | int            | No          |             |
| LevelNumber      | int            | No          |             |
| CommissionAmount | decimal(18, 2) | No          |             |
| LedgerStatusId   | int            | No          |             |
| CreatedDate      | datetime       | No          |             |

### 21. `Tb_CommissionLedgerStatusMaster`
Master table for commission ledger statuses (1: Pending, 2: Credited, 3: Withdrawn).
| Column Name    | Data Type    | Allow Nulls | Notes       |
|----------------|--------------|-------------|-------------|
| LedgerStatusId | int          | No          | Primary Key |
| StatusName     | nvarchar(50) | No          |             |
| IsActive       | bit          | No          |             |
| CreatedDate    | datetime     | No          |             |

### 22. `Tb_CommissionRuleMaster`
Defines the commission rules, percentages, and flat amounts for packages and levels.
| Column Name          | Data Type      | Allow Nulls | Notes       |
|----------------------|----------------|-------------|-------------|
| RuleId               | int            | No          | Primary Key |
| PackageId            | int            | No          |             |
| LevelNumber          | int            | No          |             |
| CommissionPercentage | decimal(5, 2)  | Yes         |             |
| CommissionFlatAmount | decimal(18, 2) | Yes         |             |
| IsActive             | bit            | No          |             |
| CreatedDate          | datetime       | No          |             |

### 23. `Tb_CommissionStatusHistory`
Tracks the history of status changes for commission ledger entries.
| Column Name  | Data Type     | Allow Nulls | Notes       |
|--------------|---------------|-------------|-------------|
| HistoryId    | int           | No          | Primary Key |
| LedgerId     | int           | No          |             |
| PrevStatusId | int           | Yes         |             |
| NewStatusId  | int           | No          |             |
| Remarks      | nvarchar(255) | Yes         |             |
| ModifiedBy   | varchar(36)   | Yes         |             |
| ModifiedDate | datetime      | No          |             |

### 24. `Tb_Invoice`
Stores invoice details generated for orders.
| Column Name    | Data Type      | Allow Nulls | Notes       |
|----------------|----------------|-------------|-------------|
| InvoiceId      | int            | No          | Primary Key |
| InvoiceNumber  | nvarchar(50)   | No          |             |
| OrderId        | int            | No          |             |
| BillingName    | nvarchar(255)  | No          |             |
| BillingAddress | nvarchar(MAX)  | Yes         |             |
| SubTotal       | decimal(18, 2) | No          |             |
| GSTAmount      | decimal(18, 2) | No          |             |
| TotalAmount    | decimal(18, 2) | No          |             |
| InvoiceDate    | datetime       | No          |             |

### 25. `Tb_Order`
Core table for tracking user orders.
| Column Name   | Data Type      | Allow Nulls | Notes       |
|---------------|----------------|-------------|-------------|
| OrderId       | int            | No          | Primary Key |
| OrderNumber   | nvarchar(50)   | No          |             |
| UUID          | varchar(36)    | No          |             |
| TotalAmount   | decimal(18, 2) | No          |             |
| GSTAmount     | decimal(18, 2) | No          |             |
| OrderStatusId | nvarchar(50)   | No          |             |
| PaymentMethod | nvarchar(50)   | Yes         |             |
| TransactionId | nvarchar(100)  | Yes         |             |
| OrderDate     | datetime       | No          |             |

### 26. `Tb_OrderItem`
Tracks the individual items (packages) within an order.
| Column Name | Data Type      | Allow Nulls | Notes       |
|-------------|----------------|-------------|-------------|
| OrderItemId | int            | No          | Primary Key |
| OrderId     | int            | No          |             |
| PackageId   | int            | No          |             |
| ItemPrice   | decimal(18, 2) | No          |             |

### 27. `Tb_OrderStatus`
Master table for order statuses.
| Column Name   | Data Type    | Allow Nulls | Notes       |
|---------------|--------------|-------------|-------------|
| OrderStatusId | int          | No          | Primary Key |
| StatusName    | nvarchar(50) | No          |             |
| IsActive      | bit          | No          |             |
| CreatedDate   | datetime     | No          |             |

### 28. `Tb_OrderStatusTrail`
Audit trail for changes in order status.
| Column Name  | Data Type     | Allow Nulls | Notes       |
|--------------|---------------|-------------|-------------|
| TrailId      | int           | No          | Primary Key |
| OrderId      | int           | No          |             |
| PrevStatusId | int           | Yes         |             |
| NextStatusId | int           | No          |             |
| Comments     | nvarchar(255) | Yes         |             |
| ChangedBy    | varchar(36)   | Yes         |             |
| ModifiedDate | datetime      | No          |             |

### 29. `Tb_Payment`
Tracks payments made for orders.
| Column Name     | Data Type      | Allow Nulls | Notes       |
|-----------------|----------------|-------------|-------------|
| PaymentId       | int            | No          | Primary Key |
| OrderId         | int            | No          |             |
| PaymentAmount   | decimal(18, 2) | No          |             |
| PaymentMethod   | nvarchar(50)   | Yes         |             |
| TransactionId   | nvarchar(100)  | Yes         |             |
| PaymentStatusId | int            | No          |             |
| GatewayResponse | nvarchar(MAX)  | Yes         |             |
| PaymentDate     | datetime       | No          |             |

### 30. `Tb_PaymentStatusMaster`
Master table for payment statuses.
| Column Name     | Data Type    | Allow Nulls | Notes       |
|-----------------|--------------|-------------|-------------|
| PaymentStatusId | int          | No          | Primary Key |
| StatusName      | nvarchar(50) | No          |             |
| IsActive        | bit          | No          |             |
| CreatedDate     | datetime     | No          |             |

### 31. `Tb_TransactionTypeMaster`
Master table for transaction types.
| Column Name         | Data Type    | Allow Nulls | Notes       |
|---------------------|--------------|-------------|-------------|
| TransactionTypeId   | int          | No          | Primary Key |
| TransactionTypeName | nvarchar(20) | No          |             |
| IsActive            | bit          | No          |             |
| CreatedDate         | datetime     | No          |             |

### 32. `Tb_Lesson`
Stores individual lessons belonging to a module.
| Column Name     | Data Type      | Allow Nulls | Notes       |
|-----------------|----------------|-------------|-------------|
| LessonId        | int            | No          | Primary Key |
| ModuleId        | int            | No          |             |
| LessonTitle     | nvarchar(255)  | No          |             |
| VideoPath       | nvarchar(1000) | Yes         |             |
| DurationMinutes | int            | Yes         |             |
| SequenceNo      | int            | No          |             |
| IsActive        | bit            | No          |             |
| CreatedDate     | datetime       | No          |             |

### 33. `Tb_Module`
Stores modules that group lessons within a course.
| Column Name | Data Type     | Allow Nulls | Notes       |
|-------------|---------------|-------------|-------------|
| ModuleId    | int           | No          | Primary Key |
| CourseId    | int           | No          |             |
| ModuleName  | nvarchar(255) | No          |             |
| SequenceNo  | int           | No          |             |
| IsActive    | bit           | No          |             |
| CreatedDate | datetime      | No          |             |

### 34. `Tb_Wallet`
Stores wallet balance and summary for users.
| Column Name    | Data Type      | Allow Nulls | Notes       |
|----------------|----------------|-------------|-------------|
| Id             | int            | No          | Primary Key |
| UUID           | varchar(36)    | No          |             |
| CurrentBalance | decimal(18, 2) | No          |             |
| TotalEarned    | decimal(18, 2) | No          |             |
| TotalWithdrawn | decimal(18, 2) | No          |             |
| IsActive       | bit            | No          |             |
| CreatedDate    | datetime       | No          |             |
| ModifiedDate   | datetime       | Yes         |             |

### 35. `Tb_WalletTransaction`
Tracks all transactions within a user's wallet.
| Column Name       | Data Type      | Allow Nulls | Notes       |
|-------------------|----------------|-------------|-------------|
| TransactionId     | int            | No          | Primary Key |
| WalletId          | int            | No          |             |
| UUID              | varchar(36)    | No          |             |
| TransactionTypeId | int            | No          |             |
| Amount            | decimal(18, 2) | No          |             |
| ClosingBalance    | decimal(18, 2) | No          |             |
| Description       | nvarchar(255)  | No          |             |
| TransactionDate   | datetime       | No          |             |

### 36. `Tb_PaymentActionMaster`
Master table for payment action types (e.g., 1: INITIATE, 2: WEBHOOK).
| Column Name       | Data Type    | Allow Nulls | Notes       |
|-------------------|--------------|-------------|-------------|
| ActionTypeId      | int          | No          | Primary Key |
| ActionTypeName    | varchar(50)  | No          |             |
| IsActive          | bit          | Yes         |             |
| CreatedDate       | datetime     | Yes         |             |



## Stored Procedures

### `EV_CheckUsernameAvailability`
Checks if a given username is available.
- **Inputs**: `@Username VARCHAR(50)`
- **Outputs**: `@IsAvailable BIT`

### `EV_CreateUser`
Creates a new user record in `Tb_User` and `Tb_UserDesc`. Handles default roles, duplicate checks (email/mobile/username), and strictly enforces referral assignments.
- **Inputs**: `@UUID`, `@FullName`, `@EmailAddress`, `@MobileNumber`, `@Password`, `@ReferralCode`, `@SessionId`, `@SignupMethod`, `@UserID`, `@Username`, `@RoleID`
- **Outputs**: `@Result INT` (1 = Success, -1 = Email/Mobile exists, -2 = UserID/Username taken, -3 = Missing or Invalid Referral Code, 0 = Error)

### `EV_EditUser`
Updates a user's core, personal, contact, address, and bank information based on UUID. Does NOT allow updating the Username.
- **Inputs**: `@UUID`, `@FullName`, `@Username`, `@DateOfBirth`, `@Gender`, `@Nationality`, `@MobileNumber`, `@WhatsAppNumber`, `@AddressLine1`, `@AddressLine2`, `@Country`, `@State`, `@City`, `@Pincode`, `@AccountHolderName`, `@AccountNumber`, `@BankName`, `@BranchName`, `@IFSCCode`, `@AccountType`
- **Outputs**: `@Result INT` (1 = Success, -1 = Not found, -3 = Mobile in use, 0 = System Error)

### `EV_GetBankAccountTypes`
Fetches active account types from `Tb_AccountTypeMaster`.

### `EV_GetCities`
Fetches active cities, optionally filtered by `@StateName`.

### `EV_GetGenders`
Fetches active genders from `Tb_GenderMaster`.

### `EV_GetStates`
Fetches distinct active states from `Tb_Cities` where CountryCode = 'IN'.

### `EV_GetUserProfile`
Fetches the complete profile of a user (Core + Desc + Bank + Package + Rank) using `LEFT JOIN`s on UUID.
- **Inputs**: `@UUID VARCHAR(36)`

- **Outputs**: Result Set (UserID, EmailAddress, PrimaryMobile, CreatedDate, IsEmailVerified, FullName, Username, DateOfBirth, Gender, Nationality, ProfilePicturePath, ContactMobile, WhatsAppNumber, AddressLine1, AddressLine2, Country, State, StateName, City, CityName, Pincode, AboutNotes, AccountHolderName, AccountNumber, BankName, BranchName, IFSCCode, AccountType, AccountTypeName, AdditionalBankNotes, ActivePackageId, ActivePackageName, CurrentRankId, CurrentRankName, RankColor, RankIconPath)

### `EV_UpdateAboutMe`
Updates the `AboutNotes` column in `Tb_UserDesc` for a specific user.
- **Inputs**: `@UUID VARCHAR(36)`, `@AboutNotes VARCHAR(200)`
- **Outputs**: Result Set (`Success INT`, `Message VARCHAR`)

### `EV_InsertLogUserSession`
Logs user login and logout times.
- **Inputs**: `@UUID`, `@SessionId`, `@MacID`, `@ActionType` ('1' for Login, '2' for Logout)

### `EV_LogIn`
Validates user credentials and retrieves user profile data and hashed password for bcrypt comparison.
- **Inputs**: `@Email VARCHAR(150)`
- **Outputs**: `@Result INT` (1 = Success, -1 = Not found, -2 = Inactive), Result Set (UUID, UserID, Username, RoleID, FullName, EmailAddress, MobileNumber, Password, ProfilePicturePath)

### `EV_ResetPassword`
Resets a user's password based on their email address.
- **Inputs**: `@EmailAddress`, `@Password`
- **Outputs**: `@Result INT` (1 = Success, -1 = Not found/inactive, 0 = System Error)

### `EV_CheckUserExistsByEmail`
Checks if a user exists and is active by their email address.
- **Inputs**: `@EmailAddress VARCHAR(150)`
- **Outputs**: `EmailExists BIT` (1 = True, 0 = False)

### `EV_GetEmailTemplate`
Fetches the email subject and template for a specific event.
- **Inputs**: `@EventId INT`
- **Outputs**: Result Set (`EmailSubject`, `EmailTemplate`)

### `EV_UpdateUserSession`
Updates the SessionId for a user across `Tb_User` and `Tb_UserDesc` tables.
- **Inputs**: `@UUID VARCHAR(36)`, `@SessionId VARCHAR(255)`

### `EV_GetFileRepositoryPath`
Fetches the file repository path based on the document type.
- **Inputs**: `@DocumentType VARCHAR(100)`
- **Outputs**: Result Set (`path`)

### `EV_AssignReferral`
Assigns a referral by establishing a relationship between a Sponsor and a new User. It is now strictly coupled and verified within the `EV_CreateUser` transaction.
- **Inputs**: `@NewUserUUID VARCHAR(36)`, `@SponsorUserID VARCHAR(100)`
- **Outputs**: `@Result INT` (1 = Success, -1 = Sponsor/User not found or ID is NULL, 0 = System Error)
- **Updates**: Inserts into `Tb_Referral` (Status = 2) and `Tb_UserRelationship`.

### `EV_GetMyNetwork`
Fetches a flattened hierarchy of the user's downline (up to Level 2) and all Dashboard/Chart analytics for the React UI.
- **Inputs**: `@RootUserID NVARCHAR(100)`
- **Outputs**: 
  1. **Result Set (Genealogy Tree)**: `RelativeLevel`, `UserID`, `SponsorID`, `SponsorName`, `FullName`, `ProfilePicturePath`, `JoiningDate`, `PackageId`, `PackageName`, `StatusId`, `AccountStatus`, `ChildrenCount`
  2. **Result Set (Dashboard Stats)**: Returns 3 rows (`Timeframe`: 'monthly', 'quarterly', 'yearly') containing: `directTeam`, `level1`, `level2`, `totalTeam`, `periodGrowth`, `periodGrowthPercentage`, `directTeamGrowth`, `level1Growth`, `level2Growth`, `totalTeamGrowth`
  3. **Result Set (Package Distribution)**: `name`, `value`
  4. **Result Set (Registration Trend)**: `Timeframe` (Monthly = Current Month daily, Quarterly = Last 3 Months, Yearly = Current Year monthly), `date`, `value`

### `EV_GetMyReferralsList`
Fetches a searchable and filterable list of the user's direct (Level 1) and indirect (Level 2) referrals for the Referrals Table UI.
Includes dynamic search matching for UserID, FullName, and Registration Date (adjusted for +5:30 IST timezone).
- **Inputs**: `@UserID VARCHAR(100)`, `@DateFilter VARCHAR(20) = NULL`, `@SearchQuery VARCHAR(100) = NULL`
- **Outputs**: Result Set containing `ProfilePicturePath`, `UserID`, `Name`, `PackageId`, `PackageName`, `RegistrationDate`, `StatusId`, `Status`, `ReferralLevel`

### `EV_GetPackages`
Fetches all active packages from `Tb_Package`.
- **Outputs**: Result Set containing `PackageId`, `PackageName`, `Price`, `Description`, `IsActive`, `DescriptionDialog`

### `EV_UpdateProfilePicture`
Updates the profile picture path for a specific user instantly.
- **Inputs**: `@UUID VARCHAR(36)`, `@ProfilePicturePath VARCHAR(500)`
- **Updates**: Updates `ProfilePicturePath` in `Tb_UserDesc`.

### `EV_ProcessCashfreePayment`
Processes both the initialization and the webhook response of a Cashfree payment. Includes fallback logic to extract `GatewayOrderId` (cf_payment_id) from the `GatewayResponse` JSON if Node.js passes 'undefined' or NULL.
- **Inputs**: `@ActionType VARCHAR(20)` ('INITIATE' or 'WEBHOOK'), `@UUID VARCHAR(36)`, `@PackageId INT`, `@Amount DECIMAL(18,2)`, `@OrderNumber VARCHAR(50)`, `@GatewayOrderId VARCHAR(100)`, `@PaymentStatus VARCHAR(50)`, `@PaymentMethod VARCHAR(50)`, `@GatewayResponse NVARCHAR(MAX)`
- **Outputs**: 
  - For INITIATE: Returns generated `OrderNumber`.
  - For WEBHOOK: Returns `@Success INT` (1 = Success, 0 = Order not found).
- **Updates**: 
  - For INITIATE: Inserts initial Pending (1) records into `Tb_Order`, `Tb_OrderItem`, and `Tb_Payment`.
  - For WEBHOOK: Updates `OrderStatusId` and `PaymentStatusId` to 2 (Success) or 3 (Failed), and updates `TransactionId` using the extracted or provided Gateway ID. Automatically inserts into `Tb_UserPackage` if the payment was a SUCCESS.
