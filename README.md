# 0x6A6471

The code to my home on the internet.

## Overview
- `app/*`: routes and components
- `components/*`: reusable UI components
- `lib/*`: database and rss functions
- `mdx/*`: MDX components, functions, and themes for `/writing`
- `utils/*`: utility functions 

### Running Locally

```
$ git clone git@github.com:0x6A6471/0x6a6471.git
$ cd  0x6a6471
$ bun install
$ bun run dev
```

Create a `.env.local` file similar to what is posted below:

```
# db
DATABASE_URL=

# cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_FOLDER_NAME=

# oku
OKU_READ_URL=
OKU_TO_READ_URL=
OKU_READING_URL=
```

### Built With

- [Vercel](https://vercel.com)
- [Next.js](https://nextjs.org)
- [Neon](https://neon.tech)
- [Cloudinary](https://cloudinary.com)
- [Radix](https://www.radix-ui.com)
- [Tailwind CSS](https://tailwindcss.com)
