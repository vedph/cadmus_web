# User Roles

Cadmus provides 4 user roles for authenticated users:

1. `admin`: administrator (level 4).
2. `editor`: editor (level 3).
3. `operator`: operator (level 2).
4. `visitor`: visitor (level 1).

Unauthenticated users have level 0.

Each of the upper roles has all the authorizations of the lower roles. The editing operations according to these roles are listed below, with the minimum role required.

- register user: `admin`
- resend confirmation email: `visitor`
- confirm registration: `visitor`
- change password: `visitor`
- reset password: `visitor`

- get users info list: `visitor`
- get current user: `visitor`
- get user: `admin`
- update user: `admin`
- delete user: `admin`

- add/update item: `operator`
- delete item: `editor`
- add/update part: `operator`
- delete part: `editor`; `operator` only for parts created by himself.
