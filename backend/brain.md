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

**Current Records (Reference):**
| Id | DocumentType | RepositoryPath | IsActive | CreatedDate | UpdatedDate |
|----|--------------|----------------|----------|-------------|-------------|
| 1 | Profile | `\\EduVora-001\EduVora-001\UserData\Profile` | 1 | 2026-07-20 23:48:05.203 | NULL |
| 2 | KYC | `\\EduVora-001\EduVora-001\KYCData\UserKYC` | 1 | 2026-07-20 23:48:05.203 | NULL |
| 3 | TempKYC | `\\EduVora-001\EduVora-001\KYCData\TempKYC` | 1 | 2026-09-02 23:26:01.383 | NULL |
| 4 | Invoice | `\\EDUVORA-001\EduVora-001\Invoices` | 1 | 2026-11-17 21:13:03.610 | NULL |

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
| CoverImagePath | nvarchar(500) | Yes         |             |

### 9. `Tb_RankMaster`
Defines ranks, the required minimum business logic, team size targets, qualified leaders, and rank benefits.
| Column Name              | Data Type      | Allow Nulls | Notes                                              |
|--------------------------|----------------|-------------|----------------------------------------------------|
| RankId                   | int            | No          | Primary Key (1: Bronze, 2: Silver, 3: Gold, 4: Diamond) |
| RankName                 | varchar(100)   | No          |                                                    |
| MinimumBusiness          | decimal(18,2)  | No          | Minimum business turnover required                 |
| RequiredLevel1Members    | int            | No          | Required active direct referrals (Default 0)       |
| RequiredQualifiedMembers | int            | No          | Required direct members at Silver+ rank (Default 0)|
| RankBenefits             | nvarchar(MAX)  | Yes         | Pipe-delimited list of rank benefits               |
| Color                    | varchar(20)    | Yes         |                                                    |
| IconPath                 | nvarchar(MAX)  | Yes         |                                                    |
| IsActive                 | bit            | No          |                                                    |
| CreatedDate              | datetime       | No          |                                                    |

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
| IsKYCVerified   | int          | Yes         | Default 1 (Pending)|
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
| InvoicePath    | nvarchar(500)  | Yes         |             |

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
| WalletNumber   | varchar(100)   | Yes         | e.g. EV_WLT_01_DDMMYYYY |
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

### 37. `Tb_KYCStatusMaster`
Master table for defining KYC statuses (1: Pending, 2: Verified, 3: Rejected).
| Column Name | Data Type    | Allow Nulls | Notes       |
|-------------|--------------|-------------|-------------|
| KYCStatusId | int          | No          | Primary Key |
| StatusName  | nvarchar(50) | No          |             |
| IsActive    | bit          | No          |             |
| CreatedDate | datetime     | No          |             |

### 38. `Tb_UserKYC`
Core table to track a user's KYC submission and document paths.
| Column Name            | Data Type     | Allow Nulls | Notes                                         |
|------------------------|---------------|-------------|-----------------------------------------------|
| KYCId                  | int           | No          | Primary Key (Sequential, No Identity)         |
| UUID                   | varchar(36)   | No          | Foreign Key to Tb_User (Unique per user)      |
| ApplicationId          | varchar(50)   | Yes         | Auto-generated on KYC submission              |
| PanNumber              | varchar(255)  | No          | Stored as encrypted AES-256 hex string        |
| IdentityTypeId         | int           | No          | Foreign Key to Tb_IdentityTypeMaster          |
| IdentityProofNumber    | varchar(255)  | No          | Stored as encrypted AES-256 hex string        |
| IdentityProofFrontPath | nvarchar(MAX) | No          | Path to Identity proof front image            |
| IdentityProofBackPath  | nvarchar(MAX) | Yes         | Path to Identity proof back image             |
| PanCardPath            | nvarchar(MAX) | No          | Path to PAN card image                        |
| KYCStatusId            | int           | No          | Foreign Key to Tb_KYCStatusMaster             |
| RejectionReasonId      | int           | Yes         | Foreign Key to Tb_KYCRejectionReasonMaster    |
| SubmittedDate          | datetime      | No          | Default `GETDATE()`                           |
| ModifiedDate           | datetime      | Yes         | Track resubmissions/updates                   |

