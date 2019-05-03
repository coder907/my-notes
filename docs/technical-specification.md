# Technical Specification

## Architecture/Dataflow Chart

![Architecture/Dataflow Chart](architecture.png)

## Overview

The sections below describe architecture layers used in this application, as  well as give some rationale and general implementation guidelines.

## Components

"Presentational" or "dumb" components are the basic user interface (UI) building blocks. Here's where data gets displayed to the user. A component has a simple interface and no knowledge of or dependencies to other parts of application. It is stateless from application's point of view, but can keep some internal state for its own purposes. A well-designed component is easy to test, maintain and reuse.

A larger component may make use of one or more smaller components.

## Containers

"Containers" or "smart components" implement a part of application logic. A container glues together sub-containers and components and provides them with data. It usually also listens to and handles their events.

In a simple scenario without state management framework and no abstraction layers, a container may perform all (external) data access and storage itself, but that's not a recommended practice. Almost always, at least data access logic should be abstracted away to [a backend service](#backend-services).

A container serves as a good entry point for integration tests. Inherent specificity makes a container less likely to be reused, but we should always look to refactor (parts of) it to [reusable components](#components) and keep its code to a minimum.

Typically, we have a root container that hosts several page containers, which in turn may include one or more sub-containers.

## Frontend Services

This layer is entirely optional. [Containers](#containers) may well access redux and backend services layers directly. It is being used in this application mainly to demonstrate one way of making containers not depend on a particular state management solution.

A frontend service should have a well-defined and easy-to-use interface ([a facade](https://en.wikipedia.org/wiki/Facade_pattern)) that simplifies data access for containers. It's best kept stateless, which reduces testing and maintenance efforts.

Frontend services are not to be confused with utility services.

## Redux

Throughout this document, term "Redux" pertains to a state management pattern, not to a specific implementation, [NgRx](https://ngrx.io/) in this application. Redux is not suitable for simple (much less stateless) applications, and certainly not for every complex application. Its usability greatly depends on the use case, while it introduces some complexity that may not pay off immediately. However, in data-driven applications, its benefits often outweigh costs.

Much has been written about Redux and there are tons of material available online on the subject ([including original implementation](https://redux.js)), so I will just focus on concepts that are important for the architecture under discussion.

*To try and sum up in one sentence, application data is held in [store](#store), accessed using [selectors](#selectors), mutated in [reducers](#reducers), with updates requested using [actions](#actions) via [dispatchers](#dispatchers), and side effects handled by [effects](#effects).*

Predictable, one-way dataflow is one of the main advantages of Redux:

*Containers -> Actions -> Dispatchers -> Effects -> Reducers -> Store -> Selectors -> Containers*

This separation of concerns is especially important in larger applications and makes it possible to develop, test and maintain each in isolation.

In a pure Redux application (without frontend and backend services layers), [containers](#containers) would query store and invoke dispatchers directly, while [effects](#effects) would handle external data access.

### Store

Store represents a single source of truth. Once pulled out it, the data (state) is considered immutable. Only reducers are allowed to change state, upon request. Each update leads to a new immutable state.

We must carefully consider which data to put into the store, because too much of it complicates development and affects performance. Good candidates for store are the data that need to be persisted between sessions and/or requests.

### Selectors

Selectors are [pure functions](https://en.wikipedia.org/wiki/Pure_function) that are used to access [stored state](#store). A selector targets a specific slice of state, and is usually short, which makes it testable and reusable, often by composition. Selectors make use of [memoization](https://en.wikipedia.org/wiki/Memoization) (a simple caching mechanism) to improve performance.

### Actions

Actions are plain objects that Redux uses for communication between its parts. They usually take form of commands or data transfer objects that travel from containers to reducers.

### Dispatchers

To dispatch an action, one would usually just call `store.dispatch()`, from [a frontend service](#frontend-services) or [a container](#containers). Larger applications may benefit from grouping these calls as methods in separate dispatcher classes, particularly if some input data preprocessing is required.

### Reducers

Reducers are where updates happen. More accurately, transitions from one immutable state to another immutable state. Upon receiving [an action](#actions), that clearly describes what kind of change has to be performed, a reducer produces a new (next) state, in a way that does not impact previous state. This way, we can always find out exactly what action caused what changes, which greatly simplifies debugging.

Reducers are pure functions that are easy to test and maintain.

### Effects

"Effects", originally called "middleware", handle application's side effects, which often means interaction with external APIs. Their function is similar to that of [backend services](#backend-services). Effects use [actions](#actions) for both input and output, integrating nicely with the rest of Redux.

## Backend Services

Backend services encapsulate, usually asynchronous, data access logic. Its a good practice to first define its interface (an abstract class in this application) and provide [a mock implementation](https://en.wikipedia.org/wiki/Mock_object), against which we can perform initial tests and evaluation. Later on, we should be able to substitute mocks with a real implementation in a relatively seamless way.