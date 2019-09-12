
Simple solution to have NGINX return errors in JSON format instead of HTML. Heavily inspired from https://nimblea.pe/monkey-business/2015/03/26/replying-with-json-errors-from-your-nginx-fronted-json-api/

This repo contains one json files per http error, with the following schema:
```json
{
    "status": "HTTP RESPONSE CODE",
    "description": "ERROR PHRASE: ERROR DESCRIPTION"
}
```

Those files can be re-generated as follow (assuming you have nodejs installed):
```shell
npm install
npm run build
```
(`npm install` should be run once only.)

# Usage

- Copy the nginx-errors folder in a place accessible by NGINX
- Adapt the below config snippet to your needs and copy it in the NGINX server directive.
```
    error_page 511 /nginx-errors/511.json;
    error_page 507 /nginx-errors/507.json;
    error_page 506 /nginx-errors/506.json;
    error_page 451 /nginx-errors/451.json;
    error_page 431 /nginx-errors/431.json;
    error_page 429 /nginx-errors/429.json;
    error_page 428 /nginx-errors/428.json;
    error_page 424 /nginx-errors/424.json;
    error_page 423 /nginx-errors/423.json;
    error_page 422 /nginx-errors/422.json;
    error_page 505 /nginx-errors/505.json;
    error_page 504 /nginx-errors/504.json;
    error_page 503 /nginx-errors/503.json;
    error_page 502 /nginx-errors/502.json;
    error_page 501 /nginx-errors/501.json;
    error_page 500 /nginx-errors/500.json;
    error_page 426 /nginx-errors/426.json;
    error_page 417 /nginx-errors/417.json;
    error_page 416 /nginx-errors/416.json;
    error_page 415 /nginx-errors/415.json;
    error_page 414 /nginx-errors/414.json;
    error_page 413 /nginx-errors/413.json;
    error_page 412 /nginx-errors/412.json;
    error_page 411 /nginx-errors/411.json;
    error_page 410 /nginx-errors/410.json;
    error_page 409 /nginx-errors/409.json;
    error_page 408 /nginx-errors/408.json;
    error_page 407 /nginx-errors/407.json;
    error_page 406 /nginx-errors/406.json;
    error_page 405 /nginx-errors/405.json;
    error_page 404 /nginx-errors/404.json;
    error_page 403 /nginx-errors/403.json;
    error_page 402 /nginx-errors/402.json;
    error_page 401 /nginx-errors/401.json;
    error_page 400 /nginx-errors/400.json;

    location ^~ /nginx-errors/ {
        internal;
        root   <REPLACE BY PATH TO A THE PARENT FOLDER OF THE COPIED NGINX-FOLDER>;
    }
```

## Content-type

NGINX needs to return a `content-type: application/json` header for the above to work.
A simple solution is to have it in the `types` list:
```
types {
...
    application/json                      json;
...
}
```

Alternatively, you can use:
```
        more_set_headers 'Content-Type: application/json charset=UTF-8';
```
In the location directive above, this requires to have the https://github.com/openresty/headers-more-nginx-module module installed.

