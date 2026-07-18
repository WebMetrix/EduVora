# Database Schema & Stored Procedures (QADevEduvora)

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


## Stored Procedures

### `EV_CheckUsernameAvailability`
Checks if a given username is available.
- **Inputs**: `@Username VARCHAR(50)`
- **Outputs**: `@IsAvailable BIT`

### `EV_CreateUser`
Creates a new user record in `Tb_User` and `Tb_UserDesc`. Handles default roles and duplicate checks (email/mobile/username).
- **Inputs**: `@UUID`, `@FullName`, `@EmailAddress`, `@MobileNumber`, `@Password`, `@ReferralCode`, `@SessionId`, `@SignupMethod`, `@UserID`, `@Username`, `@RoleID`
- **Outputs**: `@Result INT` (1 = Success, -1 = Email/Mobile exists, -2 = UserID/Username taken, 0 = Error)

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
Fetches the complete profile of a user (Core + Desc + Bank) using `LEFT JOIN`s on UUID.
- **Inputs**: `@UUID VARCHAR(36)`

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
