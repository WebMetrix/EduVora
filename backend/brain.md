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
