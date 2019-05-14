# API-STORE Api Document

A document about web service RestFul API-STORE

## <span id="api-example-for-a-submenu-entry">HowTo include</span>

In your projects "package.json" you can set "apidoc.header" with a title and a filename to include this file into your documentation.

This example attempts to integrate "header.md" and "footer.md".

    {
      "name": "example",
      "version": "0.3.0",
      "description": "apidoc example project.",
      "apidoc": {
        "header": {
          "title": "My own header title",
          "filename": "header.md"
        },
        "footer": {
          "title": "My own footer title",
          "filename": "footer.md"
        }
      }
    }

## <span id="api-example-for-a-submenu-entry2">Status codes</span>
200 = OK
201 = Created
400 = Bad Request
401 = Unauthorized
403 = Forbidden
500 = Internal Server Error