# EnhancedTable
This component implements the [Sorting and Select](https://material-ui.com/components/tables/#sorting-amp-selecting) table
from the the material-ui demos. The internal functionality was changed significantly however as our table will be driven
by an API with pagination whereas the demo assumes all data is present at the time of load. This means the parent of this
component is responsible for fetching new data on sorting/filtering/pagination. 

## Issues
While the table currently has selectable rows enabled the current implementation for selecting all rows while not work. 
Because we're using pagination the table doesnt have all of the rows so it can't possibly know what all of the rows are.
We'll likely need to just pass a "selectAll:true | false" value to the backend if we're going to implement this.

## JIRA
Related jira ticket: https://clubos.atlassian.net/browse/SM5-35
