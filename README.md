# Getting Started

- Please read the INSTRUCTIONS.md first
- For any questions around Create React App (CRA), reference
  CRA_DOCUMENTATION.md

# Code and Design Decisions

<!-- Please document your code & design decisions here. -->

* in a more complex application I'd use redux (although it was said not to use)
* notes about flex box usage... slash responsiveness
* paginate responses
* better address formatting (Title Casing, abbreviations for Boulevard to cut down on wrapped lines)
* 375 width and 1180 width are according to comps. didn't have enough time to handle responsiveness perfectly between those widths.
* could style the not found page more
* could add proptypes for better props validation
* would want to store the API key and secret in parameter store or env variables (since this is public, thought it was fine to hard code)
* would want to store the API url in parameter store or env variable (in case the URL changes, you wouldn't have to deploy that change)