### 39. `Tb_IdentityTypeMaster`
Master table for defining supported identity document types.
| Column Name      | Data Type   | Allow Nulls | Notes       |
|------------------|-------------|-------------|-------------|
| IdentityTypeId   | int         | No          | Primary Key |
| IdentityTypeName | varchar(50) | No          |             |
| IsActive         | bit         | No          |             |
| CreatedDate      | datetime    | No          |             |

### 40. `Tb_KYCRejectionReasonMaster`
Master table for predefined automated and manual KYC rejection reasons.
| Column Name       | Data Type     | Allow Nulls | Notes                         |
|-------------------|---------------|-------------|-------------------------------|
| RejectionReasonId | int           | No          | Primary Key                   |
| ReasonText        | nvarchar(MAX) | No          | The reason string             |
| Type              | varchar(50)   | No          | 'Automated' or 'Manual'       |
| IsActive          | bit           | No          |                               |
| CreatedDate       | datetime      | No          |                               |

### 41. `Tb_AchievementCategoryMaster`
Master lookup table for achievement categories (Sales, Network, Earnings, Rank).
| Column Name   | Data Type    | Allow Nulls | Notes                                              |
|---------------|--------------|-------------|----------------------------------------------------|
| CategoryId    | int          | No          | Primary Key (1: Sales, 2: Network, 3: Earnings, 4: Rank) |
| CategoryName  | varchar(50)  | No          |                                                    |
| IsActive      | bit          | No          | Default `1`                                        |
| CreatedDate   | datetime     | No          | Default `GETDATE()`                                |

### 42. `Tb_AchievementMaster`
Master catalog containing system milestone achievements, requirements, badge rewards, points, and icon styles.
| Column Name   | Data Type     | Allow Nulls | Notes                                              |
|---------------|---------------|-------------|----------------------------------------------------|
| AchievementId | int           | No          | Primary Key (1, 2, 3, ...)                         |
| Title         | varchar(150)  | No          | Milestone title (e.g. 'First Package Sale')        |
| Description   | varchar(255)  | No          | Brief summary                                      |
| Criteria      | varchar(500)  | No          | Full requirements explanation                      |
| CategoryId    | int           | No          | Foreign Key to `Tb_AchievementCategoryMaster`      |
| Reward        | varchar(100)  | No          | Badge or reward title                              |
| Points        | int           | No          | Reward points (Default `0`)                        |
| MetricType    | varchar(50)   | No          | 'PACKAGE_PURCHASE', 'DIRECT_REFERRALS', 'TEAM_MEMBERS', 'LEVEL2_MEMBERS', 'TOTAL_COMMISSION', 'RANK_REACHED' |
| TargetValue   | decimal(18,2) | No          | Numerical goal to unlock milestone                 |
| IconName      | varchar(50)   | No          | Lucide icon name: 'Trophy', 'Star', 'Users', 'DollarSign', 'Target', 'ArrowUpCircle' |
| IconBg        | varchar(50)   | Yes         | Tailwind badge style class: 'bg-yellow-50', etc.   |
| DisplayOrder  | int           | No          | Ordering sequence for UI (Default `1`)             |
| IsActive      | bit           | No          | Default `1`                                        |
| CreatedDate   | datetime      | No          | Default `GETDATE()`                                |

### 43. `Tb_UserAchievement`
Tracks user milestone progress, earned badges, and completion timestamps.
| Column Name       | Data Type     | Allow Nulls | Notes                                              |
|-------------------|---------------|-------------|----------------------------------------------------|
| UserAchievementId | int           | No          | Primary Key (Identity)                             |
| UUID              | varchar(36)   | No          | Foreign Key to `Tb_User(UUID)`                     |
| AchievementId     | int           | No          | Foreign Key to `Tb_AchievementMaster(AchievementId)` |
| CurrentProgress   | decimal(18,2) | No          | Current accumulated metric value (Default `0`)     |
| IsEarned          | bit           | No          | Completion flag (Default `0`, `1` when achieved)   |
| EarnedDate        | datetime      | Yes         | Unlock timestamp                                   |
| CreatedDate       | datetime      | No          | Default `GETDATE()`                                |
| UpdatedDate       | datetime      | Yes         | Last progress update timestamp                     |

