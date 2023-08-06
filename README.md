# stack.management

low distraction todo app that helps you prioritize and focus

## Self-hosting

```
docker run -d -p 3000:3000 --name stack-management \
  -e DATABASE_URL=postgresql://postgres:postgres@localhost:5432/stack-management \
  -e JWT_ACCESS_SECRET=5jmP48hmpMruJbkMD2Mf9YGRrw42zhFCBjETRS3D \
  ghcr.io/bdeak4/stack-management:latest
```

## Development

#### Dependencies

- Node.js >=18 and yarn
- PostgreSQL >= 15

#### Install dependencies

```
yarn
```

#### Setup environment

Create `.env.local` file that can override configuration options from `.env` in web/api apps.

Required variables for `api`:
- `DATABASE_URL`
- `JWT_ACCESS_SECRET`

#### Run database migrations

```
yarn prisma migrate dev
```

#### Run database seed

```
yarn prisma db seed
```

#### Run app

```
yarn dev
```

App is now accessible on <http://localhost:5173/>. API routes are prefixed with `/api`.

## Cookbook

#### Add new dependency

example: add `react-hot-toast` library to `web` app

```
yarn workspace web add react-hot-toast
```
