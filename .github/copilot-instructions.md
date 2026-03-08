# ADO Monthly Report — Copilot Instructions


This project uses Azure DevOps (ADO). Always check to see if the Azure DevOps MCP server has a tool relevant to the user's request.

When you retrieve work items from an ADO query, always subsequently retrieve the work item item details. Use the description field from individual work items to provide more context.

Whenever you link to an ADO work item, the URL format should be created by embedding the work item ID into a string of format "https://skype.visualstudio.com/SCC/_workitems/edit/{WORK ITEM ID}". For example, if the work item ID is 12345, the URL would be "https://skype.visualstudio.com/SCC/_workitems/edit/12345".

I work for a team called IC3 Data Science. Our objectives, key results (OKRs), features, epics, and tasks related to those work items are stored in an ado query with ID 7315625a-0600-497f-9f24-b2e634bc1121. The ADO project used for our work items is SCC. The top-level work items are objectives, and linked work items are key results. Features, Epics, and Tasks we work on are child work items of key results. The work item hierarchy is as follows: Objectives > Key Results > Features> Epics > Tasks. When you retrieve Objectives, always retrieve all linked work items from this query with the area path SCC\IC3DATASCIENCE as well.

Within IC3 Data Science (IC3DS), I am the product manager (PM) for the team. Smrati Gupta is our team's Data Science Manager.

Within our team, we have five main data science domains, led by five Data Science managers: Chathra, Teele, Oliver, Martin, and Aysu. Chathra's team works on Phone and Messaging Analytics. Teele's team works on Protection Intelligence (Fraud). Oliver's team works on Call Quality and Reliability Analytics. Martin's team works on Real-Time Communications (RTC) Analytics. Aysu's team works on LLM Evaluations. Each of our teams has a corresponding ADO Area Path under "SCC\IC3DATASCIENCE". Chathra's team uses the area path "SCC\IC3DATASCIENCE\Business_Intelligence". Teele's team uses the area path "SCC\IC3DATASCIENCE\Fraud". Oliver's team uses the area path "SCC\IC3DATASCIENCE\Media_CQD". Martin's team uses the area path "SCC\IC3DATASCIENCE\RTC_Analytics". Aysu's team uses the area path "SCC\IC3DATASCIENCE\AI_Products".

The ADO query with ID 2c290a17-a94c-4edc-9371-c09ac19ee310 contains all work items Chathra's team is working on in CY26H1.
The ADO query with ID cc696c66-1daf-4433-928b-1521a0c83512 contains all work items Teele's team is working on in CY26H1.
The ADO query with ID 4ae1e822-76b8-406c-b62e-15ebba1f7c56 contains all work items Oliver's team is working on in CY26H1.
The ADO query with ID 01188cd2-fee5-4e7f-80a6-838897bab326 contains all work items Martin's team is working on in CY26H1.
The ADO query with ID 019c562d-b9b9-4f22-8ed5-e38254574ddb contains all work items Aysu's team is working on in CY26H1.

The ADO query with ID 31883b51-b519-435e-a1f0-ccf7a5d92998 contains all work items Martin's team has or is working on in their sprints.
The ADO query with ID d77ff794-b6d0-4687-8c5e-7217f6198591 contains all work items the eval v-team (led by Aysu) has in their backlog and what is currently completed or in progress.
The ADO query with ID 92aff5d1-06bc-4cbd-ba83-f68820fceefe contains all work items Oliver's team has or is working on in their sprints.
The ADO query with ID e7ce1505-f585-4dcb-8552-c4271a7ca0ed contains all work items Teele's team has or is working on in their sprints.
The ADO query with ID 6f5b07a0-1857-46d6-9d01-bda9626ab8eb contains all work items Chathra's team has or is working on in their sprints.

When asked about the status of a particular feature, epic, or task, always check the relevant ADO query for the team working on that item to provide the most up-to-date information. If the item is not found in the team's specific query, check the broader query for all work items under SCC\IC3DATASCIENCE to ensure you have the latest status. When providing updates on work items, include the current state (e.g., New, Active, Resolved, Closed) and any recent changes or comments from the ADO work item details. When summarizing the status of a feature, epic, or task, also consider any linked work items that may impact its progress, such as dependencies or related key results. When asked about the overall progress of a key result, feature, or epic, provide a summary of the completion status of its child work items (e.g., how many tasks are completed vs. total tasks) and any blockers or risks mentioned in the work item details. 

Always ensure that your responses are based on the most current data from ADO to provide accurate and relevant information. When discussing the progress of work items, also consider any relevant comments or updates from team members in ADO, as these can provide additional context on the status and any challenges being faced. If a user asks for a report on the team's progress, consider generating a summary that includes key metrics such as the number of work items completed, in progress, and not started, as well as any significant achievements or blockers mentioned in the ADO work item details. Always tailor your responses to the specific work items and teams involved, ensuring that you provide the most relevant and up-to-date information based on the ADO data. Maintain a clear and concise communication style when summarizing work item statuses, and always verify the information against the latest ADO data to ensure accuracy.

When referring to work items in your responses, always use the ADO work item ID and provide a hyperlink to the work item in ADO for easy reference. For example, if you are discussing a work item with ID 12345, you would refer to it as "Work Item 12345" and include a hyperlink to "https://skype.visualstudio.com/SCC/_workitems/edit/12345". This allows users to quickly access the work item details in ADO for more information.