*Constraints & Indexes:*
- `UNIQUE (UUID, AchievementId)`: Ensures one record per achievement per user.
- Index `IX_Tb_UserAchievement_UUID_IsEarned` on `(UUID, IsEarned)` including `(AchievementId, CurrentProgress, EarnedDate)`.

### 44. `Tb_PackageEBook`
Stores the eBooks and course modules associated with each course package.
| Column Name    | Data Type     | Allow Nulls | Notes                                          |
|----------------|---------------|-------------|------------------------------------------------|
| EBookId        | int           | No          | Primary Key (Identity)                         |
| PackageId      | int           | No          | Foreign Key to `Tb_Package(PackageId)`         |
| EBookNumber    | varchar(50)   | No          | Label (e.g. 'EBook 1', 'EBook 2')              |
| Title          | nvarchar(200) | No          |                                                |
| Summary        | nvarchar(MAX) | Yes         | Description / overview                         |
| DurationText   | varchar(50)   | Yes         | Audio duration text (e.g. '18m audio')         |
| TotalPages     | int           | No          | Total page count (Default `1`)                 |
| CoverImagePath | nvarchar(500) | Yes         |                                                |
| PdfFilePath    | nvarchar(500) | Yes         | Offline PDF download file path                 |
| DisplayOrder   | int           | No          | Ordering sequence (Default `1`)                |
| IsActive       | bit           | No          | Default `1`                                    |
| CreatedDate    | datetime      | No          | Default `GETDATE()`                            |

### 45. `Tb_EBookChapter`
Stores individual chapters, reader canvas content, and audio tracks for each eBook.
| Column Name          | Data Type     | Allow Nulls | Notes                                          |
|----------------------|---------------|-------------|------------------------------------------------|
| ChapterId            | int           | No          | Primary Key (Identity)                         |
| EBookId              | int           | No          | Foreign Key to `Tb_PackageEBook(EBookId)`      |
| ChapterNumber        | varchar(20)   | No          | e.g. '01', '02'                                |
| Title                | nvarchar(200) | No          | Chapter title                                  |
| Subtitle             | nvarchar(200) | Yes         | Subtitle / highlighted accent title            |
| PagesLabel           | varchar(50)   | Yes         | e.g. 'Page 1 - 4'                              |
| StartPage            | int           | No          | Default `1`                                    |
| EndPage              | int           | No          | Default `1`                                    |
| LeadParagraph        | nvarchar(MAX) | Yes         | Opening introductory lead text                 |
| ContentBody          | nvarchar(MAX) | Yes         | Full chapter reading body                      |
| IllustrationPath     | nvarchar(500) | Yes         | Chapter illustration image path                |
| AudioTitle           | nvarchar(200) | Yes         | Audio modal track title                        |
| AudioDesc            | nvarchar(MAX) | Yes         | Audio modal track description                  |
| AudioUrlPath         | nvarchar(500) | Yes         | Path to MP3 audio file                         |
| AudioDurationSeconds | int           | Yes         | Total audio duration in seconds                |
| DisplayOrder         | int           | No          | Ordering sequence (Default `1`)                |
| IsActive             | bit           | No          | Default `1`                                    |
| CreatedDate          | datetime      | No          | Default `GETDATE()`                            |

### 46. `Tb_UserEBookProgress`
Tracks user reading page, last accessed chapter, bookmarks, and audio playback state.
| Column Name          | Data Type     | Allow Nulls | Notes                                          |
|----------------------|---------------|-------------|------------------------------------------------|
| ProgressId           | int           | No          | Primary Key (Identity)                         |
| UUID                 | varchar(36)   | No          | Foreign Key to `Tb_User(UUID)`                 |
| EBookId              | int           | No          | Foreign Key to `Tb_PackageEBook(EBookId)`      |
| CurrentPage          | int           | No          | Last read page (Default `1`)                   |
| LastChapterId        | int           | Yes         | Last active chapter ID                         |
| IsBookmarked         | bit           | No          | Bookmark toggle flag (Default `0`)             |
| AudioPositionSeconds | int           | No          | Playback position in seconds (Default `0`)     |
| Status               | varchar(20)   | No          | 'notStarted', 'inProgress', 'completed'        |
| LastAccessedDate     | datetime      | No          | Default `GETDATE()`                            |

