# django-jwt-practice
Practicing implementing auth with JWT, Django, and React

https://medium.com/@dakota.lillie/django-react-jwt-authentication-5015ee00ef9a
* Use this instead for JWT (djangorestframework-jwt is out-of-date): https://django-rest-framework-simplejwt.readthedocs.io/en/latest/
* Store the access token in memory, the refresh token in sessionStorage, get a new access token every page load.

## Development
SSO with JWT and React micro-frontends
https://medium.com/@mikkanthrope/sso-with-jwt-and-react-micro-frontends-811f0fcc4121
* For development with different Webpack servers, see #3 queryParams solution above.

## TODO
Blacklist:
https://django-rest-framework-simplejwt.readthedocs.io/en/latest/blacklist_app.html
### Production
Ensure security when storing JWT in sessionStorage/localStorage
https://security.stackexchange.com/questions/179498/is-it-safe-to-store-a-jwt-in-sessionstorage

Expire sessionStorage/localStorage
https://gist.github.com/shaik2many/039a8efe13dcafb4a3ffc4e5fb1dad97