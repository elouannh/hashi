
# Hashi

## Creating a new version

First, let's build the package:
> On Windows (burk):
```batch
.\scripts\build.bat ; git add .
```
> On Linux/Mac (gigachad):
```bash
./scripts/build.sh && git add .
```

Secondly, let's box our files into a commit:
```bash
git commit -m "My message!"
```

Then, let's update the version:
```bash
npm version <patch|minor|major|prerelease --preid=devbuild>
```

Finally, let's publish the new version and push it to GitHub:
```bash
git push; npm publish; git push --tags
```

Well done!

## Testing the code

To run the code placed into the lab/ folder, just run:
```bash
ts-node tests/tests.test.ts
```
(Don't forget to build just before running it.)
