Thank you for your interest in the Employee Management App!
With this app, you will be able to:
	- View all employees in the table
	- Click on an individual employee's first or last name to view their profile.
	- Edit their information by clicking on the pencil icon at the end of the row.
	- Change an employee's profile picture.
	- Search for employees by typing keywords into the search bar.
	- Sort employees in the table by their fields.

NOTE: The app has been deployed on https://employeemanagementappui.web.app/ meaning that you DO NOT
have to follow the instructions to download/install any software.


--------------------------------------------------------------------------------------------------------------------------------


Software required to run project:
*NOTE: the project may not be able to run without many extra steps. 
-------------------------------------

- Visual Studio 2022 - Community Edition (this is not the same as VS Code and has a purple logo/icon instead of blue): 
	+ https://visualstudio.microsoft.com/downloads/
	+ SETUP: 
		- Once installed and opened, in the window that pops up: 
			1) Select "ASP.NET and web development" under the Web & Cloud section.
			2) Select ".NET desktop development" under the Desktop & Mobile section.
			3) Select "Data storage and processing" under the Other Toolsets section.
			4) Select ".NET cross-platform development" under the Other Toolsets section.
			5) Click Install

- .NET SDK (.NET 5.0) 
	+ Direct Download: https://dotnet.microsoft.com/download/dotnet/thank-you/sdk-5.0.401-windows-x64-installer

- .NET Runtime (.NET 5.0) 
	+ Direct Download: https://dotnet.microsoft.com/download/dotnet/5.0/runtime

- SQL Server (Developer Edition) for Windows: 
	+ https://www.microsoft.com/en-us/sql-server/sql-server-downloads?rtc=1

- SQL Server Management Studio (IDE) for Windows:
	+ Direct Download: https://aka.ms/ssmsfullsetup
	+ Once installed and opened, in the "Connect to Server" window:
		- If the server name field is pre-populated with a name that starts with "DESKTOP", leave the Authentication field as Windows Authentication, and click on connect.
			+ NOTE: Remember the name of the server as it is needed later.
		- If the server name field is empty, type in a "." (period/dot), leave the Authentication field as Windows Authentication, and click on connect.
	+ After these steps, you should have been able to connect to a local instance of your SQL server and can continue.

- Visual Studio Code (any version of VS Code):
	+ Direct Download: https://code.visualstudio.com/docs/?dv=win

- NodeJS:
	+ https://nodejs.org/en/download/

- Angular CLI (After Installing NodeJS):
	+ run the following command in the terminal excluding the double quotes: "npm install -g @angular/cli"


Setup 
-----------------------

				Creating the Database:
			       ------------------------
- In Visual Studio (purple logo/icon program), open/load the EmployeeManagementAppAPI folder.
- Then EmployeeManagementAppAPI/EmployeeManagementAppAPI/EmployeeManagementAppAPI.sln (sln stands for solution)
- Once the solution file is opened, there will be a section on the right side of the window called "Solution Explorer.
	+ Scroll all the way down and near the bottom, open the file named appsettings.json.
	+ Based on the step you took when connecting to your local SQL server, in the line that begins with "EmployeeManagementAppDb" (should be line 11):
		- In the string server should be assigned to what your local SQL server's name is:
		- Example 1: "EmployeeManagementAppDb": "server=.;database=EmployeeManagementAppDb;Trusted_Connection=true"
		- Example 2: "EmployeeManagementAppDb": "server=DESKTOP12345;database=EmployeeManagementAppDb;Trusted_Connection=true"
		- Save the file
	+ In the Tools tab at the top, click on NuGet Package Manager > Package Manager Console:
		- In the console, follow these steps and exclude/ignore the double quotes:
			1) Type "Add-Migration" and hit enter.
			2) For the next prompt, type "Initial migration" and hit enter.
			3) Update-Database and hit enter.
	+ To check if your database has been created, click on the View tab and click on Server Explorer.
		- On the left side of your screen the Server Explorer will appear.
		- In the Server Explorer, click on the cylinder-shaped icon to connect to your database.
		- For the server name, you can just type a "." (dot/period)
		- Expand the drop down list of database names and select "EmployeeManagementAppDb".
		- At the bottom left of the same window, click on Test Connection.
		- If you receive a pop up window saying "Test connection succeeded", you will be able to proceed with the next steps.
		- Click on OK on the pop up window and "Add Connection window".


				Seeding the Database:
			       -----------------------
- Open Microsoft SQL Server Management Studio
- In the Object Explorer on the left, go to your server, and under Databases, click on "EmployeeManagementAppDb"
- Click on the "New Query" button at the top left side of the program's window.
- Copy all of the text from the employeeSeed.txt file.
- Paste the text in the new query window.
- If the text is not highlighted yet, use Ctrl + A to select/highlight the text in the query window.
Once it is all highlighted, click on the Execute button at the top left side of the program's window.
- If no errors were received, the database has been populated with our seed data.


				Adjusting your port number:
			       ----------------------------
- Open Visual Studio (purple logo/icon program) and use the shortkey: Ctrl + Shift + B to rebuild the database to make sure it is up-to-date.
- At the top, there is a green play button (triangle-shaped) with the text "IIS Express" next to it, click it.
- You will be redirected to your browser to a website called Swagger.
- In the address bar, you should see a URL similar to this: https://localhost:44383/swagger/index.html
- Remember/copy the number in this URL.
- Open Visual Studio Code (blue program) and open/load the "employeemanagementapp-ui" folder.
- Scroll down to the environments folder on the left side of the screen and open the environment.ts file.
- Replace the number in the URL with the number that you had on the Swagger website. Save the file.
- You're now able to run the app in the next section!


How to run app
---------------
If the database isn't still running from the previous section, click on the green play button again to start it.

This step is easier if you open a terminal in Visual Studio Code (blue program):
	- In the terminal, make sure that you're in the employeemanagementapp-ui directory and run "npm install" to make sure that all dependencies have been installed. This step may be skippable.
	-Run "ng serve" to see the app in action (try "npm start" in case "ng serve" fails).


