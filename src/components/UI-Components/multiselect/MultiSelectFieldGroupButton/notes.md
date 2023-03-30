# MultiSelectFieldGroupButton
This component wraps the `MultiSelectFieldGroup` component with a `SelectWithNoMenu` and `Popover` component. This
component handles managing it's own reference to the selected values. Thereby, upon clicking off of the Popover without
the user applying or clearing, the values will not be updated. This component also handles the logic for hiding/showing 
the Popover, and the dynamic text displayed in the button.

This component is generic, meaning that it can display any number/kinds of groups. The group and list data is provided 
by the consumer of the component.

## JIRA
Related jira ticket: https://clubos.atlassian.net/browse/CR-741
