
git pull \
&& npm install \
&& npm run build-vite \
&& cd present_ideas \
&& poetry run python manage.py collectstatic --noinput