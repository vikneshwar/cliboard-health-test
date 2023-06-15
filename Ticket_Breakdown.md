# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

**Ticket 1: Update the Agent Table to Include Custom Agent ID**

**Description**: The Agent table currently lacks a field for storing the custom Agent ID provided by Facilities. We must add a new column to the Agent table to accommodate this information.

**Acceptance Criteria:**

-   The Agent table should have a new "Custom Agent ID" column to store the Facility-provided ID.
-   The Custom Agent ID column should allow unique values and prevent duplicates.
-   The Custom Agent ID field should be optional, as not all Agents may have a custom ID.
-   The existing data in the Agent table should remain intact after the modification.
-   Write unit tests to validate the functionality of the modified Agent table.

**Implementation Details:**

1.  Analyze the existing Agent table schema and determine the appropriate data type for the Custom Agent ID column.
2.  Write a database migration script to add the Custom Agent ID column to the Agent table.
3.  Run the migration script to update the Agent table structure.
4.  Update any relevant database models or ORM mappings to reflect the new column.
5.  Modify the data validation logic to enforce uniqueness and handle optional custom IDs.
6.  Write and run unit tests to verify that the modified Agent table functions as expected.

**Effort Estimate**: 3 hours

-----
**Ticket 2: Update the Agent Update Endpoint to Handle Custom Agent ID**

Description: The current Agent update endpoint in the backend API does not support the Custom Agent ID field. We need to modify the endpoint to handle updates to this new field.

**Acceptance Criteria:**

-   The Agent update API endpoint should accept the Custom Agent ID as part of the update payload.
-   The endpoint should validate the uniqueness of the Custom Agent ID and handle any conflicts.
-   If provided, the Agent table should be updated with the new Custom Agent ID.
-   The existing functionality of the endpoint, such as updating other Agent details, should remain unaffected.
-   Update the existing unit tests for the Agent update endpoint and add additional tests to cover the new functionality.

**Implementation Details:**

1.  Update the Agent update endpoint to parse and validate the Custom Agent ID from the request payload.
2.  Query the Agent table to check for the uniqueness of the Custom Agent ID and handle any conflicts.
3.  If the Custom Agent ID is unique, update the Agent table with the provided ID.
4.  Return the updated Agent details in the API response.
5.  Update the existing unit tests for the Agent update endpoint to include test cases for the Custom Agent ID field.
6.  Write additional unit tests to cover the new functionality introduced in this ticket.

**Effort Estimate**: 4 hours

---
Ticket 3: Update the Facility User Interface to Include Custom Agent ID Field

**Description:** The Facility user interface currently lacks a field for entering the Custom Agent ID for their assigned Agents. We must update the user interface to include this field in the Agent Management section.

**Acceptance Criteria:**

-   In the Facility dashboard's Agent section, add a new field labelled "Custom Agent ID."
-   The Custom Agent ID field should be optional.
-   Update the validation logic to handle the optional nature of the Custom Agent ID field.
-   Update the existing unit tests for the Facility user interface and add tests to cover the new field.

**Implementation Details**:

1.  Identify the appropriate location in the Facility user interface to include the Custom Agent ID field.
2.  Add the Custom Agent ID field to the Agent Management section of the user interface.
3.  Modify the validation logic to handle the optional nature of the Custom Agent ID field.
4.  Update the existing unit tests for the Facility user interface to validate the behaviour of the new field.
5.  Write additional unit tests to cover the new functionality introduced in this ticket.

**Effort Estimate**: 2 hours

  ---
**Ticket 4: Implement the `groupAgentByShifts` function to group shifts for each agent and calculate the total hours worked.**

  

**Description**: The current function `getShiftsByFacility` retrieves all shifts within a given timeframe but does not group them by the agent. This ticket requires implementing a new function, `groupAgentByShifts`, which will group shifts by agent and calculate the total hours worked for each agent.

 
**Acceptance Criteria:**

