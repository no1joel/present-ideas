# README

## How to run in development

terminal 1:

```sh
npm run serve-vite
```

terminal 2:

```sh
VITEDEV=1 python manage.py runserver 0.0.0.0:8000
```

### How to run in production

```sh
npm run build-vite
python manage.py collectstatic
python manage.py runserver 0.0.0.0:8000
```
