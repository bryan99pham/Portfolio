IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    CREATE TABLE [Department] (
        [DepartmentId] uniqueidentifier NOT NULL,
        [DepartmentName] nvarchar(max) NULL,
        CONSTRAINT [PK_Department] PRIMARY KEY ([DepartmentId])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    CREATE TABLE [Employee] (
        [Id] uniqueidentifier NOT NULL,
        [FirstName] nvarchar(max) NULL,
        [LastName] nvarchar(max) NULL,
        [DateOfBirth] datetime2 NOT NULL,
        [Email] nvarchar(max) NULL,
        [Mobile] bigint NOT NULL,
        [ProfileImageURL] nvarchar(max) NULL,
        [DepartmentId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Employee] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Employee_Department_DepartmentId] FOREIGN KEY ([DepartmentId]) REFERENCES [Department] ([DepartmentId]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    CREATE TABLE [Address] (
        [Id] uniqueidentifier NOT NULL,
        [PhysicalAddress] nvarchar(max) NULL,
        [PostalAddress] nvarchar(max) NULL,
        [EmployeeId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Address] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Address_Employee_EmployeeId] FOREIGN KEY ([EmployeeId]) REFERENCES [Employee] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    CREATE UNIQUE INDEX [IX_Address_EmployeeId] ON [Address] ([EmployeeId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    CREATE INDEX [IX_Employee_DepartmentId] ON [Employee] ([DepartmentId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20221003203228_Initial migration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20221003203228_Initial migration', N'5.0.9');
END;
GO

COMMIT;
GO

