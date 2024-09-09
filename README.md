# Fake store
The project assumes that the shop does not have any authentication.

## Improvements

### General
- add authentication to reference saved cart stored in the backend
- store the cart on the backend to make it persistent between user sessions
- get the category slug from the CMS instead of the title
- instead of a simple loading spinner consider creating skeleton components
- consider using the blurred image first to show the loading state to the user as fast as possible.

## State management
Because the fake store API returns hardcoded values from the cart I decided not to include the get cart request. Cart is based only on the reducer state. In the reducer state, I decided to store elements like in the Redux entity store. Thanks for having ids and objects separately it is easy to manipulate like sorting per supplier. I decided to keep only the IDs and quantities because in real-world scenarios, the cart would be stored in a database. There is a danger that after some time content management team will change the product data or even remove it from the store. In that case, the cart would be stale.

- add asynchronous actions like async thunk or write state management with the @tanstack/query library that would allow easily to implement optimistic updates.
- in my example single source of truth is a reducer in the real world it would be the backend so all the actions should update BE first then the mentioned optimistic update can be considered

### Error handling
- create better error handling with more descriptive messages based on the response
- consider adding a monitoring service to report unexpected errors
- create more granular error boundaries to prevent of failing the whole page

### Page renders
- consider adding generateStaticParams to render static pages on build time

### Seo
- generate metadata per page based on the category data