*Constraints & Indexes:*
- `UNIQUE (UUID, EBookId)`: Ensures one progress tracking record per user per eBook.
- Index `IX_UserEBookProgress_UUID` on `(UUID, EBookId)`.

## Stored Procedures

### `EV_GetIdentityProofTypes`
Fetches all active identity document types, excluding the PAN Card which is handled separately.
- **Outputs**: Result Set containing `value` (IdentityTypeId) and `label` (IdentityTypeName)


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

- **Outputs**: Result Set (UserID, EmailAddress, PrimaryMobile, CreatedDate, IsEmailVerified, IsKYCVerified, FullName, Username, DateOfBirth, Gender, Nationality, ProfilePicturePath, ContactMobile, WhatsAppNumber, AddressLine1, AddressLine2, Country, State, StateName, City, CityName, Pincode, AboutNotes, AccountHolderName, AccountNumber, BankName, BranchName, IFSCCode, AccountType, AccountTypeName, AdditionalBankNotes, ActivePackageId, ActivePackageName, CurrentRankId, CurrentRankName, RankColor, RankIconPath)

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
- **Outputs**: Result Set containing `path`

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
Fetches a searchable and filterable list of the user's direct (Level 1) and indirect (Level 2) referrals for the Referrals Table UI. Also retrieves a secondary result set containing global statistics for the Dashboard and Referral Rewards modules.
Includes dynamic search matching for UserID, FullName, and Registration Date (adjusted for +5:30 IST timezone).
- **Inputs**: `@UserID VARCHAR(100)`, `@DateFilter VARCHAR(20) = NULL`, `@SearchQuery VARCHAR(100) = NULL`
- **Outputs**: 
  1. **Result Set (Filtered Referrals List)**: `ProfilePicturePath`, `UserID`, `Name`, `PackageId`, `PackageName`, `RegistrationDate`, `StatusId`, `Status`, `ReferralLevel`
  2. **Result Set (Global Unfiltered Stats)**: `Level1Referrals`, `Level2Referrals`, `ActiveReferrals`, `PurchasedPackages`, `Level1Growth`, `Level2Growth`, `ActiveGrowth`, `PurchasedGrowth`

### `EV_GetPackages`
Fetches all active packages from `Tb_Package`.
- **Outputs**: Result Set containing `PackageId`, `PackageName`, `Price`, `Description`, `IsActive`, `DescriptionDialog`

### `EV_UpdateProfilePicture`
Updates the profile picture path for a specific user instantly.
- **Inputs**: `@UUID VARCHAR(36)`, `@ProfilePicturePath VARCHAR(500)`
- **Updates**: Updates `ProfilePicturePath` in `Tb_UserDesc`.

### `EV_ProcessCashfreePayment`
Processes both the initialization and the webhook response of a Cashfree payment. Includes fallback logic to extract `GatewayOrderId` (cf_payment_id) from the `GatewayResponse` JSON if Node.js passes 'undefined' or NULL.
- **Inputs**: `@ActionType INT` (1 = INITIATE, 2 = WEBHOOK), `@UUID VARCHAR(36)`, `@PackageId INT`, `@Amount DECIMAL(18,2)`, `@OrderNumber VARCHAR(50)`, `@GatewayOrderId VARCHAR(100)`, `@PaymentStatus VARCHAR(50)`, `@PaymentMethod VARCHAR(50)`, `@GatewayResponse NVARCHAR(MAX)`
- **Outputs**: 
  - For INITIATE: Returns generated `OrderNumber`.
  - For WEBHOOK: Returns `@Success INT` (1 = Success, 0 = Order not found).
- **Updates**: 
  - For INITIATE: Inserts initial Pending (1) records into `Tb_Order`, `Tb_OrderItem`, and `Tb_Payment`.
  - For WEBHOOK: Updates `OrderStatusId` and `PaymentStatusId` to 2 (Success) or 3 (Failed), and updates `TransactionId` using the extracted or provided Gateway ID. Automatically inserts into `Tb_UserPackage` if the payment was a SUCCESS.

