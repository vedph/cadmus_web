# User Roles

Cadmus provides 4 user roles:

1. `admin`: administrator.
2. `editor`: editor.
3. `operator`: operator.
4. `visitor`: visitor.

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
