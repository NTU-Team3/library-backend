# library-backend

## Endpoints

&nbsp;

### 🚩 _/admin_

| Verb               | Path             | Functions                                   | Description                                                                  |
| ------------------ | ---------------- | ------------------------------------------- | ---------------------------------------------------------------------------- |
| GET (POST)         | /admin/a-members | addmembers()                                | - adds demo data of 5 members, collection is created if not existant         |
| GET (DELETE)       | /admin/d-members | deletemembers()                             | - deletes demo data based on \_ids of same 5 members from addmembers()       |
| GET (DELETE, POST) | /admin/r-members | resetmembers(deletemembers(), addmembers()) | - resets the demo date, first calls deletemember(), followed by addmembers() |

&nbsp;
&nbsp;

### 🚩 _/member_

| Verb | Path                             | Functions          | Description                                                                                                     | Refinement Stage                     |
| ---- | -------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| GET  | /member/v-loans/:memberid        | viewloans()        | - view all loans                                                                                                |                                      |
| ⬆️   | /member/v-reservations/:memberid | viewreservations() | - view all histories                                                                                            |                                      |
| ⬆️   | /member/v-histories/:memberid    | viewhistories()    | - view all reservations                                                                                         |                                      |
| ⬆️   | /member/v-reviews/:memberid      | viewreviews()      | - view all reviews                                                                                              |                                      |
| ⬆️   | /member/v-profile/:memberid      | viewprofile()      | - view editable member profile                                                                                  |                                      |
| PUT  | /member/u-loans/                 | updateloans()      | - update single loan status of book - refreshes "On Loan" to "Returned", refreshes "returndate" to current date |                                      |
| ⬆️   | /member/u-reviews/               | updatereviews()    | - update single review - refreshes "rating" / "comments" / "reviewdate"                                         |                                      |
| ⬆️   | /member/u-profile/               | updateprofile()    | - update member profile - refreshes "name" / "email" / "password"                                               | - Implement JWT & hashing            |
| ⬆️   | /member/checkout                 | checkout()         | - creates a single new loan record, when member clicks checkout on the cart page                                | - Add multiple books/records at once |

&nbsp;
&nbsp;

| Params - Members.\_id    | Field - Members.name | Field - Members.loans/reservations/reviews                                                                             |
| ------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| 62bb5207127ffb266882da91 | ikoh                 | 8 record/s in loans - "On Loan", loans - "Returned", reservations - "Pickup Ready , reservations - "In Queue", reviews |
| 62bb5207127ffb266882da92 | swchee               | 4 record/s in loans - "On Loan", loans - "Returned", reservations - "In Queue", reviews                                |
| 62bb5207127ffb266882da93 | rlau                 | 1 record/s in loans - "On Loan"                                                                                        |
| 62bb5207127ffb266882da94 | sbahri               | 1 record/s in reservations - "Pickup Ready"                                                                            |
| 62bb5207127ffb266882da95 | kmsheng              | 0 record/s                                                                                                             |
| 62bb5207127ffb266882da99 | test                 | 0 record/s - _\*\*\* This particular record does not exist in ../demodata/dd-members.json_                             |