-   The groupAgentByShifts function should accept a list of shifts and return the summed up hours for each agent.
-   Write unit tests and integration tests to ensure the correctness of the function.

**Implementation Details:**

1.  Implement the `groupAgentByShifts` function, which takes a list of shifts as input.
2.  Initialize an empty dictionary to store the summed up hours for each agent.
3.  Iterate through each shift in the list.
4.  For each shift, retrieve the agent associated with the shift.
5.  If the agent is already present in the dictionary, add the shift's duration to the existing total hours for that agent.
6.  If the agent is absent in the dictionary, add a new entry with the agent and the shift's duration as the initial total hours.
7.  After processing all the shifts, return the dictionary containing the summed up hours for each agent.

  
---
***Note:***

-   *Alternatively, this task can be efficiently accomplished through queries rather than implementing the logic in the code. By querying all the shifts and utilizing the groupBy clause with the Agent ID, along with aggregate functions like sum, we can easily calculate the total hours worked for each agent. Query-based implementation generally offers improved performance compared to handling it in the code, although further analysis is required. If the query approach is adopted, we can directly incorporate this functionality into a single query used in the `getShiftsByFacility` function, eliminating the need for a separate `groupAgentByShifts` function.*
-   *Additionally, it is assumed that the Agent ID stored in the agent_id column of the Shifts table corresponds to the custom agent ID provided by the user (rather than the database-generated ID). If the intention is to store the database ID, a join query should be utilized to retrieve the corresponding custom ID from the Agent Table.*

  

**Estimation**: 4 hours

  

**Ticket 5: Update the generateReport function to include the custom Agent ID and call groupAgentByShifts.**

  

**Description**: The current generateReport function does not group shifts by the agent. This ticket aims to update the function to call the groupAgentByShifts function with the list of shifts and include the custom Agent ID in the generated report.

  

**Acceptance Criteria**:

-   The generated report should include a new column for the custom Agent ID.
-   Update the unit and integration tests to cover the changes made.
-   Ensure that other columns in the report remain unaffected.

**Implementation Details**:

1.  Modify the generateReport function to call the `groupAgentByShifts` function, passing in the list of shifts.
2.  Retrieve the summed up hours for each agent from the `groupAgentByShifts` function.
3.  Update the PDF generation logic to include the new custom Agent ID column.
4.  Generate the report with the updated columns and return it.

  

Note:

*-   If the grouping logic is intended to be handled directly within the query, there is no need to utilize the `groupAgentByShifts` function. In such cases, the focus should be solely on implementing the PDF generation logic within the generateReport function.*

**Estimation:** 2 hours

  
---
**Ticket 6: Test the end-to-end flow after completing the previous tickets.**

**Description:** After completing the previous tickets, it is essential to thoroughly test the end-to-end flow by adding an agent ID and ensuring it reflects in the report. Manual testing or writing automated tests can be performed to achieve this.

  

**Acceptance Criteria:**

-   Verify that the agent ID can be successfully updated from the user interface.
-   Confirm that the generated report for the quarter contains the custom agent ID.
-   Write automated tests to cover the end-to-end flow, if applicable.

  

**Estimation:**

-   Manual testing: Less than 1 hour
-   Automated testing: 4 hours

  

*Note: This task breakdown assumes that an agent works in only one facility. If an agent can work in multiple facilities with different shifts, the database schema design needs to be reconsidered.*

  

*Solution 1: The simplest solution is to create a new agent record in the Agent Table for each facility. This approach introduces duplication of agent records, although it keeps the application straightforward.*

  

*Solution 2: In the Shift table, along with the Facility ID, store the agent ID (which is the database ID, not the ID provided by the facility). Maintain only one record for each agent in the Agent Table, even if they work for multiple facilities. Create a new Agent-Facility relation table with columns like Facility ID, Agent ID (database ID), and Custom Agent ID (ID provided by the facility). Although this solution requires an additional table and more maintenance, it avoids duplicates. Solution 2 is recommended over Solution 1.*