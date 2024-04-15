# Getting Started

- Please read the INSTRUCTIONS.md first
- For any questions around Create React App (CRA), reference
  CRA_DOCUMENTATION.md

# Code and Design Decisions

<!-- Please document your code & design decisions here. -->

## Decisions
* Utilized JSDoc for function documentation 
* Added `jest` as a dependency for unit testing
* Styled the mobile experience at a width of 375px and the desktop experience at a width of 1180px. I used CSS flexbox to dynamically display the listings, but I didn't have enough time to perfectly style the experiences in between the mobile and desktop viewport widths, for a fully responsive application.
* My unit tests don't mock the fetch request or the local storage actions - I think this is very important to test and a core part of this app's functionality, but simply didn't have enough time to prioritize that within the 3 hours.

## Assumptions
* It's ok to use CSS flexbox and allow for a dynamic number of property listings per row (based on viewport width)
* Mobile viewport width ends at 430px

## Future Improvements
If I had more time, I would implement the following improvements:
* Paginated responses
* Better address formatting: consistent title casing and abbreviations (i.e. "Blvd" instead of "Boulevard")
* Style the "Not Found" / 404 page and add a button to take users back to a supported page route
* Store the SimplyRETS API key and secret in a parameter store of env variable (since the key and secret was public information, I thought it was fine to hard code)
* Utilize the `prop-types` library to better declare props going into React components
* Add unit tests for toggling the "favorite" and "unfavorite" icons

Thank you!