### `EV_ManageUserKYC`
Manages KYC operations including retrieving, submitting, and updating the status of a user's KYC application.
- **Inputs**: `@Action INT` (1 = GET, 2 = SUBMIT, 3 = UPDATE_STATUS), `@UUID VARCHAR(36)`, `@ApplicationId VARCHAR(50)`, `@PanNumber VARCHAR(20)`, `@IdentityTypeId INT`, `@IdentityProofNumber VARCHAR(50)`, `@IdentityProofFrontPath NVARCHAR(MAX)`, `@IdentityProofBackPath NVARCHAR(MAX)`, `@PanCardPath NVARCHAR(MAX)`, `@KYCStatusId INT`, `@RejectionReasonId INT`
- **Outputs**:
  - For GET: Returns Result Set containing KYC details.
  - For SUBMIT / UPDATE_STATUS: Returns `@Success INT`, `Message VARCHAR`.
- **Updates**:
  - For SUBMIT: Inserts/Updates `Tb_UserKYC` and syncs `IsKYCVerified = 1` (Pending) in `Tb_User`. (Uses sequential `KYCId` generation).
  - For UPDATE_STATUS: Updates `KYCStatusId` in `Tb_UserKYC`. Syncs `IsKYCVerified` to 2 or 3 in `Tb_User`. If Verified (2), also initializes a new wallet record in `Tb_Wallet` and generates the `WalletNumber`.

### `EV_GetMyEarnings`
Retrieves Wallet Summary, Timeframe Dashboard Stats (Monthly/Quarterly/Yearly), Earnings Charts, Commission Ledger, and Wallet Transactions for the Earnings Page dynamically.
- **Inputs**: `@UUID VARCHAR(36)`
- **Outputs**:
  1. **Result Set (Wallet & Summary Stats)**: `CurrentBalance`, `TotalEarned`, `TotalWithdrawn`, `TotalTransactions`, `PendingCommission`, `PendingWithdrawal`, `TotalPayouts`, `LastPayoutDate`, `WalletId` (Mapped from `WalletNumber`), `MemberId`, `WalletStatus`, `CreatedDate`, `ModifiedDate`
  2. **Result Set (Dashboard Stats)**: Returns 3 rows (`Timeframe`: 'monthly', 'quarterly', 'yearly') containing `periodAmount`, `directAmount`, `level1Amount`, `level2Amount`, `periodGrowthPercentage`
  3. **Result Set (Earnings Overview Chart)**: Returns grouped time-series data for the Area Chart (`Timeframe`, `dateLabel`, `amount`)
  4. **Result Set (Earnings By Level)**: Doughnut chart aggregates for the current month (`LevelName`, `Amount`)
  5. **Result Set (Commission History)**: Detailed commission list (`LedgerId`, `Date`, `FromUserName`, `FromUserId`, `FromUserProfilePic`, `Level`, `Type`, `Description`, `Amount`, `Status`)
  6. **Result Set (Wallet Transactions)**: Complete transaction list (`TransactionId`, `Date`, `Type`, `Description`, `Amount`, `Status`)

### `EV_GetRecentActivities`
Fetches a chronological, paginated feed of all recent activities (signups, sales, commissions, rank upgrades, package upgrades, withdrawals, KYC approvals) related to a specific user across the platform.
- **Inputs**: `@UUID VARCHAR(36)`, `@PageNumber INT = 1`, `@PageSize INT = 5`
- **Outputs**: Result Set containing `ActivityCode`, `Param1`, `TimeAgoText`

### `EV_ProcessWalletWithdrawal`
Manages wallet withdrawals including balance deduction, transaction logging, and retrieving user bank details for Cashfree Payouts. Also handles success/failure updates from the payment gateway to finalize or refund the transaction.
- **Inputs**: `@Action INT` (1 = Initiate, 2 = Update Status), `@UUID VARCHAR(36)`, `@Amount DECIMAL(18,2)`, `@TransactionId INT`, `@StatusId INT` (2 = Success, 3 = Failed), `@GatewayRef VARCHAR(100)`
- **Outputs**: 
  - For Initiate (1): Result Set containing `Success`, `Message`, `TransactionId`, `EmailAddress`, `MobileNumber`, `FullName`, `AccountHolderName`, `AccountNumber`, `BankName`, `IFSCCode`. (Returns `-1` if insufficient balance).
  - For Update Status (2): Result Set containing `Success`, `Message`.
