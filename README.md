# Technique-component-library

## Description

This is a package library of components to be injected on the clubOS site. We have internal components that will only be used on the library itself and then we have parts. Parts are the components that will be mounted into the clubOS site and they might have some buissiness logic in them.

The project is using react-bootstrap and bootstrap for base components and styles, although bootstrap variables are changed to accomodate clubOS style guide. Because the clubOS page already uses bootstrap and custom classes whenever a part is mounted on the site it's wrapped by a div with a special class guaranteeing that library styles won't be override.

This library uses storybook to display the components made without having to inject them on the site.

Each part mounted is a different react tree but if the all use redux they will still share the same store.

## Installation and running the project

First make sure the node version is 16.13.0 or higher and npm version is 8.1.0 or higher

### Instalation

- Clone the repo
- run `npm install`

### Run scripts

| Scripts           | What they do                                                    |
| ----------------- | --------------------------------------------------------------- |
| `rollup`          | builds the project for a dev environment \*                     |
| `rollup:build`    | builds the project for a production envirnment \*               |
| `storybook`       | runs the storybook server. Opens in `http://localhost:6006/`    |
| `build-storybook` | creates a build of storybook                                    |
| `lint`            | runs linting on the project and fixes what can be fixed         |
| `lint:css`        | runs linting on all the css and styled-component files          |
| `test`            | runs all the tests once                                         |
| `test:changed`    | runs the test that changed                                      |
| `test:watch`      | runs all tests and keeps watching for changes on them           |
| `test:coverage`   | runs the tests and collects the coverage of them                |
| `new:component`   | hygen script to create components. Has prompt to specify things |

\* The built files will be on `src/dist/esm`

## Components & Parts

### Components and Atomic components

This are the components that the parts will be using, the building blocks of our parts. As such they should never be rendered directly onto the clubOS site.

#### Atoms

This are small atomic components to be used either on other components or the parts. Normally this components will just render the `react-bootstrap` components but with some more logic or easier ways to customize it.

#### Components

They are also small components but can be made from atoms. They still won't be renderd on the clubOS site and they should be based on `bootstrap` and `react-bootstrap` as much as possible

### Parts

This are the different parts of the page that will be mounted on the site. This are bigger that a component but smaller that a page. Once all the parts of a page are replaces by parts then a page, or container, must be created. Parts can have redux, and should if there is some logic on them. Although they will be mounted on different react trees the store and reducer will still be the same.

### Create with hygen

When creating any component run the command `npm run new:component`. This will prompt some questions on the console for the creation of it.

- Type of component: Atom, Regular component or Part
- If redux will be used or not
- Name of the component. The name will be cammelized no matter what is writtel. The folder will have the firs letter lower case and the name of the component will have it upper case.

By creating the component this way all the basis will be set up for you:

- Folder and files created
- Imports on the atoms, components or parts `index.js`
- If the component is a `part` the render function for it will also be created on the render object
- A base story file will be create
- A base test file will be created. This file will have the snapshot and render tests already created
- If the component uses redux then redux files and connections will be setup for the component and the story

### Deleting a component

When deleting a component make sure to remove the `imports/exports` on the `index.js` files and to remove the function from `src/render.js`

### Custom styles

Although `bootstrap` and `react-bootstrap` are being used there might be a situation when custom styles have to be added. In this case css modules should be used. **This should be used only when there is no other option. The main styles should be the ones from bootstrap**

## How to use it

Once the parts are created they have to be mounted on the clubOS site. Before this can happen the project must be built and used from the `technique-web` code base. To do this there are two options:

- Create a npm package
  - update the version in package.json.
  - push the code in branch. When the code is merged in main branch, it will get auto deploy to github Package.
  - Create `Personal access token` with the `write:packages` scope on Github to use in other project like  `technique-web`.
  - Create a new file in root of the project with name `.npmrc` and write below line in it and replace YOUR_GITHUB_TOKEN with your `Personal access token`.
     `@techniquesoftware:registry=https://npm.pkg.github.com/`
	 `//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN`
  - Import the library into `technique-web` and use it like npm install @techniquesoftware/component-library@1.0.2 Version can be use as per requirement.

Once the library is in the `technique-web` project the way to add a component is easy.

First create a div where the component should go with an unique id. This is the div where the component will be mounted to

```html
<div id="new-phone-inquiry"></div>
```

Secondly create a scrip in the same page that will import `render` from the library and it will call a function depending on what part should be mounted. The function has to be called with an `id` argument that is going to be the same as the id of the div created above. It can also have andother argument name `props` with all the different props that should be sent to the part component. The differen functions of the `render` object can be found on the [render file](./src/render.js)

```html
<script type="module">
	import { render } from '/technique-web/js/react/pkg/index.js';

	render.newPhoneInquiry({
		id: 'new-phone-inquiry',
		props: {
			onSubmit: () => console.log('submiting'),
		},
	});
</script>
```

The end result might look like this

```html
<div id="new-phone-inquiry"></div>

<script type="module">
	import { render } from '/js/react/pkg/index.js';

	render.newPhoneInquiry({
		id: 'new-phone-inquiry',
		props: {
			onSubmit: () => console.log('submiting'),
		},
	});
</script>
```

The path from where render is being imported might change depending on where the libray is located.

### Multiple parts in a same page

It is posible to add several parts in a same page. Just create a div with a unique `id` for each part to be render and call the specific functions.

```html
<div id="new-phone-inquiry"></div>
<div id="messages"></div>
<div id="follow-ups"></div>

<script type="module">
	import { render } from '/js/react/pkg/index.js'

	render.newPhoneInquiry({
	    id: 'new-phone-inquiry',
	    props: {
	        onSubmit: () => console.log('submiting')
	    }
	})

	render.newPhoneInquiry({
	    id: 'messages',
	    props: {
	        messages: {...}
	    }
	})

	render.newPhoneInquiry({ id: 'follow-ups' })
</script>
```

## Testing

Tests are done using `jest` and `react-testing-library`. Component tests must cover everything that depends on props and internal logic. No need to test styles if they are hardcoded.

Redux actions, reducers, selectors and sagas should also be tested.

A test coverage of 75 is accepted. Anything below that should not be merged into `main`