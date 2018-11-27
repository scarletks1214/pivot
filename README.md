Trane
=====

Trane is Pivot's training and administration frontend, that helps us manage
classes, users, exercises and more.

## Getting Started

### Installing requirements
To get started developing for Trane, install Node v10.6.0 or higher. Then, run
`npm install` to install dependencies

```console
$ npm install
audited 30943 packages in 5.286s
found 0 vulnerabilities
```

If all goes well, you can start the live development server with:

```console
$ npm run start
Starting the development server...

ts-loader: Using typescript@2.9.2 and /home/augustjd/code/pivot/playgrounds/trane-from-scratch/tsconfig.json
```

This project was created with
[create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript),
and has not been ejected yet (it's still early).

### Setting up Git Flow AVH

Now you need to configure the folder for Git Flow AVH. If you haven't
already, install Git Flow AVH using [these
instructions](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation) for your platform.

Check that your version has AVH Edition in it:
```console
$ git flow version
1.11.0 (AVH Edition)
```

Now, initialize the directory with git flow.

```console
$ git flow init -d
```

This will configure Git Flow with the default settings. We have one
difference with the defaults: our githooks directory is actually at
`./.githooks`, so open `.git/config` in an editor and change it from

```ini
[gitflow "path"]
  hooks = <your path>/papi/.git/hooks
```

to

```ini
[gitflow "path"]
  hooks = <your path>/papi/.githooks
```

(This allows us to keep our git hooks inside the repository itself, so
we all will have the same hooks when developing!)

Now you're ready to go!

## Development Process

### Git Flow
At Pivot, we use branches consistantly across all projects. The `develop`
branch is where development occurs - but every commit to this branch must
build from scratch (although it doesn't need to pass all tests). The `master`
branch is where releases land, and every commit represents a working version
of the software, so all tests must pass, and the linter must as well.

For more info on Git Flow, check out [Atlassian's breakdown](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

#### Creating a feature
As a developer, you will be using neither of these branches, but instead working
on your own **feature branches**. These branches start with `feature/` and can be
created using `git flow feature start <feature-name>`. For example, let's say we're
working a feature called `cool-new-feature`. We would start our own branch off of 
`develop` by running `git flow feature start cool-new-feature`.

You will make multiple commits on this new branch `feature/cool-new-feature and
then, when you are ready, you can push the changes to GitLab: `git push
feature/cool-new-feature`. Then, create a **Merge Request** on GitLab with a
brief description indicating what you've done.

A maintainer on the project may either accept your request, merging it with
`develop`, or they may reject it and give you some tips.

In the meantime, you can work on other tasks by going back to `develop` (`git checkout develop`)
and then creating another new feature: `git flow feature start another-cool-new-feature`.

#### Creating a subfeature
If your next task requires your existing work, you can keep your progress on
that branch by creating a subfeature branch:

```console
$ git flow feature start cool-subfeature feature/cool-new-feature
```

Notice that you have to use the existing feature's branch,
`feature/cool-new-feature` as the last argument so Git Flow knows where to
branch from.

You can then finish this subfeature by `git flow feature finish feature/cool-subfeature`, which
will return you to the `feature/cool-new-feature` branch. Neat!