- **Updates**:
  - For Initiate (1): Deducts `CurrentBalance` in `Tb_Wallet` and inserts a Pending (Type 2) record in `Tb_WalletTransaction`.
  - For Update Status (2): If Success, increments `TotalWithdrawn`. If Failed, refunds `CurrentBalance` and updates transaction description.

### `EV_GetSponsorDetails`
Fetches sponsor contact details (`SponsorUUID`, `SponsorUserId`, `SponsorName`, `SponsorEmail`, `SponsorMobile`) for dynamic referral email events.
- **Inputs**: `@UserID VARCHAR(100) = NULL` (to lookup sponsor by their UserID), `@ChildUserId VARCHAR(100) = NULL` (to lookup direct Level 1 sponsor by child's UserID)
- **Outputs**: Result Set containing `SponsorUUID`, `SponsorUserId`, `SponsorName`, `SponsorEmail`, `SponsorMobile`

### `EV_GetNextInvoiceNumber`
Generates incremental invoice numbers conforming to `#INV_EV-YYYYMMDD-0001` per day based on the highest existing record in `Tb_Invoice`.
- **Inputs**: `@DatePrefix VARCHAR(8)` (e.g. `'20261117'`)
- **Outputs**: Result Set containing `NextInvoiceNumber VARCHAR(50)`, `SequenceNumber INT`

### `EV_CreateInvoice`
Records generated invoice details into `Tb_Invoice`, resolves `OrderId` from `OrderNumber` if needed, prevents duplicate entries for the same order, and records the physical storage path in `InvoicePath`.
- **Inputs**: `@InvoiceNumber NVARCHAR(50)`, `@OrderNumber VARCHAR(50) = NULL`, `@OrderId INT = NULL`, `@BillingName NVARCHAR(255)`, `@BillingAddress NVARCHAR(MAX) = NULL`, `@SubTotal DECIMAL(18,2)`, `@GSTAmount DECIMAL(18,2)`, `@TotalAmount DECIMAL(18,2)`, `@InvoiceDate DATETIME = NULL`, `@InvoicePath NVARCHAR(500) = NULL`
- **Outputs**: Result Set containing `InvoiceId INT`, `InvoiceNumber NVARCHAR(50)`, `Success INT` (1 = Created, 0 = Already existed)
- **Updates**: Inserts a new record into `Tb_Invoice`. If a record for the `OrderId` already exists, updates `InvoicePath`.

### `EV_GetUserOrders`
Retrieves user orders, summary statistics, filters (Search, Date, Status), single order modal details, and export datasets for the Orders page dynamically.
- **Inputs**: 
  - `@ActionType INT = 1` (1 = List & Stats, 2 = Details, 3 = Export, 4 = Stats Only)
  - `@UUID VARCHAR(36)` (Required, from session)
  - `@OrderNumber VARCHAR(50) = NULL` (Used for ActionType = 2 or specific lookup)
  - `@PageNumber INT = 1`
  - `@PageSize INT = 10`
  - `@SearchQuery NVARCHAR(100) = NULL` (Searches OrderNumber, PackageName, TransactionId, or Date)
  - `@DateFilter VARCHAR(20) = NULL` ('today', 'week', 'month', 'all')
  - `@StatusFilter VARCHAR(20) = NULL` ('completed', 'pending', 'failed', 'all', or status ID)
- **Outputs**:
  - **ActionType 1**:
    1. **Result Set 1 (Global Stats)**: `TotalOrders`, `CompletedOrders`, `PendingOrders`, `FailedOrders`
    2. **Result Set 2 (Paginated Orders)**: `OrderId`, `OrderNumber`, `UUID`, `TotalAmount`, `GSTAmount`, `SubTotal`, `OrderStatusId`, `OrderStatus`, `StatusCode`, `PaymentMethod`, `TransactionId`, `OrderDate`, `OrderDateIST`, `PackageId`, `PackageName`, `PackagePrice`, `PackageDescription`, `InvoiceId`, `InvoiceNumber`, `InvoiceDate`, `InvoicePath`, `HasInvoice`, `FilteredTotal`, `TotalPages`
  - **ActionType 2**:
    1. **Result Set 1 (Order Details)**: Comprehensive single order details with breakdown for `OrderDetailsModal`
  - **ActionType 3**:
    1. **Result Set 1 (Export Data)**: Unpaginated table formatted for Excel export (`[Order ID]`, `[Package Name]`, `[Amount]`, `[Payment Method]`, `[Order Date]`, `[Status]`, `[Transaction ID]`, `[Invoice Number]`)
  - **ActionType 4**:
    1. **Result Set 1 (Stats Only)**: `TotalOrders`, `CompletedOrders`, `PendingOrders`, `FailedOrders`

### `EV_GetUserRanksAndAchievements`
Retrieves current user rank details, next rank progress metrics (turnover, level 1 members, qualified leaders), achievement categories, carousel achievements with status counts (All, Earned, In Progress, Locked), recent unlock timeline feed, and filtered records for the View All modal.
- **Inputs**:
  - `@ActionType INT = 1` (1 = Overview, 2 = Filtered View All Modal List, 3 = History Audit Timeline, 4 = Categories Dropdown)
  - `@UUID VARCHAR(36)` (Required, from session)
  - `@CategoryId INT = NULL` (Filter for View All Modal: 1: Sales, 2: Network, 3: Earnings, 4: Rank)
  - `@StatusFilter VARCHAR(20) = NULL` ('all', 'earned', 'inprogress', 'locked')
  - `@SearchQuery NVARCHAR(100) = NULL` (Free-text search by title or description)
  - `@PageNumber INT = 1`
  - `@PageSize INT = 20`
- **Outputs**:
  - **ActionType 1**:
    1. **Result Set 1 (Rank Summary)**: `CurrentRankId`, `CurrentRankName`, `CurrentRankColor`, `CurrentRankIconPath`, `AchievedDate`, `CurrentRankBenefits`, `NextRankId`, `NextRankName`, `NextRankColor`, `NextRankIconPath`, `NextRankBenefits`, `RequiredBusiness`, `CurrentBusiness`, `BusinessPercentage`, `RequiredLevel1Members`, `CurrentLevel1Members`, `Level1Percentage`, `RequiredQualifiedMembers`, `CurrentQualifiedMembers`, `QualifiedPercentage`, `OverallProgressPercentage`
    2. **Result Set 2 (Master Ranks Catalog)**: `RankId`, `RankName`, `MinimumBusiness`, `RequiredLevel1Members`, `RequiredQualifiedMembers`, `Color`, `IconPath`, `RankBenefits`
    3. **Result Set 3 (Achievements Carousel)**: `AchievementId`, `Title`, `Description`, `Criteria`, `CategoryId`, `CategoryName`, `Reward`, `Points`, `MetricType`, `TargetValue`, `IconName`, `IconBg`, `DisplayOrder`, `CurrentProgress`, `IsEarned`, `EarnedDate`, `Status`
    4. **Result Set 4 (Recent Achievements Feed)**: `AchievementId`, `Title`, `Description`, `CategoryId`, `CategoryName`, `Reward`, `Points`, `IconName`, `IconBg`, `EarnedDate`, `Status`, `TimeAgoText`
  - **ActionType 2**:
    1. **Result Set 1 (Filtered Achievements)**: `AchievementId`, `Title`, `Description`, `Criteria`, `CategoryId`, `CategoryName`, `Reward`, `Points`, `MetricType`, `TargetValue`, `IconName`, `IconBg`, `DisplayOrder`, `CurrentProgress`, `IsEarned`, `EarnedDate`, `Status`
  - **ActionType 3**:
    1. **Result Set 1 (History Audit Timeline)**: `AchievementId`, `Title`, `Description`, `Criteria`, `CategoryId`, `CategoryName`, `Reward`, `Points`, `MetricType`, `TargetValue`, `IconName`, `IconBg`, `DisplayOrder`, `CurrentProgress`, `IsEarned`, `EarnedDate`, `Status`
  - **ActionType 4**:
    1. **Result Set 1 (Category List)**: `CategoryId`, `CategoryName`

### `EV_GetUserCourses`
Manages Course Packages, EBooks, Reader Canvas, Audio Streaming, and User Progress Tracking for the Courses page dynamically.
- **Inputs**:
  - `@Action INT` (1 = Main Courses Overview, 2 = EBook Reader Canvas & Audio Details, 3 = Save/Sync User Progress, 4 = Single Chapter Audio Lookup)
  - `@UUID VARCHAR(36) = NULL` (Required for personalized packages & progress)
  - `@PackageId INT = NULL` (Optional package filter)
  - `@EBookId INT = NULL` (Target eBook for Reader Canvas or audio)
  - `@ChapterId INT = NULL` (Target chapter for reader canvas or quick audio play)
  - `@CurrentPage INT = NULL` (Current reading page for progress sync)
  - `@LastChapterId INT = NULL` (Last active chapter ID for progress sync)
  - `@IsBookmarked BIT = NULL` (Bookmark toggle flag: 0/1)
  - `@AudioPositionSeconds INT = NULL` (Audio playback timestamp in seconds)
  - `@Status VARCHAR(20) = NULL` ('notStarted', 'inProgress', 'completed')
- **Outputs**:
  - **Action 1 (Courses Overview)**:
    1. **Result Set 1 (Accessible Packages)**: `PackageId`, `PackageName`, `Price`, `Description`, `CoverImagePath`, `PurchaseDate`, `PurchaseDateFormatted`, `TotalEBooks`, `TotalAudioFiles`, `OverallStatus`, `OverallProgressPercentage`
    2. **Result Set 2 (EBooks Catalog)**: `EBookId`, `PackageId`, `PackageName`, `EBookNumber`, `Title`, `Summary`, `DurationText`, `TotalPages`, `CoverImagePath`, `PdfFilePath`, `DisplayOrder`, `CurrentPage`, `LastChapterId`, `IsBookmarked`, `AudioPositionSeconds`, `Status`, `ProgressPercentage`, `LastAccessedDate`, `ChapterCount`, `FirstChapterId`
    3. **Result Set 3 (Curriculum Breakdown)**: `ChapterId`, `EBookId`, `PackageId`, `ChapterNumber`, `Title`, `Subtitle`, `PagesLabel`, `StartPage`, `EndPage`, `AudioTitle`, `AudioUrlPath`, `AudioDurationSeconds`, `DisplayOrder`
  - **Action 2 (Reader Canvas & Audio Details)**:
    1. **Result Set 1 (EBook Details & Progress)**: `EBookId`, `PackageId`, `PackageName`, `EBookNumber`, `Title`, `Summary`, `DurationText`, `TotalPages`, `CoverImagePath`, `PdfFilePath`, `CurrentPage`, `LastChapterId`, `IsBookmarked`, `AudioPositionSeconds`, `Status`, `ProgressPercentage`, `LastAccessedDate`
    2. **Result Set 2 (Chapter Sidebar Table of Contents)**: `ChapterId`, `EBookId`, `ChapterNumber`, `Title`, `Subtitle`, `PagesLabel`, `StartPage`, `EndPage`, `DisplayOrder`, `AudioTitle`, `AudioUrlPath`, `AudioDurationSeconds`, `IsCurrentActive`, `IsLocked`
    3. **Result Set 3 (Active Chapter Reading Canvas Content)**: `ChapterId`, `EBookId`, `ChapterNumber`, `Title`, `Subtitle`, `PagesLabel`, `StartPage`, `EndPage`, `LeadParagraph`, `ContentBody`, `IllustrationPath`, `AudioTitle`, `AudioDesc`, `AudioUrlPath`, `AudioDurationSeconds`, `DisplayOrder`, `AudioPositionSeconds`, `IsBookmarked`
  - **Action 3 (Save Progress)**:
    1. **Result Set 1 (Execution Status)**: `Success`, `Message`
  - **Action 4 (Audio Lookup)**:
    1. **Result Set 1 (Chapter Audio Details)**: `ChapterId`, `EBookId`, `EBookTitle`, `ChapterNumber`, `ChapterTitle`, `AudioTitle`, `AudioDesc`, `AudioUrlPath`, `AudioDurationSeconds`, `AudioPositionSeconds`
- **Updates**:
  - For Action 3: Upserts user progress into `Tb_UserEBookProgress` based on `(UUID, EBookId)`. Auto-calculates completion status and updates `LastAccessedDate`.
