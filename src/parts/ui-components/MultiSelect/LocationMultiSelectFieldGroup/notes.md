# LocationMultiSelectFieldGroup
This component wraps the generic `MultiSelectFieldGroup` component and passes in location/region specific labels and 
helper text. The component provides features to allow searching as well as an option to indicate that they want to 
select all locations/regions including any locations/regions that would be adding in the future.


## Usage
This component was created initially to be used in the email and SMS campaign creation views as well as the email
template views.

## Issues

### Performance
There are known performance issues when handling hundreds or thousands of items in the lists. Additional performance
optimizations could be made but we've decided to wait until we determine its necessary.

## JIRA
Related jira ticket: https://clubos.atlassian.net/browse/CR-579
