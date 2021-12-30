# Awesome Tech Blogs.⚡

Visit [tech-blogs.dev](https://tech-blogs.dev/).

# Guide to add your own Blog:

- Make a Fork of this repo
- Create a new branch
``` bash
git checkout -b YourBranchName
```
- Go to [`data.js`](./data.js) file
- Add your blog details in the following format:
``` md
  {
    name: <your _name>,
    description: <desc>,
    url: <blog_url>,
    tags: [<tag1>, <tag2>...],
  },
```
- Commit the changes and push 
``` bash
git add .
```

``` bash
git commit -m "<your_commit_message>"
```

``` bash
git push origin YourBranchName
```

- Create a Pull Request from your Forked Repo!

> Inspired by [Wes Bos's](https://wesbos.com/) [`/uses`](https://uses.tech/) page.
